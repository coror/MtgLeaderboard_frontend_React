import { useState, useEffect, useReducer } from 'react';
import Parse from 'parse';
import { useQueryClient } from '@tanstack/react-query';
import formReducer from '../helpers/formReducer';

const initialFormState = {
  selectedPlayerOne: null,
  selectedPlayerTwo: null,
  scoreOne: 0,
  scoreTwo: 0,
};

export default function useCreateMatch(
  updateFunction,
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
      dispatch({
        type: 'UPDATE_FIELD',
        field: 'selectedPlayerOne',
        value: selectedPlayerObject,
      });
    } else {
      dispatch({
        type: 'UPDATE_FIELD',
        field: 'selectedPlayerTwo',
        value: selectedPlayerObject,
      });
    }
  };

  const handleScoreChange = (playerNumber, change, absolute = false) => {
    if (playerNumber === 1) {
      const newScore = absolute ? change : formState.scoreOne + change;
      dispatch({ type: 'UPDATE_FIELD', field: 'scoreOne', value: newScore });
    } else {
      const newScore = absolute ? change : formState.scoreTwo + change;
      dispatch({ type: 'UPDATE_FIELD', field: 'scoreTwo', value: newScore });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const { selectedPlayerOne, selectedPlayerTwo, scoreOne, scoreTwo } =
        formState;

      if (!selectedPlayerOne || !selectedPlayerTwo) {
        setError('Please select both players.');
        return;
      }

      if (selectedPlayerOne.objectId === selectedPlayerTwo.objectId) {
        setError('You cannot select the same player twice.');
        return;
      }

      await Parse.Cloud.run(updateFunction, {
        [objName + 'One']: selectedPlayerOne.objectId,
        [objName + 'Two']: selectedPlayerTwo.objectId,
        scoreOne,
        scoreTwo,
      });

      setSuccess(true);
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
    } catch (error) {
      console.error(`Error calling ${updateFunction}:`, error);
      setError('An error occurred while creating the match.');
    }

    dispatch({ type: 'RESET_FORM', payload: initialFormState });
  };

  const resetModalState = () => {
    setError(null);
    setSuccess(false);
  };

  return {
    handleSubmit,
    selectedPlayerOne: formState.selectedPlayerOne,
    handlePlayerChange,
    players,
    selectedPlayerTwo: formState.selectedPlayerTwo,
    handleScoreChange,
    scoreOne: formState.scoreOne,
    scoreTwo: formState.scoreTwo,
    error,
    success,
    resetModalState
  };
}
