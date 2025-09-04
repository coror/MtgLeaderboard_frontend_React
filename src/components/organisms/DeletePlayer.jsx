import Button from '../atoms/Button';
import ResponseModal from '../molecules/ResponseModal';
import useDeletePlayer from '../../hooks/useDeletePlayer';
import Form from '../molecules/Form';
import Select from '../atoms/Select';

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
        <Select
          value={selectedItem ? selectedItem.propName : ''}
          onChange={handleItemChange}
        >
          <option value=''>
            {deleteFunction === 'deleteEdh' ? 'Select Deck' : 'Select Player'}
          </option>
          {items.map((item) => (
            <option key={item.objectId} value={item.propName}>
              {item.propName}
            </option>
          ))}
        </Select>
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
