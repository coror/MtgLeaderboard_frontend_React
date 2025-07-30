import Button from '../atoms/Button';
import ResponseModal from '../molecules/ResponseModal';
import useUploadAvatar from '../../hooks/useUploadAvatar';
import Form from '../molecules/Form';

export default function UploadAvatar({
  uploadFunction,
  classDB,
  propName,
  objName,
}) {
  const {
    handleUpload,
    selectedDeck,
    handleDeckChange,
    deckNames,
    handleFileChange,
    avatarData,
    error,
    success,
    resetModalState,
  } = useUploadAvatar(uploadFunction, classDB, propName, objName);

  return (
    <>
      <Form onSubmit={handleUpload}>
        <div>
          <select
            value={selectedDeck ? selectedDeck.objectId : ''}
            onChange={handleDeckChange}
          >
            <option value=''>
              {uploadFunction === 'uploadEdhAvatar'
                ? 'Select Deck'
                : 'Select Player'}
            </option>
            {deckNames.map((deck) => (
              <option key={deck.objectId} value={deck.objectId}>
                {deck.propName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input type='file' accept='image/*' onChange={handleFileChange} />
          {avatarData && <img src={avatarData} alt='Preview' />}
        </div>
        <Button type='submit' className='mt-10'>
          Upload
        </Button>
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
          message='Avatar uploaded successfully'
          onConfirm={resetModalState}
        />
      )}
    </>
  );
}
