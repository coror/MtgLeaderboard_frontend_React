import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Parse from 'parse';

export default function useDeletePlayer(
  deleteFunction,
  classDB,
  propName,
  objName
) {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const ItemClass = Parse.Object.extend(classDB);
        const query = new Parse.Query(ItemClass);
        query.select([propName, 'objectId']);
        const results = await query.find();
        const itemsList = results.map((result) => ({
          objectId: result.id,
          propName: result.get(propName),
        }));
        setItems(itemsList);
      } catch (error) {
        console.error(`Error fetching ${propName} names:`, error);
      }
    };

    fetchItems();
  }, [classDB, propName]);

  const handleItemChange = (event) => {
    const selectedItemName = event.target.value;
    const selectedItemObject = items.find(
      (item) => item.propName === selectedItemName
    );

    setSelectedItem(selectedItemObject);
  };

  const handleDeletion = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      if (selectedItem) {
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
