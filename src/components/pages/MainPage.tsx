import { useState } from 'react';
import LeaderboardMenu from '../molecules/Leaderboard/LeaderboardMenu';
import Leaderboard from '../organisms/Leaderboard/Leaderboard';
import AdminOptions from '../organisms/AdminOptions';
import Button from '../atoms/Button';
import Footer from '../layout/Footer';
import { useAuth } from '../../store/auth-context';
import { useLeaderboard } from '../../store/leaderboard-context';
import MenuButton from '../molecules/MenuButton';
import BackdropModal from '../molecules/BackdropModal';
import PageTemplate from '../templates/PageTemplate';

export default function MainPage() {
  const { handleLogout, userRole } = useAuth();
  const { edhLeaderboard } = useLeaderboard();
  const [menuOpen, setMenuOpen] = useState(false);
  const [playerModalOpen, setPlayerModalOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <PageTemplate>
      {!playerModalOpen && (
        <MenuButton toggleMenu={toggleMenu} menuOpen={menuOpen} />
      )}

      <BackdropModal menuOpen={menuOpen} closeMenu={closeMenu}>
        {userRole === 'admin' && <AdminOptions />}
        <Button onClick={handleLogout}>Logout</Button>
      </BackdropModal>

      <main className='flex flex-col items-center pt-16 z-10 overflow-visible'>
        <LeaderboardMenu />
        {edhLeaderboard ? (
          <Leaderboard
            classDB='Edh'
            nameField='deckName'
            onModalChange={setPlayerModalOpen}
          />
        ) : (
          <Leaderboard
            classDB='EdhPlayer'
            nameField='edhPlayerName'
            onModalChange={setPlayerModalOpen}
          />
        )}
      </main>

      <Footer />
    </PageTemplate>
  );
}
