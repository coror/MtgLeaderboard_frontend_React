import PodiumLeaderboardSlot from '../../molecules/Leaderboard/PodiumLeaderboardSlot';
import { PodiumSectionProps } from '../../../models/leaderboard';

export default function PodiumSection({
  players,
  onPlayerClick,
}: PodiumSectionProps) {
  return (
    <div className='flex flex-row mt-24 mb-10 gap-2 overflow-visible podium-section-animate'>
      {players[1] && (
        <div className='podium-animate' style={{ animationDelay: '0.2s' }}>
          <PodiumLeaderboardSlot
            {...players[1]}
            podiumRank={2}
            onPlayerClick={onPlayerClick}
          />
        </div>
      )}
      {players[0] && (
        <div className='podium-animate' style={{ animationDelay: '0s' }}>
          <PodiumLeaderboardSlot
            {...players[0]}
            podiumRank={1}
            onPlayerClick={onPlayerClick}
          />
        </div>
      )}
      {players[2] && (
        <div className='podium-animate' style={{ animationDelay: '0.4s' }}>
          <PodiumLeaderboardSlot
            {...players[2]}
            podiumRank={3}
            onPlayerClick={onPlayerClick}
          />
        </div>
      )}
    </div>
  );
}
