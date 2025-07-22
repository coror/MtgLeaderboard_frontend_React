import { useState } from 'react';

import useAuthState from '../parse/useAuthState';
import LeaderboardMenu from './LeaderboardMenu';
import Leaderboard from './Leaderboard/Leaderboard';
import AdminOptions from './AdminOptions';
import Button from './UI/Button';
import Footer from './Layout/Footer';

export default function MainPage() {
  const { userRole, handleLogout } = useAuthState();
  const [edhLeaderboard, setEdhLeaderboard] = useState(false);
  const [edhPlayerLeaderboard, setEdhPlayerLeaderboard] = useState(true);

  const handleEdhLeaderboard = () => {
    setEdhLeaderboard(true);
    setEdhPlayerLeaderboard(false);
  };

  const handleEdhPlayerLeaderboard = () => {
    setEdhLeaderboard(false);
    setEdhPlayerLeaderboard(true);
  };

  return (
    <div
      style={{
        background:
          'linear-gradient(0deg, rgba(61,64,78,1) 80%, rgba(148,134,129,1) 100%)',
        minHeight: '100vh',
        color: 'white',
      }}
      className='flex flex-col items-center min-h-screen'
    >
      <h1 className='py-10 text-lg lg:text-3xl'>Leaderboard</h1>
      <main className='flex-grow flex flex-col items-center'>
        <LeaderboardMenu
          handleEdhPlayerLeaderboard={handleEdhPlayerLeaderboard}
          edhPlayerLeaderboard={edhPlayerLeaderboard}
          handleEdhLeaderboard={handleEdhLeaderboard}
          edhLeaderboard={edhLeaderboard}
        />
        {edhLeaderboard ? (
          <Leaderboard className='Edh' nameField='deckName' />
        ) : (
          <Leaderboard className='EdhPlayer' nameField='edhPlayerName' />
        )}

        <AdminOptions userRole={userRole} />
        <Button onClick={handleLogout}>Logout</Button>
      </main>
      <Footer />
    </div>
  );
}
