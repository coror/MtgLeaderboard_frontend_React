import { useState, ChangeEvent, FormEvent } from 'react';
// @ts-expect-error it works, but i dont know why it shows no module found
import Parse from 'parse/dist/parse.min.js';

interface UsePasswordResetResult {
  emailSent: boolean;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  email: string;
  handleEmailChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleReturnToLogin: () => void;
  isModalOpen: boolean;
  modalTitle: string;
  modalMessage: string;
  setIsModalOpen: (value: boolean) => void;
}

export default function usePasswordReset(
  togglePasswordResetEmail: () => void
): UsePasswordResetResult {
  const [email, setEmail] = useState<string>('');
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalMessage, setModalMessage] = useState<string>('');

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
        (error as Error).message ||
          'An error occurred while sending the request.'
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
