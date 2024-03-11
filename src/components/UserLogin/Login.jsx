import { useState } from 'react';
import Parse from 'parse';
import classes from './Login.module.css';
import Button from '../UI/Button';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPasswordEmailReset, setShowPasswordEmailReset] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoggingIn(true);

    try {
      const user = await Parse.User.logIn(email, password);
      const sessionToken = user.getSessionToken();
      onLogin(sessionToken);
      localStorage.setItem('sessionToken', sessionToken);
      console.log('logged in', user);
    } catch (error) {
      setLoginError('Invalid email or password');
      setIsLoggingIn(false);
    }
  };

  const handleInputChange = (event) => {
    setLoginError('');
    const { name, value } = event.target;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  let inputClassName = '';

  if (loginError) {
    inputClassName = classes['login-error'];
  }

  const togglePasswordEmailReset = () => {
    setShowPasswordEmailReset(!showPasswordEmailReset);
  };

  return (
    <div className={classes['login-container']}>
      <form className={classes['login-form']} onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type='email'
            name='email'
            className={inputClassName}
            value={email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type='password'
            name='password'
            className={inputClassName}
            value={password}
            onChange={handleInputChange}
          />
        </div>
        <div>
          {loginError && <p className={classes['login-error']}>{loginError}</p>}
        </div>
        <div>
          <Button type='submit' disabled={isLoggingIn}>
            {isLoggingIn ? 'Logging In...' : 'LOGIN'}
          </Button>
        </div>
      </form>
    </div>
  );
}
