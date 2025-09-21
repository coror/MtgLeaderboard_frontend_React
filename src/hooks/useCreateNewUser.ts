// @ts-expect-error it works, but i dont know why it shows no module found
import Parse from 'parse/dist/parse.min.js';
import { useQueryClient } from '@tanstack/react-query';
import { useState, ChangeEvent, FormEvent } from 'react';

// Define the shape of the form data
interface UserFormData {
  email: string;
  name: string;
  surname: string;
  roleName: 'user' | 'admin';
  password: string;
}

// Define the return type of the custom hook
interface UseCreateNewUserResult {
  submitHandler: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  formData: UserFormData;
  inputChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
  resetModalState: () => void;
  success: boolean;
}

const initialFormData: UserFormData = {
  email: '',
  name: '',
  surname: '',
  roleName: 'user',
  password: '',
};

export default function useCreateNewUser(): UseCreateNewUserResult {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [formData, setFormData] = useState<UserFormData>(initialFormData);

  const queryClient = useQueryClient();

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      if (checked) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          roleName: value as 'user' | 'admin',
        }));
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    const { email, name, surname, password, roleName } = formData;

    if (!email || !name || !surname || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      await Parse.Cloud.run('createUser', {
        email,
        name,
        surname,
        password,
        roleName,
      });

      setSuccess(true);
      setFormData(initialFormData);
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
    } catch (err) {
      console.error(err);
      setError((err as Error).message || 'An unexpected error occurred.');
    }
  };

  const resetModalState = () => {
    setError(null);
    setSuccess(false);
  };

  return {
    submitHandler,
    formData,
    inputChangeHandler,
    error,
    resetModalState,
    success,
  };
}
