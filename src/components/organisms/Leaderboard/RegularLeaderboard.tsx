import LeaderboardSlot from '../../molecules/Leaderboard/LeaderboardSlot';
import { RegularLeaderboardProps } from '../../../models/leaderboard';

export default function RegularLeaderboard({
  players,
  onPlayerClick,
}: RegularLeaderboardProps) {
  return (
    <ul className='list-none p-0 my-1 mb-4 w-full'>
      {players.map((player, index) => (
        <li
          key={player.nameField}
          className='leaderboard-slot-animate slot-hover-glow'
          style={{ animationDelay: `${0.6 + index * 0.1}s` }}
        >
          <LeaderboardSlot {...player} onPlayerClick={onPlayerClick} />
        </li>
      ))}
    </ul>
  );
}
