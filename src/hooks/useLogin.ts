import { ChangeEvent, FormEvent, useState } from 'react';
import { useAuth } from '../store/auth-context';

export default function useLoginState() {
  const { login } = useAuth();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [showPasswordResetEmail, setShowPasswordResetEmail] =
    useState<boolean>(false);
  const [loginAttempted, setLoginAttempted] = useState<boolean>(false);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginAttempted(true);
    setIsLoggingIn(true);
    setLoginError('');

    try {
      await login(email, password);
    } catch (error) {
      setLoginError('Invalid email or password' + error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
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
