import { useEffect, useReducer, useState } from 'react';
import Parse from 'parse/dist/parse.min.js';

import formReducer from '../helpers/formReducer';

const initialFormState = {
  selectedDeck: '',
  scoreChange: 0,
};

export default function useUpdateScore(
  updateFunction,
  classDB,
  propName,
  objName
) {
  const [deckNames, setDeckNames] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [formState, dispatch] = useReducer(formReducer, initialFormState);

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
  }, []);

  const handleDeckChange = (event) => {
    const selectedDeckName = event.target.value;
    const selectedDeckObject = deckNames.find(
      (deck) => deck.propName === selectedDeckName
    );

    dispatch({
      type: 'UPDATE_FIELD',
      field: 'selectedDeck',
      value: selectedDeckObject,
    });
  };

  const handleScoreChange = (change, absolute = false) => {
    const newScore = absolute ? change : formState.scoreChange + change;
    dispatch({
      type: 'UPDATE_FIELD',
      field: 'scoreChange',
      value: newScore,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      if (formState.selectedDeck && formState.scoreChange !== 0) {
        await Parse.Cloud.run(updateFunction, {
          [objName]: formState.selectedDeck.objectId,
          addRemove: formState.scoreChange,
        });

        setSuccess(true);
      } else {
        setError(
          formState.selectedDeck
            ? 'Please enter a valid score.'
            : 'Please select a player.'
        );
      }
    } catch (error) {
      console.error(`Error calling ${updateFunction}:`, error);
      setError('An error occurred while updating the score.');
    }
    dispatch({ type: 'RESET_FORM', payload: initialFormState });
  };

  return {
    handleSubmit,
    handleScoreChange,
    handleDeckChange,
    deckNames,
    error,
    success,
    setError,
    setSuccess,
    selectedDeck: formState.selectedDeck,
    scoreChange: formState.scoreChange,
  };
}
