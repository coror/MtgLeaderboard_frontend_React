import React, { useState, useEffect } from 'react';
import Parse from 'parse';

import Button from '../UI/Button';
import classes from './UpdateScore.module.css';
import ResponseModal from '../UI/ResponseModal';

const UpdateScore = ({ updateFunction, className, propName, objName }) => {
  const [deckNames, setDeckNames] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState('');
  const [scoreChange, setScoreChange] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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
        const result = await Parse.Cloud.run(updateFunction, {
          [objName]: selectedDeck.objectId,
          addRemove: scoreChange,
        });

        console.log(result); // Log the result if needed
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

  return (
    <>
      <form className={classes['form-container']} onSubmit={handleSubmit}>
        <div className={classes['form-section']}>
          <div>
            {updateFunction === 'edhGameWonAddRemove' ||
            updateFunction === 'edhGameLostAddRemove'
              ? 'Select Commander'
              : 'Select Commander Player'}
            :
          </div>
          <select
            className={classes['select-field']}
            value={selectedDeck ? selectedDeck.propName : ''}
            onChange={handleDeckChange}
          >
            <option value=''>Select...</option>
            {deckNames.map((deck) => (
              <option key={deck.objectId} value={deck.propName}>
                {deck.propName}
              </option>
            ))}
          </select>
          <div>
            {updateFunction === 'edhGameWonAddRemove'
              ? 'Update Wins'
              : updateFunction === 'edhPlayerGameWonAddRemove'
              ? 'Update Wins' // or provide the appropriate text for this case
              : 'Update Losses'}
            :
          </div>

          <div className={classes['input-container']}>
            <button
              type='button'
              className={classes.button}
              onClick={() => handleScoreChange(-1)}
            >
              -
            </button>
            <input
              type='number'
              className={classes['input-field']}
              value={scoreChange}
              onChange={(e) => setScoreChange(Number(e.target.value))}
            />
            <button
              type='button'
              className={classes.button}
              onClick={() => handleScoreChange(1)}
            >
              +
            </button>
          </div>
        </div>
        <div>
          <Button type='submit'>Submit</Button>
        </div>
      </form>
      {error && (
        <ResponseModal
          title='Error'
          message={error}
          onConfirm={() => setError(null)}
        />
      )}
      {success && (
        <ResponseModal
          title='Success'
          message='Score modified successfully'
          onConfirm={() => setSuccess(false)}
        />
      )}
    </>
  );
};

export default UpdateScore;
