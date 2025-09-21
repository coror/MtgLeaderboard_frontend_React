import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState, ChangeEvent } from 'react';
// @ts-expect-error it works, but i dont know why it shows no module found
import Parse from 'parse/dist/parse.min.js';

// Define the shape of your item and the hook's return value.
// We use a generic `T` for the item's property name.
interface Item {
  objectId: string;
  propName: string; // The property name is dynamic, so we type it as a string here
}

interface DeletePlayerHookResult {
  handleDeletion: (event: React.FormEvent) => Promise<void>;
  selectedItem: Item | '';
  handleItemChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  items: Item[];
  success: boolean;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function useDeletePlayer(
  deleteFunction: string,
  classDB: string,
  propName: string,
  objName: string
): DeletePlayerHookResult {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | ''>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const ItemClass = Parse.Object.extend(classDB);
        const query = new Parse.Query(ItemClass);
        query.select([propName, 'objectId']);
        const results = await query.find();

        // Use a type assertion for the Parse.Object result
        const itemsList = results.map((result: Parse.Object) => ({
          objectId: result.id,
          propName: result.get(propName) as string,
        }));
        setItems(itemsList);
      } catch (error) {
        console.error(`Error fetching ${propName} names:`, error);
      }
    };

    fetchItems();
  }, [classDB, propName]);

  const handleItemChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedItemName = event.target.value;
    const selectedItemObject = items.find(
      (item) => item.propName === selectedItemName
    );

    // TypeScript now knows selectedItemObject could be undefined
    if (selectedItemObject) {
      setSelectedItem(selectedItemObject);
    } else {
      setSelectedItem('');
    }
  };

  const handleDeletion = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      // Type guard: check that selectedItem is not an empty string
      if (typeof selectedItem !== 'string' && selectedItem.objectId) {
        await Parse.Cloud.run(deleteFunction, {
          [objName]: selectedItem.objectId,
        });
        setSuccess(true);
      } else {
        setError('Please select an item to delete.');
      }
    } catch (error) {
      console.error(`Error deleting ${propName}:`, error);
      setError(`Error deleting player/deck. Please try again.`);
    }

    // Invalidate the query and reset the selected item
    queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
    setSelectedItem('');
  };

  return {
    handleDeletion,
    selectedItem,
    handleItemChange,
    items,
    success,
    error,
    setError,
    setSuccess,
  };
}
