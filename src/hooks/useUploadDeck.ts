// @ts-expect-error it works, but i dont know why it shows no module found
import Parse from 'parse/dist/parse.min.js';
import { useEffect, useReducer, useState, ChangeEvent, FormEvent } from 'react';
import { useQueryClient } from '@tanstack/react-query';

// Import the generic reducer and action types
import { formReducer, FormAction } from '../helpers/formReducer';

// Assuming Player is defined in '../models/player'
// It appears to be used for decks as well.
import { Player } from '../models/player';

// Type definitions for the form state
type FormState = {
  selectedDeckId: string;
  decklistText: string;
};

// Initial state for the form
const InitialFormState: FormState = {
  selectedDeckId: '',
  decklistText: '',
};

// Type definition for the hook's return value
interface UseUploadDeckResult {
  error: string | null;
  success: boolean;
  selectedDeckId: string;
  handleEdhChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  decks: Parse.Object<Player>[];
  decklistText: string;
  handleEdhDecklist: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  handleUpload: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  resetModalState: () => void;
}

export default function useUploadDeck(): UseUploadDeckResult {
  const [decks, setDecks] = useState<Parse.Object<Player>[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Use the generic formReducer with the FormState type
  const [formState, dispatch] = useReducer<
    (state: FormState, action: FormAction<FormState>) => FormState
  >(formReducer, InitialFormState);

  const queryClient = useQueryClient();

  useEffect(() => {
    async function fetchDecks() {
      try {
        const Edh = Parse.Object.extend('Edh');
        const query = new Parse.Query(Edh);
        query.select(['deckName', 'rank']);
        query.ascending('rank');
        const results = await query.find();
        setDecks(results);
      } catch (err) {
        setError('Failed to load decks: ' + (err as Error).message);
      }
    }

    fetchDecks();
  }, []);

  const handleEdhChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedDeckId = event.target.value;
    dispatch({
      type: 'UPDATE_FIELD',
      field: 'selectedDeckId',
      value: selectedDeckId,
    });
  };

  const handleEdhDecklist = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const decklist = event.target.value;
    dispatch({
      type: 'UPDATE_FIELD',
      field: 'decklistText',
      value: decklist,
    });
  };

  const handleUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(null);
    setSuccess(false);

    const { selectedDeckId, decklistText } = formState;

    if (!decklistText.trim()) {
      setError('Decklist cannot be empty.');
      return;
    }
    if (!selectedDeckId) {
      setError('Please select a deck first.');
      return;
    }
    setError(null);

    try {
      const Edh = Parse.Object.extend('Edh');
      const query = new Parse.Query(Edh);
      const deck = await query.get(selectedDeckId);

      deck.set('decklist', decklistText);

      await deck.save();
      setSuccess(true);
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
    } catch (err) {
      setError((err as Error).message || 'Error uploading decklist');
    }

    dispatch({ type: 'RESET_FORM', payload: InitialFormState });
  };

  const resetModalState = () => {
    setError(null);
    setSuccess(false);
  };

  return {
    error,
    success,
    selectedDeckId: formState.selectedDeckId,
    handleEdhChange,
    decks,
    decklistText: formState.decklistText,
    handleEdhDecklist,
    handleUpload,
    resetModalState,
  };
}
