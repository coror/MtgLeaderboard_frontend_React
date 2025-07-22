import { useReducer, useState } from 'react';
import formReducer from '../helpers/formReducer';
import { useQueryClient } from '@tanstack/react-query';
import { callParseFunction } from '../util/http';

const initialState = {
  name: '',
  category: [],
};

export default function useRegistartionForm(parseFunction, parseClass) {
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
      await callParseFunction(parseFunction, 'POST', parseClass, formData.name);
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
      dispatch({ type: 'RESET_FORM' });
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMessage('An unexpected error occurred.'); // Default error message
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
