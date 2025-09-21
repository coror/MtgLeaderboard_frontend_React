// @ts-expect-error it works, but i dont know why it shows no module found
import Parse from 'parse/dist/parse.min.js';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useReducer, useState, ChangeEvent, FormEvent } from 'react';

// NOTE: You'll need to create this file if you haven't already.
// For now, let's assume it exists and is typed.

// Type definitions for the data structures
interface Player {
  objectId: string;
  propName: string;
}

interface FormState {
  avatarData: string | ArrayBuffer | null;
  selectedPlayer: Player | null;
}

interface UseUploadAvatarResult {
  resetModalState: () => void;
  handlePlayerChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleUpload: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
  success: boolean;
  selectedPlayer: Player | null;
  players: Player[];
  avatarData: string | ArrayBuffer | null;
}

// Action types for the reducer
type FormAction =
  | { type: 'UPDATE_FIELD'; field: keyof FormState; value: FormState[keyof FormState] }
  | { type: 'RESET_FORM'; payload: FormState };

const initialFormState: FormState = {
  avatarData: null,
  selectedPlayer: null,
};

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET_FORM':
      return action.payload;
    default:
      return state;
  }
};

export default function useUploadAvatar(
  uploadFunction: string,
  classDB: string,
  propName: string,
  objName: string
): UseUploadAvatarResult {
  const [players, setPlayers] = useState<Player[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

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
          results.map((player: Parse.Object) => ({
            objectId: player.id,
            propName: player.get(propName) as string,
          }))
        );
      } catch (error) {
        console.error('Error fetching player/deck names:', error);
      }
    };

    fetchPlayerNames();
  }, [classDB, propName]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

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

  const handlePlayerChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedPlayerId = event.target.value;
    const selectedPlayerObject = players.find(
      (player) => player.objectId === selectedPlayerId
    );
    dispatch({
      type: 'UPDATE_FIELD',
      field: 'selectedPlayer',
      value: selectedPlayerObject || null,
    });
  };

  const handleUpload = async (event: FormEvent<HTMLFormElement>) => {
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

      // Type-guard to ensure avatarData is a string before splitting
      const base64Data = (avatarData as string).split(',')[1];
      await Parse.Cloud.run(uploadFunction, {
        [objName]: selectedPlayer.objectId,
        data: base64Data,
      });

      setSuccess(true);
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
    } catch (err) {
      console.error('Error uploading avatar:', err);
      setError((err as Error).message || 'An unexpected error occurred.');
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