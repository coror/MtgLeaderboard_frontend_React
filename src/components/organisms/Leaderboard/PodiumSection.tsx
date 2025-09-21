import { Player } from '../../../models/player';
import PodiumLeaderboardSlot from '../../molecules/Leaderboard/PodiumLeaderboardSlot';

type PodiumSectionProps = {
  players: Player[];
  onPlayerClick: (player: Player) => void;
};

export default function PodiumSection({
  players,
  onPlayerClick,
}: PodiumSectionProps) {
  return (
    <div className='flex flex-row mt-24 mb-10 gap-2'>
      {players[1] && (
        <PodiumLeaderboardSlot
          {...players[1]}
          podiumRank={2}
          onPlayerClick={onPlayerClick}
        />
      )}
      {players[0] && (
        <PodiumLeaderboardSlot
          {...players[0]}
          podiumRank={1}
          onPlayerClick={onPlayerClick}
        />
      )}
      {players[2] && (
        <PodiumLeaderboardSlot
          {...players[2]}
          podiumRank={3}
          onPlayerClick={onPlayerClick}
        />
      )}
    </div>
  );
}
