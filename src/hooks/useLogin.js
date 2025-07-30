import { useState } from 'react';
import { useAuth } from '../store/auth-context';

export default function useLoginState() {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPasswordResetEmail, setShowPasswordResetEmail] = useState(false);
  const [loginAttempted, setLoginAttempted] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginAttempted(true); 
    setIsLoggingIn(true);
    setLoginError('');

    try {
      await login(email, password);
    } catch (error) {
      setLoginError('Invalid email or password');
    } finally {
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

  const togglePasswordResetEmail = () => {
    setShowPasswordResetEmail(!showPasswordResetEmail);
  };

  return {
    loginError,
    isLoggingIn,
    loginAttempted,
    handleLogin,
    handleInputChange,
    togglePasswordResetEmail,
    showPasswordResetEmail,
    email,
    password,
  };
}
