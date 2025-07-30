import LeaderboardSlot from '../../molecules/Leaderboard/LeaderboardSlot';

export default function RegularLeaderboard({ players, onPlayerClick }) {
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
