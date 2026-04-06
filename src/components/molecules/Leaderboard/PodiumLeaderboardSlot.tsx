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

const auraClass: Record<number, string> = {
  1: 'podium-aura-gold',
  2: 'podium-aura-silver',
  3: 'podium-aura-bronze',
};

const PodiumLeaderboardSlot: React.FC<LeaderboardSlotProps> = ({
  nameField,
  avatar,
  podiumRank,
  onPlayerClick,
  rank,
  gamesLost,
  gamesPlayed,
  gamesWon,
  winRate,
  decklist,
  objectId,
}) => {
  const { src, height, padding } = podiumData[podiumRank] || {};
  const playerData = { nameField, avatar, rank, gamesLost, gamesPlayed, gamesWon, winRate, decklist, objectId };
  const isFirst = podiumRank === 1;

  return (
    <>
      <div
        className={`flex flex-col items-center justify-end w-28 lg:w-36 h-[20.5rem] lg:h-[25rem] overflow-visible ${padding}`}
      >
        {/* Avatar + Name */}
        <div className='flex flex-col items-center gap-3 mb-4 overflow-visible'>
          <div
            className={`fire-ring-container cursor-pointer hover:scale-105 active:translate-y-[3px] ${auraClass[podiumRank]} ${isFirst ? 'legendary-ring' : ''}`}
            onClick={() => onPlayerClick(playerData)}
          >
            <svg
              viewBox='0 0 100 100'
              className='fire-ring-svg'
            >
              <defs>
                <pattern
                  id={`firePatternCirclePodium-${podiumRank}`}
                  x='0'
                  y='0'
                  width='100'
                  height='100'
                  patternUnits='userSpaceOnUse'
                >
                  <image
                    href='/fire-noise.png'
                    x='0'
                    y='0'
                    width='100'
                    height='100'
                  />
                </pattern>
              </defs>
              <circle
                cx='50'
                cy='50'
                r='42'
                fill='none'
                stroke={`url(#firePatternCirclePodium-${podiumRank})`}
                strokeWidth='2'
              />
            </svg>
            <img
              src={avatar}
              alt={`Avatar of ${nameField}`}
              className='object-cover object-top'
            />
          </div>
          <h1
            className='h-[38px] lg:h-12 text-center text-sm lg:text-lg flex items-center justify-center text-wrap text-ellipsis overflow-hidden name-shimmer cursor-pointer hover:scale-105 transition-transform'
            onClick={() => onPlayerClick(playerData)}
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
