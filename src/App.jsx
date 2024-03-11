import React, { Suspense, lazy, useEffect, useState } from 'react';
import Parse from 'parse';

import Footer from './components/Layout/Footer';
import Header from './components/Layout/Header';
import Button from './components/UI/Button';
import classes from './App.module.css';
import Deletion from './components/Deletion/Deletion';

// import Login from './components/UserLogin/Login';
// import Leaderboard from './components/Leaderboard/Leaderboard';
// import RegistrationForm from './components/Registration/RegistrationForm';
// import UpdateScore from './components/UpdateScore/UpdateScore';
// import UploadAvatar from './components/UploadAvatar/UploadAvatar';

const Login = lazy(() => import('./components/UserLogin/Login'));
const Leaderboard = lazy(() => import('./components/Leaderboard/Leaderboard'));
const RegistrationForm = lazy(() =>
  import('./components/Registration/RegistrationForm')
);
const UpdateScore = lazy(() => import('./components/UpdateScore/UpdateScore'));
const UploadAvatar = lazy(() =>
  import('./components/UploadAvatar/UploadAvatar')
);
const NewUser = lazy(() => import('./components/NewUser/NewUser'));

const PARSE_APPLICATION_ID = import.meta.env
  .VITE_REACT_APP_PARSE_APPLICATION_ID;
const PARSE_HOST_URL = import.meta.env.VITE_REACT_APP_PARSE_HOST_URL;
const PARSE_JAVASCRIPT_KEY = import.meta.env
  .VITE_REACT_APP_PARSE_JAVASCRIPT_KEY;
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

const initialSessionToken = localStorage.getItem('sessionToken');

const checkUserRole = async () => {
  try {
    const user = Parse.User.current();
    if (user) {
      const userRole = await user.fetch();
      return userRole.get('roleName'); // Assuming 'roleName' is the role attribute in your Parse User class
    }
    return null; // User not authenticated
  } catch (error) {
    console.error('Error fetching user role:', error);
    return null; // Handle errors gracefully
  }
};

function App() {
  const [sessionToken, setSessionToken] = useState(initialSessionToken);
  const [showLogin, setShowLogin] = useState(true);
  const [edhLeaderboard, setEdhLeaderboard] = useState(false);
  const [edhPlayerLeaderboard, setEdhPlayerLeaderboard] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [showRegistrationFormEDH, setShowRegistrationFormEDH] = useState(false);
  const [showRegistrationFormEDHPlayer, setShowRegistrationFormEDHPlayer] =
    useState(false);
  const [showEditWinsEDH, setShowEditWinsEDH] = useState(false);
  const [showEditLossesEDH, setShowEditLossesEDH] = useState(false);
  const [showEditWinsEDHPlayer, setShowEditWinsEDHPlayer] = useState(false);
  const [showEditLossesEDHPlayer, setShowEditLossesEDHPlayer] = useState(false);
  const [showUploadAvatarEDH, setShowUploadAvatarEDH] = useState(false);
  const [showUploadAvatarEDHPlayer, setShowUploadAvatarEDHPlayer] =
    useState(false);
  const [showCreateNewUser, setShowCreateNewUser] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [showDeleteEDH, setShowDeleteEDH] = useState(false);
  const [showDeleteEDHPlayer, setShowDeleteEDHPlayer] = useState(false);

  const handleLogin = async (token) => {
    setSessionToken(token);

    try {
      const user = await Parse.User.current().fetch();
      const userRole = user.get('roleName');
      setUserRole(userRole);
    } catch (error) {
      console.log('Error fetching user role', error);
    }
  };

  const handleLogout = () => {
    setSessionToken(null);
    setUserRole(null);
    setShowRegistrationFormEDH(false);
    setShowRegistrationFormEDHPlayer(false);
    setShowEditWinsEDH(false);
    setShowEditLossesEDH(false);
    setShowEditWinsEDHPlayer(false);
    setShowEditLossesEDHPlayer(false);
    setShowUploadAvatarEDH(false);
    setShowUploadAvatarEDHPlayer(false);
    setShowCreateNewUser(false);
    localStorage.removeItem('sessionToken');
  };

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const user = await Parse.User.current().fetch();
        const userRole = user.get('roleName');
        setUserRole(userRole);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserRole();
  }, []);

  const handleEdhLeaderboard = () => {
    setEdhLeaderboard(true);
    setEdhPlayerLeaderboard(false);
  };

  const handleEdhPlayerLeaderboard = () => {
    setEdhLeaderboard(false);
    setEdhPlayerLeaderboard(true);
  };

  const openMenu = async () => {
    const userRole = await checkUserRole();
    if (userRole === 'admin') {
      setShowMenu(true);
    }
  };

  const hideMenu = () => {
    setShowMenu(false);
    setShowCreateNewUser(false);
  };

  const toggleRegistrationFormEDH = async () => {
    setShowRegistrationFormEDH(!showRegistrationFormEDH);
    setShowRegistrationFormEDHPlayer(false);
    setShowEditWinsEDH(false);
    setShowEditLossesEDH(false);
    setShowEditWinsEDHPlayer(false);
    setShowEditLossesEDHPlayer(false);
    setShowUploadAvatarEDH(false);
    setShowUploadAvatarEDHPlayer(false);
    setShowCreateNewUser(false);
    setShowDeleteEDH(false);
    setShowDeleteEDHPlayer(false);
  };

  const toggleRegistrationFormEDHPlayer = async () => {
    setShowRegistrationFormEDH(false);
    setShowRegistrationFormEDHPlayer(true);
    setShowEditWinsEDH(false);
    setShowEditLossesEDH(false);
    setShowEditWinsEDHPlayer(false);
    setShowEditLossesEDHPlayer(false);
    setShowUploadAvatarEDH(false);
    setShowUploadAvatarEDHPlayer(false);
    setShowCreateNewUser(false);
    setShowDeleteEDH(false);
    setShowDeleteEDHPlayer(false);
  };

  const toggleEditWinsEDH = async () => {
    setShowRegistrationFormEDH(false);
    setShowRegistrationFormEDHPlayer(false);
    setShowEditWinsEDH(!showEditWinsEDH);
    setShowEditLossesEDH(false);
    setShowEditWinsEDHPlayer(false);
    setShowEditLossesEDHPlayer(false);
    setShowUploadAvatarEDH(false);
    setShowUploadAvatarEDHPlayer(false);
    setShowCreateNewUser(false);
    setShowDeleteEDH(false);
    setShowDeleteEDHPlayer(false);
  };

  const toggleEditLossesEDH = async () => {
    setShowRegistrationFormEDH(false);
    setShowRegistrationFormEDHPlayer(false);
    setShowEditWinsEDH(false);
    setShowEditLossesEDH(!showEditLossesEDH);
    setShowEditWinsEDHPlayer(false);
    setShowEditLossesEDHPlayer(false);
    setShowUploadAvatarEDH(false);
    setShowUploadAvatarEDHPlayer(false);
    setShowCreateNewUser(false);
    setShowDeleteEDH(false);
    setShowDeleteEDHPlayer(false);
  };

  const toggleEditWinsEDHPlayer = async () => {
    setShowRegistrationFormEDH(false);
    setShowRegistrationFormEDHPlayer(false);
    setShowEditWinsEDH(false);
    setShowEditLossesEDH(false);
    setShowEditWinsEDHPlayer(!showEditWinsEDHPlayer);
    setShowEditLossesEDHPlayer(false);
    setShowUploadAvatarEDH(false);
    setShowUploadAvatarEDHPlayer(false);
    setShowCreateNewUser(false);
    setShowDeleteEDH(false);
    setShowDeleteEDHPlayer(false);
  };

  const toggleEditLossesEDHPlayer = async () => {
    setShowRegistrationFormEDH(false);
    setShowRegistrationFormEDHPlayer(false);
    setShowEditWinsEDH(false);
    setShowEditLossesEDH(false);
    setShowEditWinsEDHPlayer(false);
    setShowEditLossesEDHPlayer(!showEditLossesEDHPlayer);
    setShowUploadAvatarEDH(false);
    setShowUploadAvatarEDHPlayer(false);
    setShowCreateNewUser(false);
    setShowDeleteEDH(false);
    setShowDeleteEDHPlayer(false);
  };

  const toggleUploadAvatarEDH = async () => {
    setShowRegistrationFormEDH(false);
    setShowRegistrationFormEDHPlayer(false);
    setShowEditWinsEDH(false);
    setShowEditLossesEDH(false);
    setShowEditWinsEDHPlayer(false);
    setShowEditLossesEDHPlayer(false);
    setShowUploadAvatarEDH(!showUploadAvatarEDH);
    setShowUploadAvatarEDHPlayer(false);
    setShowCreateNewUser(false);
    setShowDeleteEDH(false);
    setShowDeleteEDHPlayer(false);
  };

  const toggleUploadAvatarEDHPlayer = async () => {
    setShowRegistrationFormEDH(false);
    setShowRegistrationFormEDHPlayer(false);
    setShowEditWinsEDH(false);
    setShowEditLossesEDH(false);
    setShowEditWinsEDHPlayer(false);
    setShowEditLossesEDHPlayer(false);
    setShowUploadAvatarEDH(false);
    setShowUploadAvatarEDHPlayer(!showUploadAvatarEDHPlayer);
    setShowCreateNewUser(false);
    setShowDeleteEDH(false);
    setShowDeleteEDHPlayer(false);
  };

  const toggleCreateNewUser = async () => {
    setShowCreateNewUser(!showCreateNewUser);
    setShowRegistrationFormEDH(false);
    setShowRegistrationFormEDHPlayer(false);
    setShowEditWinsEDH(false);
    setShowEditLossesEDH(false);
    setShowEditWinsEDHPlayer(false);
    setShowEditLossesEDHPlayer(false);
    setShowUploadAvatarEDH(false);
    setShowUploadAvatarEDHPlayer(false);
    setShowDeleteEDH(false);
    setShowDeleteEDHPlayer(false);
  };

  const toggleDeleteEDH = async () => {
    setShowCreateNewUser(false);
    setShowRegistrationFormEDH(false);
    setShowRegistrationFormEDHPlayer(false);
    setShowEditWinsEDH(false);
    setShowEditLossesEDH(false);
    setShowEditWinsEDHPlayer(false);
    setShowEditLossesEDHPlayer(false);
    setShowUploadAvatarEDH(false);
    setShowUploadAvatarEDHPlayer(false);
    setShowDeleteEDH(!showDeleteEDH);
    setShowDeleteEDHPlayer(false);
  };

  const toggleDeleteEDHPlayer = async () => {
    setShowCreateNewUser(false);
    setShowRegistrationFormEDH(false);
    setShowRegistrationFormEDHPlayer(false);
    setShowEditWinsEDH(false);
    setShowEditLossesEDH(false);
    setShowEditWinsEDHPlayer(false);
    setShowEditLossesEDHPlayer(false);
    setShowUploadAvatarEDH(false);
    setShowUploadAvatarEDHPlayer(false);
    setShowDeleteEDH(false);
    setShowDeleteEDHPlayer(!showDeleteEDHPlayer);
  };

  if (!sessionToken) {
    return (
      <>
        <Header />
        {!sessionToken && showLogin && (
          <Suspense fallback={<p>Loading...</p>}>
            <Login onLogin={handleLogin} />
          </Suspense>
        )}
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className={classes.main}>
        {userRole === 'admin' && (
          <div className={classes.options}>
            {showMenu ? (
              <>
                <div className={classes['buttons-container']}>
                  <Button onClick={hideMenu}>Hide Options</Button>
                  <Button onClick={toggleCreateNewUser}>New User</Button>
                </div>
                <div className={classes['option-section']}>
                  <p className={classes.p}>EDH Player</p>
                  <div className={classes['buttons-container']}>
                    <Button onClick={toggleRegistrationFormEDHPlayer}>
                      Register New
                    </Button>
                    <Button onClick={toggleEditWinsEDHPlayer}>
                      Update Wins
                    </Button>
                    <Button onClick={toggleEditLossesEDHPlayer}>
                      Update Losses
                    </Button>
                    <Button onClick={toggleUploadAvatarEDHPlayer}>
                      Upload Avatar
                    </Button>
                    <Button onClick={toggleDeleteEDHPlayer}>Delete</Button>
                  </div>
                </div>
                <div className={classes['option-section']}>
                  <p className={classes.p}>EDH</p>
                  <div className={classes['buttons-container']}>
                    <Button onClick={toggleRegistrationFormEDH}>
                      Register New
                    </Button>
                    <Button onClick={toggleEditWinsEDH}>Update Wins</Button>
                    <Button onClick={toggleEditLossesEDH}>Update Losses</Button>
                    <Button onClick={toggleUploadAvatarEDH}>
                      Upload Avatar
                    </Button>
                    <Button onClick={toggleDeleteEDH}>Delete</Button>
                  </div>
                </div>

                {showCreateNewUser && (
                  <Suspense>
                    <NewUser />
                  </Suspense>
                )}
                {showRegistrationFormEDH && (
                  <Suspense fallback={<p className={classes.p}>Loading...</p>}>
                    <RegistrationForm
                      createFunction='createEdh'
                      paramName='deckName'
                    />
                  </Suspense>
                )}
                {showRegistrationFormEDHPlayer && (
                  <Suspense fallback={<p className={classes.p}>Loading...</p>}>
                    <RegistrationForm
                      createFunction='createEdhPlayer'
                      paramName='edhPlayerName'
                    />
                  </Suspense>
                )}
                {showEditWinsEDH && (
                  <Suspense fallback={<p className={classes.p}>Loading...</p>}>
                    <UpdateScore
                      updateFunction='edhGameWonAddRemove'
                      className='Edh'
                      propName='deckName'
                      objName='edhId'
                    />
                  </Suspense>
                )}
                {showEditLossesEDH && (
                  <Suspense fallback={<p className={classes.p}>Loading...</p>}>
                    <UpdateScore
                      updateFunction='edhGameLostAddRemove'
                      className='Edh'
                      propName='deckName'
                      objName='edhId'
                    />
                  </Suspense>
                )}
                {showEditWinsEDHPlayer && (
                  <Suspense fallback={<p className={classes.p}>Loading...</p>}>
                    <UpdateScore
                      updateFunction='edhPlayerGameWonAddRemove'
                      className='EdhPlayer'
                      propName='edhPlayerName'
                      objName='edhPlayerId'
                    />
                  </Suspense>
                )}
                {showEditLossesEDHPlayer && (
                  <Suspense fallback={<p className={classes.p}>Loading...</p>}>
                    <UpdateScore
                      updateFunction='edhPlayerGameLostAddRemove'
                      className='EdhPlayer'
                      propName='edhPlayerName'
                      objName='edhPlayerId'
                    />
                  </Suspense>
                )}
                {showUploadAvatarEDH && (
                  <Suspense fallback={<p className={classes.p}>Loading...</p>}>
                    <UploadAvatar
                      uploadFunction='uploadEdhAvatar'
                      className='Edh'
                      propName='deckName'
                      objName='edhId'
                    />
                  </Suspense>
                )}
                {showUploadAvatarEDHPlayer && (
                  <Suspense fallback={<p className={classes.p}>Loading...</p>}>
                    <UploadAvatar
                      uploadFunction='uploadEdhPlayerAvatar'
                      className='EdhPlayer'
                      propName='edhPlayerName'
                      objName='edhPlayerId'
                    />
                  </Suspense>
                )}
                {showDeleteEDH && (
                  <Suspense fallback={<p className={classes.p}>Loading...</p>}>
                    <Deletion
                      deleteFunction='deleteEdh'
                      className='Edh'
                      propName='deckName'
                      objName='deckId'
                    />
                  </Suspense>
                )}
                {showDeleteEDHPlayer && (
                  <Suspense fallback={<p className={classes.p}>Loading...</p>}>
                    <Deletion
                      deleteFunction='deleteEdhPlayer'
                      className='EdhPlayer'
                      propName='edhPlayerName'
                      objName='edhPlayerId'
                    />
                  </Suspense>
                )}
              </>
            ) : (
              <div className={classes['buttons-container']}>
                <Button onClick={openMenu}>Show Options</Button>
              </div>
            )}
          </div>
        )}

        <div className={classes['buttons-container']}>
          <Button onClick={handleEdhPlayerLeaderboard}>EDH Players</Button>
          <Button onClick={handleEdhLeaderboard}>EDH</Button>
        </div>
        {edhLeaderboard && (
          <>
            <h2 className={classes.p}>Commanders</h2>
            <Suspense fallback={<p className={classes.p}>Loading...</p>}>
              <Leaderboard className='Edh' nameField='deckName' />
            </Suspense>
          </>
        )}
        {edhPlayerLeaderboard && (
          <>
            <h2 className={classes.p}>Commander Players</h2>
            <Suspense fallback={<p className={classes.p}>Loading...</p>}>
              <Leaderboard className='EdhPlayer' nameField='edhPlayerName' />
            </Suspense>
          </>
        )}
        <div className={classes['buttons-container']}>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
