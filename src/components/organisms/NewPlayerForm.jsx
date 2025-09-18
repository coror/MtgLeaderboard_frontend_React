import ResponseModal from '../molecules/ResponseModal';
import useNewPlayerForm from '../../hooks/useNewPlayerForm';
import Form from '../molecules/Form';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

export default function NewPlayerForm({ parseFunction, parseClass }) {
  const {
    formData,
    handleSubmit,
    handleInputChange,
    status,
    errorMessage,
    resetStatus,
  } = useNewPlayerForm(parseFunction, parseClass);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Input
          type='text'
          name='name'
          placeholder='Name'
          value={formData.name}
          onChange={handleInputChange}
        />
        <Button type='submit' className='mt-10'>
          Create
        </Button>
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
}
