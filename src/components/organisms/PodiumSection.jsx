import PodiumLeaderboardSlot from '../molecules/PodiumLeaderboardSlot';

export default function PodiumSection({ players, onPlayerClick }) {
  return (
    <div className='flex flex-row mt-24 mb-10 gap-2'>
      <PodiumLeaderboardSlot
        {...players[1]}
        podiumRank={2}
        onPlayerClick={onPlayerClick}
      />
      <PodiumLeaderboardSlot
        {...players[0]}
        podiumRank={1}
        onPlayerClick={onPlayerClick}
      />
      <PodiumLeaderboardSlot
        {...players[2]}
        podiumRank={3}
        onPlayerClick={onPlayerClick}
      />
    </div>
  );
}
