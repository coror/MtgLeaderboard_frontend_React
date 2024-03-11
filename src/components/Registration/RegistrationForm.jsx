import { useReducer, useState } from 'react';
import Button from '../UI/Button';
import formReducer from '../helpers/formReducer';
import classes from './RegistrationForm.module.css';
import ResponseModal from '../UI/ResponseModal';

const initialState = {
  name: '',
  category: [],
};

const RegistrationForm = ({ createFunction, paramName }) => {
  const [formData, dispatch] = useReducer(formReducer, initialState);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError(null);
    setSuccess(false);

    try {
      if (formData.name.trim().length === 0) {
        setError('Name cannot be empty.'); // Set error message if name is empty
        return;
      }

      const response = await fetch(
        `https://parseapi.back4app.com/functions/${createFunction}`,
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
            [paramName]: formData.name,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data);
        setSuccess(true);
        dispatch({ type: 'RESET_FORM' });
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Something went wrong.'); // Set error message from API or default message
      }
    } catch (error) {
      console.log(error);
      setError('An unexpected error occurred.'); // Default error message
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    dispatch({
      type: 'UPDATE_FIELD',
      field: name,
      value,
    });
  };

  const resetModalState = () => {
    setError(null);
    setSuccess(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={classes.form}>
      <div>
            {createFunction === 'createEdh'
              ? 'New Commander'
              : 'New Commander Player'}
            :
          </div>
        <input
          className={classes.input}
          type='text'
          name='name'
          placeholder='Name'
          value={formData.name}
          onChange={handleInputChange}
        />
        <div className={classes['buttons-container']}>
          <Button type='submit'>Submit</Button>
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
          message='Successfully created!'
          onConfirm={resetModalState}
        />
      )}
    </>
  );
};

export default RegistrationForm;
