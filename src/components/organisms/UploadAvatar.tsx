import { FC } from 'react';
import Button from '../atoms/Button';
import ResponseModal from '../molecules/ResponseModal';
import useUploadAvatar from '../../hooks/useUploadAvatar';
import Form from '../molecules/Form';
import CustomSelect from '../atoms/CustomSelect';
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
      <Form onSubmit={handleUpload} className='w-[280px]'>
        <div className='w-full'>
          <CustomSelect
            value={selectedPlayer ? selectedPlayer.objectId : ''}
            onChange={(value) => handlePlayerChange({ target: { value } } as React.ChangeEvent<HTMLSelectElement>)}
            placeholder={uploadFunction === 'uploadEdhAvatar' ? 'Select Deck' : 'Select Player'}
            options={players.map((player) => ({
              value: player.objectId,
              label: player.propName,
            }))}
          />
        </div>
        <div className='mt-4 w-full'>
          <label className='flex flex-col items-center gap-2 cursor-pointer bg-[#1a1812]/80 border border-[rgba(201,169,89,0.2)] rounded-lg p-4 text-[#e0d7c8]/50 text-sm hover:border-[rgba(201,169,89,0.4)] transition-all'>
            <span>{avatarData ? 'Change image' : 'Choose image'}</span>
            <input type='file' accept='image/*' onChange={handleFileChange} className='hidden' />
          </label>
          {avatarData && typeof avatarData === 'string' && (
            <img src={avatarData} alt='Preview' className='mt-3 rounded-lg max-h-32 mx-auto' />
          )}
        </div>
        <Button type='submit' className='mt-8'>
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
