import React, { useState } from 'react';

import Button from '../UI/Button';
import classes from './NewUser.module.css';
import ResponseModal from '../UI/ResponseModal';
import { useQueryClient } from '@tanstack/react-query';

export default function NewUser() {
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

    if (type === 'checkbox' && checked) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        roleName: value,
      }));
    } else if (type === 'checkbox' && !checked) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        roleName: prevFormData.roleName === 'user' ? 'admin' : 'user',
      }));
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

    try {
      if (
        !formData.email ||
        !formData.name ||
        !formData.surname ||
        !formData.password
      ) {
        setError('Please fill in all fields.'); // Error if any field is empty
        return;
      }

      const response = await fetch(
        'https://parseapi.back4app.com/functions/createUser',
        {
          method: 'POST',
          headers: {
            'X-Parse-Application-Id': import.meta.env
              .VITE_REACT_APP_PARSE_APPLICATION_ID,
            'X-Parse-REST-API-Key': import.meta.env
              .VITE_REACT_APP_PARSE_REST_API_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            name: formData.name,
            surname: formData.surname,
            password: formData.password,
            roleName: formData.roleName,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data);
        setSuccess(true);
        setFormData(initialFormData); // Reset the form after successful submission
        queryClient.invalidateQueries({ queryKey: ['leaderboard']});
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Something went wrong.'); // Set error message from API or default message
      }
    } catch (error) {
      console.log(error);
      setError('An unexpected error occurred.'); // Default error message
    }
  };

  const resetModalState = () => {
    setError(null);
    setSuccess(false);
  };

  return (
    <>
      <form className={classes['form-container']} onSubmit={submitHandler}>
        <div>Create New User:</div>
        <input
          className={classes.input}
          type='email'
          name='email'
          placeholder='Your email address'
          value={formData.email}
          onChange={inputChangeHandler}
        />
        <input
          className={classes.input}
          type='text'
          name='name'
          placeholder='Name'
          value={formData.name}
          onChange={inputChangeHandler}
        />
        <input
          className={classes.input}
          type='text'
          name='surname'
          placeholder='Surname'
          value={formData.surname}
          onChange={inputChangeHandler}
        />
        <input
          className={classes.input}
          type='password'
          name='password'
          placeholder='Password'
          value={formData.password}
          onChange={inputChangeHandler}
        />
        <div className={classes['role-container']}>
          <input
            type='checkbox'
            id='user'
            name='roleName'
            value='user'
            checked={formData.roleName === 'user'}
            onChange={inputChangeHandler}
          />
          <label htmlFor='user'>User</label>

          <input
            type='checkbox'
            id='admin'
            name='roleName'
            value='admin'
            checked={formData.roleName === 'admin'}
            onChange={inputChangeHandler}
          />
          <label htmlFor='admin'>Admin</label>
        </div>
        <div className={classes['buttons-container']}>
          <Button type='submit'>Create</Button>
        </div>
      </form>
      {error && (
        <ResponseModal
          title='Error'
          message={error}
          onConfirm={resetModalState}
        />
      )}

      {success && (
        <ResponseModal
          title='Success'
          message='User created successfully'
          onConfirm={resetModalState}
        />
      )}
    </>
  );
}
