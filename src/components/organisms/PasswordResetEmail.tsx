import { FC } from 'react';
import Button from '../atoms/Button';
import ResponseModal from '../molecules/ResponseModal';
import usePasswordReset from '../../hooks/usePasswordReset';
import Form from '../molecules/Form';
import Input from '../atoms/Input';

interface PasswordResetEmailProps {
  togglePasswordResetEmail: () => void;
}

const PasswordResetEmail: FC<PasswordResetEmailProps> = ({ togglePasswordResetEmail }) => {
  const {
    emailSent,
    handleSubmit,
    email,
    handleEmailChange,
    isModalOpen,
    modalTitle,
    modalMessage,
    setIsModalOpen,
    handleReturnToLogin,
  } = usePasswordReset(togglePasswordResetEmail);

  return (
    <div id='form'>
      {!emailSent ? (
        <Form onSubmit={handleSubmit}>
          <label className='text-[#e0d7c8]/70 text-sm'>Enter your email:</label>
          <Input
            type='email'
            value={email}
            onChange={handleEmailChange}
            required
          />
          <div className='flex flex-col gap-3 mt-6'>
            <Button type='submit'>Send Email</Button>
            <Button onClick={togglePasswordResetEmail}>Back to Login</Button>
          </div>
        </Form>
      ) : (
        <Button onClick={handleReturnToLogin}>Return to Login</Button>
      )}
      {isModalOpen && (
        <ResponseModal
          title={modalTitle}
          message={modalMessage}
          onConfirm={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default PasswordResetEmail;