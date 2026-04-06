import Button from '../atoms/Button';
import ResponseModal from '../molecules/ResponseModal';
import useDeletePlayer from '../../hooks/useDeletePlayer';
import Form from '../molecules/Form';
import CustomSelect from '../atoms/CustomSelect';
import { DeletePlayerProps } from '../../models/deletePlayer';

export default function DeletePlayer({
  deleteFunction,
  classDB,
  propName,
  objName,
}: DeletePlayerProps) {
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
      <Form onSubmit={handleDeletion} className='w-[280px]'>
        <div className='w-full'>
          <CustomSelect
            value={selectedItem ? selectedItem.propName : ''}
            onChange={(value) => handleItemChange({ target: { value } } as React.ChangeEvent<HTMLSelectElement>)}
            placeholder={deleteFunction === 'deleteEdh' ? 'Select Deck' : 'Select Player'}
            options={items.map((item) => ({
              value: item.propName,
              label: item.propName,
            }))}
          />
        </div>
        <Button type='submit' className='mt-8'>
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
