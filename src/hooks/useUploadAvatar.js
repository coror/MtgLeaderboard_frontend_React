import Parse from 'parse';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useReducer, useState } from 'react';
import formReducer from '../helpers/formReducer';

const initialFormState = {
  avatarData: '',
  selectedPlayer: '',
};

export default function useUploadAvatar(
  uploadFunction,
  classDB,
  propName,
  objName
) {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchPlayerNames = async () => {
      try {
        const PlayerClass = Parse.Object.extend(classDB);
        const query = new Parse.Query(PlayerClass);
        query.select([propName, 'objectId']);
        const results = await query.find();
        setPlayers(
          results.map((player) => ({
            objectId: player.id,
            propName: player.get(propName),
          }))
        );
      } catch (error) {
        console.error('Error fetching player/deck names:', error);
      }
    };

    fetchPlayerNames();
  }, [classDB, propName]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch({
          type: 'UPDATE_FIELD',
          field: 'avatarData',
          value: reader.result,
        });
      };

      reader.onerror = () => {
        console.error('Error reading file');
        setError('Failed to read file');
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePlayerChange = (event) => {
    const selectedPlayerId = event.target.value;
    const selectedPlayerkObject = players.find(
      (player) => player.objectId === selectedPlayerId
    );
    dispatch({
      type: 'UPDATE_FIELD',
      field: 'selectedPlayer',
      value: selectedPlayerkObject,
    });
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    setError(null);
    setSuccess(false);

    const { selectedPlayer, avatarData } = formState;

    try {
      if (!selectedPlayer) {
        setError('Please select a player/deck.');
        return;
      }

      if (!avatarData) {
        setError('Please choose an image.');
        return;
      }

      const base64Data = avatarData.split(',')[1];
      await Parse.Cloud.run(uploadFunction, {
        [objName]: selectedPlayer.objectId,
        data: base64Data,
      });

      setSuccess(true);
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      setError('An unexpected error occurred.');
    }

    dispatch({ type: 'RESET_FORM', payload: initialFormState });
  };

  const resetModalState = () => {
    setError(null);
    setSuccess(false);
  };

  return {
    resetModalState,
    handlePlayerChange,
    handleUpload,
    handleFileChange,
    error,
    success,
    selectedPlayer: formState.selectedPlayer,
    players,
    avatarData: formState.avatarData,
  };
}
