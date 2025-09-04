import { useEffect, useReducer, useState } from 'react';
import Parse from 'parse/dist/parse.min.js';

import formReducer from '../helpers/formReducer';
import { useQueryClient } from '@tanstack/react-query';

const InitialFormState = {
  selectedDeckId: '',
  decklistText: '',
};

export default function useUploadDeck() {
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [formState, dispatch] = useReducer(formReducer, InitialFormState);

  const queryClient = useQueryClient();

  useEffect(() => {
    async function fetchDecks() {
      try {
        const Edh = Parse.Object.extend('Edh');
        const query = new Parse.Query(Edh);
        query.select(['deckName', 'rank']); // select only needed fields
        query.ascending('rank');
        const results = await query.find(); // no masterKey here
        setDecks(results);
      } catch (err) {
        setError('Failed to load decks: ' + err.message);
      }
    }

    fetchDecks();
  }, []);

  const handleEdhChange = (event) => {
    const selectedDeckId = event.target.value;
    dispatch({
      type: 'UPDATE_FIELD',
      field: 'selectedDeckId',
      value: selectedDeckId,
    });
  };

  const handleEdhDecklist = (event) => {
    const decklist = event.target.value;
    dispatch({
      type: 'UPDATE_FIELD',
      field: 'decklistText',
      value: decklist,
    });
  };

  const handleUpload = async (event) => {
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
      setError(err.message || 'Error uploading decklist');
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
