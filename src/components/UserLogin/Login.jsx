import { useState, useEffect } from 'react';
import Parse from 'parse';
import classes from './Login.module.css';
import PasswordResetEmail from '../UpdateUser/PasswordResetEmail';
import PropTypes from 'prop-types';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPasswordResetEmail, setShowPasswordResetEmail] = useState(false);
  const [loginAttempted, setLoginAttempted] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = '/assets/wallpaper6.jpg'; // Path to your image
    image.onload = () => setIsImageLoaded(true);
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoggingIn(true);

    try {
      const user = await Parse.User.logIn(email, password);
      const sessionToken = user.getSessionToken();
      onLogin(sessionToken);
      localStorage.setItem('sessionToken', sessionToken);
      console.log('logged in', user);
      setLoginError('');
      setLoginAttempted(false);
    } catch (error) {
      setLoginError('Invalid email or password');
      setLoginAttempted(true);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleInputChange = (event) => {
    setLoginError('');
    setLoginAttempted(false);
    const { name, value } = event.target;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const togglePasswordResetEmail = () => {
    setShowPasswordResetEmail(!showPasswordResetEmail);
  };

  return (
    <div className="bg-[url('/assets/wallpaper6.webp')] h-screen w-screen bg-center bg-cover flex flex-col justify-center items-center overflow-hidden">
      <h1 className='text-4xl font-bold mb-5 text-center text-white'>
        MTG Leaderboard
      </h1>
      <div className='bg-black/40 backdrop-blur-sm p-10 rounded-lg shadow-lg'>
        {showPasswordResetEmail ? (
          <PasswordResetEmail
            togglePasswordResetEmail={togglePasswordResetEmail}
          />
        ) : (
          <form onSubmit={handleLogin} className='flex flex-col gap-4'>
            <div className='space-y-[2px]'>
              <div>
                <input
                  type='email'
                  name='email'
                  value={email}
                  onChange={handleInputChange}
                  className={`w-full rounded-t-xl p-[10px] bg-white/70 transition-all 
                    ${loginAttempted && loginError ? 'border-[1px] border-red-500' : ''}
                    focus:outline-none focus:ring-2 focus:ring-black focus:border-black
                    active:ring-2 active:ring-black active:border-black`}
                  placeholder='Email'
                />
              </div>
              <div>
                <input
                  type='password'
                  name='password'
                  value={password}
                  onChange={handleInputChange}
                  className={`w-full rounded-b-xl p-[10px] bg-white/70 transition-all 
                    ${loginAttempted && loginError ? 'border-[1px] border-red-500' : ''}
                    focus:outline-none focus:ring-2 focus:ring-black focus:border-black
                    active:ring-2 active:ring-black active:border-black`}
                  placeholder='Password'
                />
              </div>
              <div className='text-center'>
                <span
                  onClick={togglePasswordResetEmail}
                  className='text-blue-800 cursor-pointer hover:underline text-xs'
                >
                  Forgot your password?
                </span>
              </div>
            </div>

            <div>
              {loginError && <p className='text-red-500'>{loginError}</p>}
            </div>

            <div>
              <button
                type='submit'
                disabled={isLoggingIn}
                className='bg-gray-200 w-full rounded-3xl h-12 text-xl'
              >
                {isLoggingIn ? (
                  <span className={classes['loading-spinner']}></span>
                ) : (
                  'Login'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

Login.propTypes = {
  onLogin: PropTypes.func,
};
