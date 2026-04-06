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
  rank,
  avatar,
  nameField,
  onPlayerClick,
  gamesLost,
  gamesPlayed,
  gamesWon,
  winRate,
  decklist,
  objectId,
}) => {
  const playerData = { nameField, avatar, rank, gamesLost, gamesPlayed, gamesWon, winRate, decklist, objectId };

  return (
    <div className={`leaderboard-card ${getRarityClass(rank)}`}>
      <div className='flex flex-row px-5 py-3 items-center justify-start gap-4'>
        <div className='w-6 text-center rank-glow text-base lg:text-lg'>{rank}</div>

        <div
          className='fire-ring-container small cursor-pointer hover:scale-110 active:translate-y-[2px] flex-shrink-0'
          style={{ width: '48px', height: '48px' }}
          onClick={() => onPlayerClick(playerData)}
        >
          <img
            src={avatar || placeholderImage}
            alt={`Avatar of ${nameField}`}
            className='object-cover object-top'
            style={{ width: '46px', height: '46px', borderRadius: '50%', position: 'relative', zIndex: 10, objectFit: 'cover', objectPosition: 'top', boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)' }}
          />
        </div>

        <div
          className='flex-1 text-xs lg:text-lg text-left name-shimmer cursor-pointer hover:scale-105 transition-transform'
          onClick={() => onPlayerClick(playerData)}
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
