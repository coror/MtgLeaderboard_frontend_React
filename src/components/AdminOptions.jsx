import { Suspense, useState, lazy } from 'react';
import Deletion from './Deletion/Deletion';
import Button from './UI/Button';
import CreateMatch from './UpdateScore/CreateMatch';

import useAdminOptions from '../useAdminOptions';

const RegistrationForm = lazy(() => import('./Registration/RegistrationForm'));
const UpdateScore = lazy(() => import('./UpdateScore/UpdateScore'));
const UploadAvatar = lazy(() => import('./UploadAvatar/UploadAvatar'));
const NewUser = lazy(() => import('./NewUser/NewUser'));

export default function AdminOptions({ userRole }) {
  const [showMenu, setShowMenu] = useState(false);
  const {
    toggleCreateEDHPlayerMatch,
    toggleCreateEDHMatch,
    toggleDeleteEDHPlayer,
    toggleDeleteEDH,
    toggleCreateNewUser,
    toggleUploadAvatarEDHPlayer,
    toggleUploadAvatarEDH,
    toggleEditLossesEDHPlayer,
    toggleEditWinsEDHPlayer,
    toggleEditLossesEDH,
    toggleEditWinsEDH,
    toggleRegistrationFormEDHPlayer,
    toggleRegistrationFormEDH,
    showCreateNewUser,
    showCreateEdhMatch,
    showCreateEdhPlayerMatch,
    showRegistrationFormEDHPlayer,
    showEditWinsEDHPlayer,
    showEditLossesEDHPlayer,
    showUploadAvatarEDHPlayer,
    showDeleteEDHPlayer,
    showRegistrationFormEDH,
    showEditWinsEDH,
    showEditLossesEDH,
    showUploadAvatarEDH,
    showDeleteEDH,
  } = useAdminOptions();

  const openMenu = async () => {
    if (userRole === 'admin') {
      setShowMenu(true);
    }
  };

  const hideMenu = () => {
    setShowMenu(false);
    // setShowCreateNewUser(false);
  };

  return (
    <div className='flex flex-col items-center justify-center mb-5 gap-y-4'>
      {userRole === 'admin' && (
        <div className={`${showMenu ? 'border p-5' : ''} `}>
          {showMenu ? (
            <div>
              <div className='flex gap-x-3'>
                <Button onClick={hideMenu} isActive={showMenu}>
                  Hide Options
                </Button>
                <Button
                  onClick={toggleCreateNewUser}
                  isActive={showCreateNewUser}
                >
                  New User
                </Button>
              </div>
              <div className='flex flex-col justify-center items-center'>
                <p>Players</p>
                <div className='grid grid-cols-2 gap-3'>
                  <Button
                    onClick={toggleCreateEDHPlayerMatch}
                    isActive={showCreateEdhPlayerMatch}
                  >
                    Create Player Match
                  </Button>
                  <Button
                    onClick={toggleRegistrationFormEDHPlayer}
                    isActive={showRegistrationFormEDHPlayer}
                  >
                    Create New Player
                  </Button>
                  <Button
                    onClick={toggleEditWinsEDHPlayer}
                    isActive={showEditWinsEDHPlayer}
                  >
                    Update Player Wins
                  </Button>
                  <Button
                    onClick={toggleEditLossesEDHPlayer}
                    isActive={showEditLossesEDHPlayer}
                  >
                    Update Player Losses
                  </Button>
                  <Button
                    onClick={toggleUploadAvatarEDHPlayer}
                    isActive={showUploadAvatarEDHPlayer}
                  >
                    Upload Player Avatar
                  </Button>
                  <Button
                    onClick={toggleDeleteEDHPlayer}
                    isActive={showDeleteEDHPlayer}
                  >
                    Delete Player
                  </Button>
                </div>
              </div>
              <div className='flex flex-col justify-center items-center'>
                <p>Commanders</p>
                <div className='grid grid-cols-2 gap-3'>
                  <Button
                    onClick={toggleCreateEDHMatch}
                    isActive={showCreateEdhMatch}
                  >
                    Create Commander Match
                  </Button>

                  <Button
                    onClick={toggleRegistrationFormEDH}
                    isActive={showRegistrationFormEDH}
                  >
                    Create New Commander
                  </Button>
                  <Button
                    onClick={toggleEditWinsEDH}
                    isActive={showEditWinsEDH}
                  >
                    Update Commander Wins
                  </Button>
                  <Button
                    onClick={toggleEditLossesEDH}
                    isActive={showEditLossesEDH}
                  >
                    Update Commander Losses
                  </Button>
                  <Button
                    onClick={toggleUploadAvatarEDH}
                    isActive={showUploadAvatarEDH}
                  >
                    Upload Commander Avatar
                  </Button>
                  <Button onClick={toggleDeleteEDH} isActive={showDeleteEDH}>
                    Delete Commander
                  </Button>
                </div>
              </div>

              {showCreateNewUser && (
                <Suspense>
                  <NewUser />
                </Suspense>
              )}
              {showRegistrationFormEDH && (
                <Suspense fallback={<p>Loading...</p>}>
                  <RegistrationForm
                    parseFunction='createEdh'
                    parseClass='deckName'
                  />
                </Suspense>
              )}
              {showRegistrationFormEDHPlayer && (
                <Suspense fallback={<p>Loading...</p>}>
                  <RegistrationForm
                    parseFunction='createEdhPlayer'
                    parseClass='edhPlayerName'
                  />
                </Suspense>
              )}
              {showEditWinsEDH && (
                <Suspense fallback={<p>Loading...</p>}>
                  <UpdateScore
                    updateFunction='edhGameWonAddRemove'
                    className='Edh'
                    propName='deckName'
                    objName='edhId'
                  />
                </Suspense>
              )}
              {showEditLossesEDH && (
                <Suspense fallback={<p>Loading...</p>}>
                  <UpdateScore
                    updateFunction='edhGameLostAddRemove'
                    className='Edh'
                    propName='deckName'
                    objName='edhId'
                  />
                </Suspense>
              )}
              {showEditWinsEDHPlayer && (
                <Suspense fallback={<p>Loading...</p>}>
                  <UpdateScore
                    updateFunction='edhPlayerGameWonAddRemove'
                    className='EdhPlayer'
                    propName='edhPlayerName'
                    objName='edhPlayerId'
                  />
                </Suspense>
              )}
              {showEditLossesEDHPlayer && (
                <Suspense fallback={<p>Loading...</p>}>
                  <UpdateScore
                    updateFunction='edhPlayerGameLostAddRemove'
                    className='EdhPlayer'
                    propName='edhPlayerName'
                    objName='edhPlayerId'
                  />
                </Suspense>
              )}
              {showUploadAvatarEDH && (
                <Suspense fallback={<p>Loading...</p>}>
                  <UploadAvatar
                    uploadFunction='uploadEdhAvatar'
                    className='Edh'
                    propName='deckName'
                    objName='edhId'
                  />
                </Suspense>
              )}
              {showUploadAvatarEDHPlayer && (
                <Suspense fallback={<p>Loading...</p>}>
                  <UploadAvatar
                    uploadFunction='uploadEdhPlayerAvatar'
                    className='EdhPlayer'
                    propName='edhPlayerName'
                    objName='edhPlayerId'
                  />
                </Suspense>
              )}
              {showDeleteEDH && (
                <Suspense fallback={<p>Loading...</p>}>
                  <Deletion
                    deleteFunction='deleteEdh'
                    className='Edh'
                    propName='deckName'
                    objName='deckId'
                  />
                </Suspense>
              )}
              {showDeleteEDHPlayer && (
                <Suspense fallback={<p>Loading...</p>}>
                  <Deletion
                    deleteFunction='deleteEdhPlayer'
                    className='EdhPlayer'
                    propName='edhPlayerName'
                    objName='edhPlayerId'
                  />
                </Suspense>
              )}
              {showCreateEdhPlayerMatch && (
                <Suspense fallback={<p>Loading...</p>}>
                  <CreateMatch
                    updateFunction='createEdhPlayerMatch'
                    className='EdhPlayer'
                    propName='edhPlayerName'
                    objName='edhPlayerId'
                  />
                </Suspense>
              )}
              {showCreateEdhMatch && (
                <Suspense fallback={<p>Loading...</p>}>
                  <CreateMatch
                    updateFunction='createEdhMatch'
                    className='Edh'
                    propName='deckName'
                    objName='edhId'
                  />
                </Suspense>
              )}
            </div>
          ) : (
            <div>
              <Button
                onClick={openMenu}
                className={`py-1 px-3 w-32 rounded-xl ${
                  showMenu ? 'text-black bg-white' : 'text-white bg-white/10'
                }`}
              >
                Show Options
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
