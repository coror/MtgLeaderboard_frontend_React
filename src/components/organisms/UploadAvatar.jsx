import Button from '../atoms/Button';
import ResponseModal from '../molecules/ResponseModal';
import useUploadAvatar from '../../hooks/useUploadAvatar';
import Form from '../molecules/Form';
import Select from '../atoms/Select';

export default function UploadAvatar({
  uploadFunction,
  classDB,
  propName,
  objName,
}) {
  const {
    handleUpload,
    selectedPlayer,
    handlePlayerChange,
    players,
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
          <Select
            value={selectedPlayer ? selectedPlayer.objectId : ''}
            onChange={handlePlayerChange}
          >
            <option value=''>
              {uploadFunction === 'uploadEdhAvatar'
                ? 'Select Deck'
                : 'Select Player'}
            </option>
            {players.map((player) => (
              <option key={player.objectId} value={player.objectId}>
                {player.propName}
              </option>
            ))}
          </Select>
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
