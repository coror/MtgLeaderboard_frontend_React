import Parse from 'parse';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export default function useCreateNewUser() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const initialFormData = {
    email: '',
    name: '',
    surname: '',
    roleName: 'user',
    password: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const queryClient = useQueryClient();

  const inputChangeHandler = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === 'checkbox') {
      if (checked) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          roleName: value,
        }));
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const submitHandler = async (event) => {
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
      setError(err.message || 'An unexpected error occurred.');
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
