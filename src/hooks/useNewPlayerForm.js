import { useReducer, useState } from 'react';
import Parse from 'parse';
import formReducer from '../helpers/formReducer';
import { useQueryClient } from '@tanstack/react-query';

const initialState = {
  name: '',
  category: [],
};

export default function useNewPlayerForm(parseFunction, parseClass) {
  const [formData, dispatch] = useReducer(formReducer, initialState);
  const [status, setStatus] = useState('idle'); // idle, success, error
  const [errorMessage, setErrorMessage] = useState(null);

  const queryClient = useQueryClient();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    dispatch({
      type: 'UPDATE_FIELD',
      field: name,
      value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setStatus('idle');
    setErrorMessage(null);

    try {
      await Parse.Cloud.run(parseFunction, {
        [parseClass]: formData.name,
      });

      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
      dispatch({ type: 'RESET_FORM', payload: initialState });
      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
      setErrorMessage(error.message || 'An unexpected error occurred.');
    }
  };

  const resetStatus = () => {
    setStatus('idle');
    setErrorMessage(null);
  };

  return {
    formData,
    status,
    errorMessage,
    handleInputChange,
    handleSubmit,
    resetStatus,
  };
}
