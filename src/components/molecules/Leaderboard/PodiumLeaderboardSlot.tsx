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
}) => {
  const { src, height, padding } = podiumData[podiumRank] || {};

  return (
    <div
      className={`flex flex-col items-center justify-end w-28 lg:w-36 h-[20.5rem] lg:h-[25rem] ${padding}`}
    >
      {/* Avatar + Name */}
      <div className='flex flex-col items-center gap-3 mb-4'>
        <div
          className={`
    w-20 h-20 lg:w-20 lg:h-20
    rounded-full relative cursor-pointer
    p-[1px]
    bg-gradient-to-br from-amber-400 via-orange-500 to-red-500
    shadow-[0_0_15px_rgba(255,180,50,0.7)]
    hover:scale-105
    active:translate-y-[3px] active:shadow-[0_0_8px_rgba(255,180,50,0.8)]
    animate-pulse-slow
  `}
          onClick={() =>
            onPlayerClick({
              nameField,
              avatar,
              rank,
              gamesLost,
              gamesPlayed,
              gamesWon,
              winRate,
              decklist,
            })
          }
        >
          <img
            src={avatar}
            alt={`Avatar of ${nameField}`}
            className='w-full h-full rounded-full object-cover object-top  '
          />
        </div>
        <h1 className='h-[38px] lg:h-12 text-center text-sm  lg:text-lg flex items-center justify-center text-wrap text-ellipsis overflow-hidden'>
          {nameField}
        </h1>
      </div>

      {/* Podium Image */}
      <img
        src={src}
        className={`${height} object-fit `}
        alt={`Podium ${podiumRank}`}
      />
    </div>
  );
};

export default PodiumLeaderboardSlot;
