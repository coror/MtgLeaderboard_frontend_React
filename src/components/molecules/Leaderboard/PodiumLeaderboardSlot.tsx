import { Player } from '../../../models/player';
import podium1 from '/assets/podium1.png';
import podium2 from '/assets/podium2.png';
import podium3 from '/assets/podium3.png';

const podiumData = {
  1: {
    src: podium1,
    height: 'h-40 w-24',
    padding: '',
  },
  2: {
    src: podium2,
    height: 'h-28 w-[70px]',
    padding: 'pt-10',
  },
  3: {
    src: podium3,
    height: 'h-20 w-[70px]',
    padding: '',
  },
};

type LeaderboardSlotProps = Player & {
  onPlayerClick: (player: Player) => void;
  podiumRank: 1 | 2 | 3;
};

const PodiumLeaderboardSlot: React.FC<LeaderboardSlotProps> = ({
  podiumRank,
  onPlayerClick,
  ...player
}) => {
  const { nameField, avatar, gamesWon, gamesLost, winRate } = player;
  const { src, height, padding } = podiumData[podiumRank] || {};

  return (
    <>
      <div
        className={`flex flex-col items-center justify-end w-28 lg:w-36 h-[20.5rem] lg:h-[25rem] overflow-visible ${padding}`}
      >
        {/* Avatar + Name */}
        <div className='flex flex-col items-center gap-3 mb-4 overflow-visible'>
          <div
            className='gold-ring-container cursor-pointer hover:scale-105 active:translate-y-[3px]'
            onClick={() => onPlayerClick(player)}
          >
            <div className='gold-ring-border' />
            <img
              src={avatar}
              alt={`Avatar of ${nameField}`}
              className='gold-ring-avatar'
            />
          </div>
          <h1
            className='h-[38px] lg:h-12 text-center text-sm lg:text-lg flex items-center justify-center name-shimmer cursor-pointer hover:scale-105 transition-transform leading-tight px-1'
            style={nameField.length > 22 ? { fontSize: '0.65rem' } : undefined}
            onClick={() => onPlayerClick(player)}
          >
            {nameField}
          </h1>
        </div>

        {/* Stats Plaque */}
        <div className='podium-plaque'>
          <span className='podium-plaque-winrate'>
            {winRate != null ? `${Math.round(winRate)}%` : '—'}
          </span>
          <span className='podium-plaque-record'>
            {gamesWon}W - {gamesLost}L
          </span>
        </div>

        {/* Podium Image */}
        <img
          src={src}
          className={`${height} object-fit`}
          alt={`Podium ${podiumRank}`}
        />
      </div>
    </>
  );
};

export default PodiumLeaderboardSlot;
