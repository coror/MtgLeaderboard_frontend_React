import ResponseModal from '../UI/ResponseModal';
import useRegistartionForm from '../../hooks/useNewPlayerForm';
import Form from '../UI/Form';
import Input from '../UI/Input';

const RegistrationForm = ({ parseFunction, parseClass }) => {
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
          message={errorMessage}
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
