import { useState } from 'react';
import Parse from 'parse';

export default function usePasswordReset(togglePasswordResetEmail) {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await Parse.User.requestPasswordReset(email);

      setEmailSent(true);
      setModalTitle('Success');
      setModalMessage('Email sent. Check your inbox for further instructions.');
    } catch (error) {
      console.error('Password reset error:', error);
      setModalTitle('Error');
      setModalMessage(
        error.message || 'An error occurred while sending the request.'
      );
    }

    setIsModalOpen(true);
  };

  const handleReturnToLogin = () => {
    togglePasswordResetEmail();
  };

  return {
    emailSent,
    handleSubmit,
    email,
    handleEmailChange,
    handleReturnToLogin,
    isModalOpen,
    modalTitle,
    modalMessage,
    setIsModalOpen,
  };
}
