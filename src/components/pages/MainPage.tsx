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
import NextMatchModal from '../molecules/NextMatchModal';
import { GiCrossedSwords } from 'react-icons/gi';

export default function MainPage() {
  const { handleLogout, userRole } = useAuth();
  const { edhLeaderboard } = useLeaderboard();
  const [menuOpen, setMenuOpen] = useState(false);
  const [playerModalOpen, setPlayerModalOpen] = useState(false);
  const [adminOptionOpen, setAdminOptionOpen] = useState(false);
  const [nextMatchOpen, setNextMatchOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <PageTemplate>
      {!playerModalOpen && (
        <>
          <MenuButton toggleMenu={toggleMenu} menuOpen={menuOpen} />
          <button
            onClick={() => !menuOpen && setNextMatchOpen(true)}
            className={`absolute top-4 left-4 z-[95] p-2 transition-all duration-300 ${
              menuOpen
                ? 'opacity-30 pointer-events-none'
                : 'hover:scale-110 active:scale-95'
            }`}
            aria-label='Next match'
          >
            <GiCrossedSwords size={28} color='#c9a959' />
          </button>
        </>
      )}

      {nextMatchOpen && (
        <NextMatchModal onClose={() => setNextMatchOpen(false)} />
      )}

      <BackdropModal menuOpen={menuOpen} closeMenu={closeMenu}>
        {userRole === 'admin' && <AdminOptions onOptionChange={setAdminOptionOpen} />}
        {!adminOptionOpen && <Button onClick={handleLogout} className='w-40 !min-h-10 !py-2 !text-sm'>Logout</Button>}
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
