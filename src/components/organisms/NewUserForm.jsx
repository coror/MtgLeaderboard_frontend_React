import Button from '../atoms/Button';
import ResponseModal from '../molecules/ResponseModal';
import useCreateNewUser from '../../hooks/useCreateNewUser';
import Form from '../molecules/Form';
import Input from '../atoms/Input';

export default function NewUserForm() {
  const {
    submitHandler,
    formData,
    inputChangeHandler,
    error,
    resetModalState,
    success,
  } = useCreateNewUser();

  return (
    <>
      <Form onSubmit={submitHandler}>
        <div>Create New User:</div>
        <Input
          type='email'
          name='email'
          placeholder='Your email address'
          value={formData.email}
          onChange={inputChangeHandler}
        />
        <Input
          type='text'
          name='name'
          placeholder='Name'
          value={formData.name}
          onChange={inputChangeHandler}
        />
        <Input
          type='text'
          name='surname'
          placeholder='Surname'
          value={formData.surname}
          onChange={inputChangeHandler}
        />
        <Input
          type='password'
          name='password'
          placeholder='Password'
          value={formData.password}
          onChange={inputChangeHandler}
        />
        <div className='m-1 felx flex-row space-x-2'>
          <Input
            type='checkbox'
            id='user'
            name='roleName'
            value='user'
            checked={formData.roleName === 'user'}
            onChange={inputChangeHandler}
          />
          <label htmlFor='user'>User</label>

          <Input
            type='checkbox'
            id='admin'
            name='roleName'
            value='admin'
            checked={formData.roleName === 'admin'}
            onChange={inputChangeHandler}
          />
          <label htmlFor='admin'>Admin</label>
        </div>
        <div>
          <Button type='submit' className='mt-8'>
            Create
          </Button>
        </div>
      </Form>

      {error && (
        <ResponseModal
          title='Error'
          message={error}
          onConfirm={resetModalState}
        />
      )}

      {success && (
        <ResponseModal
          title='Success'
          message='User created successfully'
          onConfirm={resetModalState}
        />
      )}
    </>
  );
}
