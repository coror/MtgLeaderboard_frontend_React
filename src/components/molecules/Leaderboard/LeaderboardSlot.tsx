import { Player } from '../../../models/player';
import placeholderImage from '/assets/placeholderAvatar.png';

type LeaderboardSlotProps = Player & {
  onPlayerClick: (player: Player) => void;
};

const getRarityClass = (rank: number) => {
  if (rank <= 5) return 'slot-rare';
  if (rank <= 8) return 'slot-uncommon';
  return 'slot-common';
};

const LeaderboardSlot: React.FC<LeaderboardSlotProps> = ({
  onPlayerClick,
  ...player
}) => {
  const { rank, avatar, nameField, gamesWon, gamesLost, winRate } = player;

  return (
    <div className={`leaderboard-card ${getRarityClass(rank)}`}>
      <div className='flex flex-row px-5 py-3 items-center justify-start gap-4'>
        <div className='w-6 text-center rank-glow text-base lg:text-lg'>{rank}</div>

        <div
          className='gold-ring-sm cursor-pointer hover:scale-110 active:translate-y-[2px] flex-shrink-0'
          onClick={() => onPlayerClick(player)}
        >
          <img
            src={avatar || placeholderImage}
            alt={`Avatar of ${nameField}`}
          />
        </div>

        <div
          className='flex-1 text-xs lg:text-lg text-left name-shimmer cursor-pointer hover:scale-105 transition-transform'
          onClick={() => onPlayerClick(player)}
        >
          {nameField}
        </div>

        <div className='pt-box'>
          <span className='pt-box-winrate'>{winRate != null ? `${Math.round(winRate)}%` : '—'}</span>
          <span className='pt-box-record'>{gamesWon}W - {gamesLost}L</span>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardSlot;
