import { useState } from 'react';
import useLeaderBoardData from '../../../hooks/useLeaderboardData';
import Spinner from '../../atoms/Spinner';
import PodiumSection from './PodiumSection';
import RegularLeaderboard from './RegularLeaderboard';
import BackdropModal from '../../molecules/BackdropModal';
import PlayerDetails from '../PlayerDetails';

const Leaderboard = ({ classDB, nameField }) => {
  const { isLoading, error, data } = useLeaderBoardData(classDB, nameField);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const openDetails = (player) => setSelectedPlayer(player);
  const closeDetails = () => setSelectedPlayer(null);

console.log('selectedPlayer object:', selectedPlayer);


  if (isLoading)
    return (
      <div className='flex items-center justify-center h-screen'>
        <Spinner />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  const topThree = data.slice(0, 3);
  const others = data.slice(3);

  return (
    <div className='flex flex-col w-screen md:max-w-[45rem] items-center'>
      <PodiumSection players={topThree} onPlayerClick={openDetails} />
      <RegularLeaderboard players={others} onPlayerClick={openDetails} />

      <BackdropModal menuOpen={!!selectedPlayer} closeMenu={closeDetails}>
        {selectedPlayer && (
          <PlayerDetails
            nameField={selectedPlayer.nameField}
            avatar={selectedPlayer.avatar}
            rank={selectedPlayer.rank}
            gamesLost={selectedPlayer.gamesLost}
            gamesPlayed={selectedPlayer.gamesPlayed}
            gamesWon={selectedPlayer.gamesWon}
            winRate={selectedPlayer.winRate}
            decklist={selectedPlayer.decklist}
          />
        )}
      </BackdropModal>
    </div>
  );
};

export default Leaderboard;
