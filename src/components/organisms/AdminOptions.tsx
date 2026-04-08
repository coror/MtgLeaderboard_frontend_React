import { Suspense, lazy, useState, useEffect } from 'react';
import Button from '../atoms/Button';
import Deletion from './DeletePlayer';
import CreateMatch from './CreateMatch';
import { AdminOptionsProps } from '../../models/admin.ts';

const RegistrationForm = lazy(() => import('./NewPlayerForm.tsx'));
const UploadAvatar = lazy(() => import('./UploadAvatar.tsx'));
const UploadDecklist = lazy(() => import('./UploadDecklist'));
const NewUser = lazy(() => import('./NewUserForm.tsx'));

type Props = {
  onOptionChange?: (isOpen: boolean) => void;
};

export default function AdminOptions({ onOptionChange }: Props) {
  const [activeComponent, setActiveComponent] =
    useState<AdminOptionsProps>(null);

  useEffect(() => {
    onOptionChange?.(!!activeComponent);
  }, [activeComponent, onOptionChange]);

  const goBack = () => setActiveComponent(null);

  return (
    <div className='flex flex-col items-center justify-center gap-y-4'>
      {!activeComponent ? (
        <>
          <Button
            onClick={() => setActiveComponent('CreateCommanderMatch')}
            className='w-40 !min-h-10 !py-2 !text-sm'
          >
            Create EDH Match
          </Button>
          <Button
            onClick={() => setActiveComponent('CreateNewCommander')}
            className='w-40 !min-h-10 !py-2 !text-sm'
          >
            Create New EDH
          </Button>
          <Button
            onClick={() => setActiveComponent('UploadCommanderAvatar')}
            className='w-40 !min-h-10 !py-2 !text-sm'
          >
            Upload EDH Avatar
          </Button>
          <Button
            onClick={() => setActiveComponent('DeleteCommander')}
            className='w-40 !min-h-10 !py-2 !text-sm'
          >
            Delete EDH
          </Button>
          <Button
            onClick={() => setActiveComponent('UploadDecklist')}
            className='w-40 !min-h-10 !py-2 !text-sm'
          >
            Upload Decklist
          </Button>
          <Button
            onClick={() => setActiveComponent('CreatePlayerMatch')}
            className='w-40 !min-h-10 !py-2 !text-sm'
          >
            Create Player Match
          </Button>
          <Button
            onClick={() => setActiveComponent('CreateNewPlayer')}
            className='w-40 !min-h-10 !py-2 !text-sm'
          >
            Create New Player
          </Button>
          <Button
            onClick={() => setActiveComponent('UploadPlayerAvatar')}
            className='w-40 !min-h-10 !py-2 !text-sm'
          >
            Upload Player Avatar
          </Button>
          <Button
            onClick={() => setActiveComponent('DeletePlayer')}
            className='w-40 !min-h-10 !py-2 !text-sm'
          >
            Delete Player
          </Button>
          <Button
            onClick={() => setActiveComponent('NewUser')}
            className='w-40 !min-h-10 !py-2 !text-sm'
          >
            New User
          </Button>
        </>
      ) : (
        <>
          <button
            onClick={goBack}
            className='self-start -mt-2 mb-2 p-2 text-white/70 hover:text-white transition-colors hover:scale-110 active:scale-95'
            aria-label='Go back'
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </button>
          <div>
            <Suspense fallback={<div className='loading-spinner' style={{ width: 32, height: 32 }} />}>
              {activeComponent === 'NewUser' && <NewUser />}
              {activeComponent === 'CreateNewCommander' && (
                <RegistrationForm
                  parseFunction='createEdh'
                  parseClass='deckName'
                />
              )}
              {activeComponent === 'UploadDecklist' && <UploadDecklist />}
              {activeComponent === 'CreateNewPlayer' && (
                <RegistrationForm
                  parseFunction='createEdhPlayer'
                  parseClass='edhPlayerName'
                />
              )}
              {activeComponent === 'UploadCommanderAvatar' && (
                <UploadAvatar
                  uploadFunction='uploadEdhAvatar'
                  classDB='Edh'
                  propName='deckName'
                  objName='edhId'
                />
              )}
              {activeComponent === 'UploadPlayerAvatar' && (
                <UploadAvatar
                  uploadFunction='uploadEdhPlayerAvatar'
                  classDB='EdhPlayer'
                  propName='edhPlayerName'
                  objName='edhPlayerId'
                />
              )}
              {activeComponent === 'DeleteCommander' && (
                <Deletion
                  deleteFunction='deleteEdh'
                  classDB='Edh'
                  propName='deckName'
                  objName='deckId'
                />
              )}
              {activeComponent === 'DeletePlayer' && (
                <Deletion
                  deleteFunction='deleteEdhPlayer'
                  classDB='EdhPlayer'
                  propName='edhPlayerName'
                  objName='edhPlayerId'
                />
              )}
              {activeComponent === 'CreateCommanderMatch' && (
                <CreateMatch
                  updateFunction='createEdhMatch'
                  classDB='Edh'
                  propName='deckName'
                  objName='edhId'
                />
              )}
              {activeComponent === 'CreatePlayerMatch' && (
                <CreateMatch
                  updateFunction='createEdhPlayerMatch'
                  classDB='EdhPlayer'
                  propName='edhPlayerName'
                  objName='edhPlayerId'
                />
              )}
            </Suspense>
          </div>
        </>
      )}
    </div>
  );
}
