import Parse from 'parse';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export default function useUploadAvatar(
  uploadFunction,
  classDB,
  propName,
  objName
) {
  const [avatarData, setAvatarData] = useState('');
  const [deckNames, setDeckNames] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchDeckNames = async () => {
      try {
        const Edh = Parse.Object.extend(classDB);
        const query = new Parse.Query(Edh);
        query.select([propName, 'objectId']);
        const results = await query.find();
        const decks = results.map((result) => ({
          objectId: result.id,
          propName: result.get(propName),
        }));
        setDeckNames(decks);
      } catch (error) {
        console.error('Error fetching deck names:', error);
      }
    };

    fetchDeckNames();
  }, [classDB, propName]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

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
      await Parse.Cloud.run(uploadFunction, {
        [objName]: selectedDeck.objectId,
        data: base64Data,
      });

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

  return {
    resetModalState,
    handleDeckChange,
    handleUpload,
    handleFileChange,
    error,
    success,
    selectedDeck,
    deckNames,
    avatarData,
  };
}
