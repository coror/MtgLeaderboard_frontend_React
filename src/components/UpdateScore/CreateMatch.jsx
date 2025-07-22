import React, { useState, useEffect } from 'react';
import Parse from 'parse';
import Button from '../UI/Button';
import ResponseModal from '../UI/ResponseModal';
import { useQueryClient } from '@tanstack/react-query';

const CreateMatch = ({ updateFunction, className, propName, objName }) => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayerOne, setSelectedPlayerOne] = useState(null);
  const [selectedPlayerTwo, setSelectedPlayerTwo] = useState(null);
  const [scoreOne, setScoreOne] = useState(0);
  const [scoreTwo, setScoreTwo] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const PlayerClass = Parse.Object.extend(className);
        const query = new Parse.Query(PlayerClass);
        query.select([propName, 'objectId']);
        const results = await query.find();
        setPlayers(
          results.map((player) => ({
            objectId: player.id,
            name: player.get(propName),
          }))
        );
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };
    fetchPlayers();
  }, [className, propName]);

  const handlePlayerChange = (event, playerNumber) => {
    const selectedPlayerName = event.target.value;
    const selectedPlayerObject = players.find(
      (player) => player.name === selectedPlayerName
    );
    if (playerNumber === 1) {
      setSelectedPlayerOne(selectedPlayerObject);
    } else {
      setSelectedPlayerTwo(selectedPlayerObject);
    }
  };

  const handleScoreChange = (playerNumber, change) => {
    if (playerNumber === 1) {
      setScoreOne(scoreOne + change);
    } else {
      setScoreTwo(scoreTwo + change);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      if (selectedPlayerOne && selectedPlayerTwo) {
        const result = await Parse.Cloud.run(updateFunction, {
          [objName + 'One']: selectedPlayerOne.objectId,
          [objName + 'Two']: selectedPlayerTwo.objectId,
          scoreOne,
          scoreTwo,
        });

        console.log(result); // Log the result if needed
        setSuccess(true);
        queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
      } else {
        setError(
          selectedPlayerOne && selectedPlayerTwo
            ? 'Please ensure both players and scores are valid.'
            : 'Please select both players.'
        );
      }
    } catch (error) {
      console.error(`Error calling ${updateFunction}:`, error);
      setError('An error occurred while creating the match.');
    }

    setScoreOne(0);
    setScoreTwo(0);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <div>Select Player 1:</div>
          <select
            value={selectedPlayerOne ? selectedPlayerOne.name : ''}
            onChange={(e) => handlePlayerChange(e, 1)}
            className='text-black'
          >
            <option value=''>Select Player...</option>
            {players.map((player) => (
              <option key={player.objectId} value={player.name}>
                {player.name}
              </option>
            ))}
          </select>

          <div>Select Player 2:</div>
          <select
            value={selectedPlayerTwo ? selectedPlayerTwo.name : ''}
            onChange={(e) => handlePlayerChange(e, 2)}
            className='text-black'
          >
            <option value=''>Select Player...</option>
            {players.map((player) => (
              <option key={player.objectId} value={player.name}>
                {player.name}
              </option>
            ))}
          </select>

          <div>Score for Player 1:</div>
          <div>
            <button type='button' onClick={() => handleScoreChange(1, -1)}>
              -
            </button>
            <input
              type='number'
              value={scoreOne}
              onChange={(e) => setScoreOne(Number(e.target.value))}
              className='text-black'
            />
            <button type='button' onClick={() => handleScoreChange(1, 1)}>
              +
            </button>
          </div>

          <div>Score for Player 2:</div>
          <div>
            <button type='button' onClick={() => handleScoreChange(2, -1)}>
              -
            </button>
            <input
              type='number'
              value={scoreTwo}
              onChange={(e) => setScoreTwo(Number(e.target.value))}
              className='text-black'
            />
            <button type='button' onClick={() => handleScoreChange(2, 1)}>
              +
            </button>
          </div>
        </div>

        <Button type='submit'>Submit</Button>
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
          message='Match created successfully'
          onConfirm={() => setSuccess(false)}
        />
      )}
    </>
  );
};

export default CreateMatch;
