import { Suspense, lazy, useState } from 'react';
import Button from '../atoms/Button';
import Deletion from './DeletePlayer';
import CreateMatch from './CreateMatch';

const RegistrationForm = lazy(() => import('./NewPlayerForm'));
const UploadAvatar = lazy(() => import('./UploadAvatar'));
const NewUser = lazy(() => import('./NewUserForm'));

export default function AdminOptions() {
  const [activeComponent, setActiveComponent] = useState(null);

  const goBack = () => setActiveComponent(null);

  return (
    <div className='flex flex-col items-center justify-center mb-5 gap-y-4'>
      {!activeComponent ? (
        <>
          <Button
            onClick={() => setActiveComponent('NewUser')}
            className='w-44'
          >
            New User
          </Button>
          <Button
            onClick={() => setActiveComponent('CreatePlayerMatch')}
            className='w-44'
          >
            Create Player Match
          </Button>
          <Button
            onClick={() => setActiveComponent('CreateNewPlayer')}
            className='w-44'
          >
            Create New Player
          </Button>
          <Button
            onClick={() => setActiveComponent('UploadPlayerAvatar')}
            className='w-44'
          >
            Upload Player Avatar
          </Button>
          <Button
            onClick={() => setActiveComponent('DeletePlayer')}
            className='w-44'
          >
            Delete Player
          </Button>
          <Button
            onClick={() => setActiveComponent('CreateCommanderMatch')}
            className='w-44'
          >
            Create Commander Match
          </Button>
          <Button
            onClick={() => setActiveComponent('CreateNewCommander')}
            className='w-44'
          >
            Create New Commander
          </Button>
          <Button
            onClick={() => setActiveComponent('UploadCommanderAvatar')}
            className='w-44'
          >
            Upload Commander Avatar
          </Button>
          <Button
            onClick={() => setActiveComponent('DeleteCommander')}
            className='w-44'
          >
            Delete Commander
          </Button>
        </>
      ) : (
        <>
          <Button onClick={goBack} className='w-44'>
            Back
          </Button>
          <div className='mt-4'>
            <Suspense fallback={<p>Loading...</p>}>
              {activeComponent === 'NewUser' && <NewUser />}
              {activeComponent === 'CreateNewCommander' && (
                <RegistrationForm
                  parseFunction='createEdh'
                  parseClass='deckName'
                />
              )}
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
