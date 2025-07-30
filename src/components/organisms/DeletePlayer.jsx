import Button from '../atoms/Button';
import ResponseModal from '../molecules/ResponseModal';
import useDeletePlayer from '../../hooks/useDeletePlayer';
import Form from '../molecules/Form';

export default function DeletePlayer({
  deleteFunction,
  classDB,
  propName,
  objName,
}) {
  const {
    handleDeletion,
    selectedItem,
    handleItemChange,
    items,
    success,
    error,
    setError,
    setSuccess,
  } = useDeletePlayer(deleteFunction, classDB, propName, objName);

  return (
    <>
      <Form onSubmit={handleDeletion}>
        <select
          value={selectedItem ? selectedItem.propName : ''}
          onChange={handleItemChange}
          className='text-black w-full p-3 rounded'
        >
          <option value=''>
            {deleteFunction === 'deleteEdh' ? 'Select Deck' : 'Select Player'}
          </option>
          {items.map((item) => (
            <option key={item.objectId} value={item.propName}>
              {item.propName}
            </option>
          ))}
        </select>
        <Button type='submit' className='mt-10'>
          Delete
        </Button>
      </Form>
      {success && (
        <ResponseModal
          title='Success'
          message={'Successfully deleted!'}
          onConfirm={() => setSuccess(false)}
        />
      )}
      {error && (
        <ResponseModal
          title='Error'
          message={error}
          onConfirm={() => setError(null)}
        />
      )}
    </>
  );
}
