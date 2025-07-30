import { useState } from 'react';
import LeaderboardMenu from '../molecules/LeaderboardMenu';
import Leaderboard from '../organisms/Leaderboard';
import AdminOptions from '../organisms/AdminOptions';
import Button from '../atoms/Button';
import Footer from '../layout/Footer';
import { useAuth } from '../../store/auth-context';
import { useLeaderboard } from '../../store/leaderboard-context';
import MenuButton from '../molecules/MenuButton';
import BackdropModal from '../molecules/BackdropModal';
import useViewportHeight from '../../hooks/useViewportHeight';

export default function MainPage() {
  useViewportHeight(); // Apply mobile-friendly vh fix. because of the url search bar

  const { handleLogout, userRole } = useAuth();
  const { edhLeaderboard } = useLeaderboard();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div
      className='relative flex flex-col items-center text-white overflow-x-hidden'
      style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
    >
      {/* Fixed full-screen background image */}
      <img
        src='/assets/background13.jpg'
        alt='Background'
        className='fixed top-0 left-0 w-full h-full object-cover z-[-1]'
      />

      <MenuButton toggleMenu={toggleMenu} menuOpen={menuOpen} />

      <BackdropModal menuOpen={menuOpen} closeMenu={closeMenu}>
        {userRole === 'admin' && <AdminOptions />}
        <Button onClick={handleLogout}>Logout</Button>
      </BackdropModal>

      <main className='flex flex-col items-center pt-16 z-10'>
        <LeaderboardMenu />
        {edhLeaderboard ? (
          <Leaderboard classDB='Edh' nameField='deckName' />
        ) : (
          <Leaderboard classDB='EdhPlayer' nameField='edhPlayerName' />
        )}
      </main>

      <Footer />
    </div>
  );
}
