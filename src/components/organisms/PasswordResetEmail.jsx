import Button from '../atoms/Button';
import ResponseModal from '../molecules/ResponseModal';
import usePasswordReset from '../../hooks/usePasswordReset';
import Form from '../molecules/Form';
import Input from '../atoms/Input';

export default function PasswordResetEmail({ togglePasswordResetEmail }) {
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
  } = usePasswordReset();

  return (
    <div id='form'>
      {!emailSent ? (
        <Form onSubmit={handleSubmit}>
          <label>Enter your email:</label>
          <Input
            type='email'
            value={email}
            onChange={handleEmailChange}
            required
          />
          <div className='bg-black'>
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
}
