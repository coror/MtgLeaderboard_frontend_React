import { useEffect, useState } from 'react';
import Parse from 'parse';

export default function useUpdateScore(
  updateFunction,
  classDB,
  propName,
  objName
) {
  const [deckNames, setDeckNames] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState('');
  const [scoreChange, setScoreChange] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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

    setSelectedDeck(selectedDeckObject);
  };

  const handleScoreChange = (change) => {
    setScoreChange(scoreChange + change);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      if (selectedDeck && scoreChange !== 0) {
        await Parse.Cloud.run(updateFunction, {
          [objName]: selectedDeck.objectId,
          addRemove: scoreChange,
        });

        setSuccess(true);
      } else {
        setError(
          selectedDeck
            ? 'Please enter a valid score.'
            : 'Please select a player.'
        );
      }
    } catch (error) {
      console.error(`Error calling ${updateFunction}:`, error);
      setError('An error occurred while updating the score.');
      // Handle error, show a message to the user, etc.
    }

    setSelectedDeck('');
    setScoreChange(0);
  };

  return {
    handleSubmit,
    handleScoreChange,
    handleDeckChange,
    selectedDeck,
    deckNames,
    scoreChange,
    error,
    success,
    setError,
    setSuccess,
    setScoreChange,
  };
}
