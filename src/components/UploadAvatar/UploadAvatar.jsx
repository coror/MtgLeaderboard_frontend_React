import React, { useState, useEffect } from 'react';
import Button from '../UI/Button';
import classes from './UploadAvatar.module.css';
import Parse from 'parse';
import ResponseModal from '../UI/ResponseModal';
import { useQueryClient } from '@tanstack/react-query';

const UploadAvatar = ({ uploadFunction, className, propName, objName }) => {
  console.log(uploadFunction, className, propName, objName);
  const [avatarData, setAvatarData] = useState('');
  const [deckNames, setDeckNames] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchDeckNames = async () => {
      try {
        const Edh = Parse.Object.extend(className);
        const query = new Parse.Query(Edh);
        query.select([propName, 'objectId']);
        const results = await query.find();
        const decks = results.map((result) => ({
          objectId: result.id,
          propName: result.get(propName),
        }));
        console.log(decks);
        setDeckNames(decks);
      } catch (error) {
        console.error('Error fetching deck names:', error);
      }
    };

    fetchDeckNames();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log('Selected File:', file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarData(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    console.log('Selected Deck:', selectedDeck);
    console.log('Avatar Data:', avatarData);

    setError(null);
    setSuccess(false);

    try {
      if (!selectedDeck) {
        setError('Please select a deck.'); // Set error message if no deck is selected
        return;
      }

      if (!avatarData) {
        setError('Please choose an image.'); // Set error message if no image is chosen
        return;
      }

      const base64Data = avatarData.split(',')[1]; // Extract base64 data
      const result = await Parse.Cloud.run(uploadFunction, {
        [objName]: selectedDeck.objectId,
        data: base64Data,
      });

      console.log(result); // Log the result if needed
      setSuccess(true);
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      setError('An unexpected error occurred.'); // Default error message
    }

    // Clear the input after uploading
    setAvatarData('');
  };

  const handleDeckChange = (event) => {
    const selectedDeckId = event.target.value;
    const selectedDeckObject = deckNames.find(
      (deck) => deck.objectId === selectedDeckId
    );

    setSelectedDeck(selectedDeckObject);
  };

  const resetModalState = () => {
    setError(null);
    setSuccess(false);
  };

  return (
    <>
      <form
        onSubmit={handleUpload}
        className={classes['upload-avatar-container']}
      >
        <div>
          <select
            value={selectedDeck ? selectedDeck.objectId : ''}
            onChange={handleDeckChange}
            className={classes['select-field']}
          >
            <option value=''>
              {uploadFunction === 'uploadEdhAvatar'
                ? 'Select Deck'
                : 'Select Player'}
            </option>
            {deckNames.map((deck) => (
              <option key={deck.objectId} value={deck.objectId}>
                {deck.propName}
              </option>
            ))}
          </select>
        </div>
        <div className={classes['input-container']}>
          <input
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            className={classes['file-input']}
          />
          {avatarData && (
            <img
              src={avatarData}
              alt='Preview'
              className={classes['preview-image']}
            />
          )}
        </div>
        <Button type='submit'>Upload</Button>
      </form>
      {error && (
        <ResponseModal
          title='Error'
          message={error}
          onConfirm={resetModalState}
        />
      )}

      {success && (
        <ResponseModal
          title='Success'
          message='Avatar uploaded successfully'
          onConfirm={resetModalState}
        />
      )}
    </>
  );
};

export default UploadAvatar;
