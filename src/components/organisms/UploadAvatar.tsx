import { FC } from 'react';
import Button from '../atoms/Button';
import ResponseModal from '../molecules/ResponseModal';
import useUploadAvatar from '../../hooks/useUploadAvatar';
import Form from '../molecules/Form';
import Select from '../atoms/Select';
import { UploadAvatarProps } from '../../models/uploadAvatar';

const UploadAvatar: FC<UploadAvatarProps> = ({
  uploadFunction,
  classDB,
  propName,
  objName,
}) => {
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
          {/* Add a type guard here to ensure avatarData is a string */}
          {avatarData && typeof avatarData === 'string' && (
            <img src={avatarData} alt='Preview' />
          )}
        </div>
        <Button type='submit' className='mt-10'>
          Upload
        </Button>
      </Form>
      {error && (
        <ResponseModal
          title='Error'
          message={error || 'An unexpected error occurred.'}
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
};

export default UploadAvatar;
