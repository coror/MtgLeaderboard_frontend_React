import { useState, useEffect, useReducer } from 'react';
// @ts-expect-error it works, but i dont know why it shows no module found
import Parse from 'parse/dist/parse.min.js';
import { useQueryClient } from '@tanstack/react-query';
import formReducer from '../helpers/formReducer';
import { Player } from '../models/player';

type FormState = {
  selectedPlayerOne: Player | null;
  selectedPlayerTwo: Player | null;
  scoreOne: number;
  scoreTwo: number;
};

const initialFormState: FormState = {
  selectedPlayerOne: null,
  selectedPlayerTwo: null,
  scoreOne: 0,
  scoreTwo: 0,
};

export default function useCreateMatch(
  updateFunction: string,
  classDB: string,
  propName: string,
  objName: string
) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  const queryClient = useQueryClient();

  useEffect(() => {
    let mounted = true;
    const fetchPlayers = async () => {
      try {
        const PlayerClass = Parse.Object.extend(classDB);
        const query = new Parse.Query(PlayerClass);
        query.select([propName, 'objectId']);
        const results = await query.find();
        if (mounted) {
          setPlayers(
            results.map((player: Parse.Object) => ({
              objectId: player.id,
              name: player.get(propName) as string,
            }))
          );
        }
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };
    fetchPlayers();
    return () => {
      mounted = false;
    };
  }, [classDB, propName]);

  const handlePlayerChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    playerNumber: 1 | 2
  ) => {
    const selectedPlayerName = event.target.value;
    const selectedPlayerObject =
      players.find((player) => player.name === selectedPlayerName) || null;

    dispatch({
      type: 'UPDATE_FIELD',
      field: playerNumber === 1 ? 'selectedPlayerOne' : 'selectedPlayerTwo',
      value: selectedPlayerObject,
    });
  };

  const handleScoreChange = (
    playerNumber: 1 | 2,
    change: number,
    absolute = false
  ) => {
    if (playerNumber === 1) {
      const newScore = absolute ? change : formState.scoreOne + change;
      dispatch({ type: 'UPDATE_FIELD', field: 'scoreOne', value: newScore });
    } else {
      const newScore = absolute ? change : formState.scoreTwo + change;
      dispatch({ type: 'UPDATE_FIELD', field: 'scoreTwo', value: newScore });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
        [`${objName}One`]: selectedPlayerOne.objectId,
        [`${objName}Two`]: selectedPlayerTwo.objectId,
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
    resetModalState,
  };
}
