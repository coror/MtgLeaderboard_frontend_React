import LeaderboardSlot from '../../molecules/Leaderboard/LeaderboardSlot';
import { Player } from '../../../models/player';

type RegularLeaderboardProps = {
  players: Player[];
  onPlayerClick: (player: Player) => void;
};

export default function RegularLeaderboard({
  players,
  onPlayerClick,
}: RegularLeaderboardProps) {
  return (
    <ul className='list-none p-0 my-1 mb-4 w-full  '>
      {players.map((player) => (
        <li key={player.nameField}>
          <LeaderboardSlot {...player} onPlayerClick={onPlayerClick} />
        </li>
      ))}
    </ul>
  );
}
