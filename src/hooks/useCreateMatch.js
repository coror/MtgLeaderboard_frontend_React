import { useState, useEffect } from 'react';
import Parse from 'parse';
import { useQueryClient } from '@tanstack/react-query';

export default function useCreateMatch(
  updateFunction,
  classDB,
  propName,
  objName
) {
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
        const PlayerClass = Parse.Object.extend(classDB);
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
  }, [classDB, propName]);

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

  return {
    handleSubmit,
    selectedPlayerOne,
    handlePlayerChange,
    players,
    selectedPlayerTwo,
    handleScoreChange,
    scoreOne,
    setScoreOne,
    scoreTwo,
    setScoreTwo,
    error,
    setError,
    success,
    setSuccess,
  };
}
