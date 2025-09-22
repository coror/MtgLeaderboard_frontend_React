import { FC } from 'react';
import ResponseModal from '../molecules/ResponseModal';
import useRegistartionForm from '../../hooks/useNewPlayerForm';
import Form from '../molecules/Form';
import Input from '../atoms/Input';
import { RegistrationFormProps } from '../../models/registrationForm';

const RegistrationForm: FC<RegistrationFormProps> = ({
  parseFunction,
  parseClass,
}) => {
  const {
    formData,
    handleSubmit,
    handleInputChange,
    status,
    errorMessage,
    resetStatus,
  } = useRegistartionForm(parseFunction, parseClass);

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        title={
          parseFunction === 'createEdh'
            ? 'New Commander'
            : 'New Commander Player'
        }
      >
        <Input
          type='text'
          name='name'
          placeholder='Name'
          value={formData.name}
          onChange={handleInputChange}
        />
      </Form>
      {status === 'error' && (
        <ResponseModal
          title='Error'
          message={errorMessage || 'An unknown error occurred.'} // Added fallback for message
          onConfirm={resetStatus}
        />
      )}

      {status === 'success' && (
        <ResponseModal
          title='Success'
          message='Successfully created!'
          onConfirm={resetStatus}
        />
      )}
    </>
  );
};

export default RegistrationForm;
