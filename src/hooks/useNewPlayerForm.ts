import { useReducer, useState, ChangeEvent, FormEvent } from 'react';
import { useQueryClient } from '@tanstack/react-query';
// @ts-expect-error it works, but i dont know why it shows no module found
import Parse from 'parse/dist/parse.min.js';

// Define the shape of your form data
interface FormData {
  name: string;
  category: string[];
}

// Define the action types for the reducer
type FormAction =
  | { type: 'UPDATE_FIELD'; field: string; value: string }
  | { type: 'RESET_FORM'; payload: FormData };

// Define the return type for the custom hook
interface UseNewPlayerFormResult {
  formData: FormData;
  status: 'idle' | 'success' | 'error';
  errorMessage: string | null;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  resetStatus: () => void;
}

// Define the type for the formReducer function
const formReducer = (state: FormData, action: FormAction): FormData => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET_FORM':
      return action.payload;
    default:
      return state;
  }
};

const initialState: FormData = {
  name: '',
  category: [],
};

export default function useNewPlayerForm(
  parseFunction: string,
  parseClass: string
): UseNewPlayerFormResult {
  const [formData, dispatch] = useReducer(formReducer, initialState);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    dispatch({
      type: 'UPDATE_FIELD',
      field: name,
      value,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
      setErrorMessage((error as Error).message || 'An unexpected error occurred.');
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