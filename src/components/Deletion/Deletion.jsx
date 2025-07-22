import { useState, useEffect } from 'react';
import Button from '../UI/Button';
import classes from './Deletion.module.css';
import Parse from 'parse';
import ResponseModal from '../UI/ResponseModal';
import { useQueryClient } from '@tanstack/react-query';

const Deletion = ({ deleteFunction, className, propName, objName }) => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const ItemClass = Parse.Object.extend(className);
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
  }, []);

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
        const result = await Parse.Cloud.run(deleteFunction, {
          [objName]: selectedItem.objectId,
        });

        console.log(result); // Log the result if needed
        setSuccess(true);
      } else {
        setError('Please select an item to delete.');
      }
    } catch (error) {
      console.error(`Error deleting ${propName}:`, error);
      setError(`Error deleting player/deck. Please try again.`);
    }
    queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
    // Clear the input after deletion
    setSelectedItem('');
  };

  return (
    <>
      <form className={classes['form-container']} onSubmit={handleDeletion}>
        <div className={classes['form-section']}>
          <select
            value={selectedItem ? selectedItem.propName : ''}
            onChange={handleItemChange}
            className={classes['select-field']}
          >
            <option value=''>
              {deleteFunction === 'deleteEdh' ? 'Select Deck' : 'Select Player'}
            </option>
            {items.map((item) => (
              <option key={item.objectId} value={item.propName}>
                {item.propName}
              </option>
            ))}
          </select>
          <Button type='submit'>Delete</Button>
        </div>
      </form>
      {success && (
        <ResponseModal
          title='Success'
          message={'Successfully deleted!'}
          onConfirm={() => setSuccess(false)}
        />
      )}
      {error && (
        <ResponseModal
          title='Error'
          message={error}
          onConfirm={() => setError(null)}
        />
      )}
    </>
  );
};

export default Deletion;
