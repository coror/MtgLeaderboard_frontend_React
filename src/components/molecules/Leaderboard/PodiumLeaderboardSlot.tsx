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
    <>
      {/* SVG Filter for wavy fire effect - only render once */}
 {podiumRank === 1 && (
  <svg style={{ width: 0, height: 0, position: 'absolute' }}>
    <filter id="wavy-fire">

     <feTurbulence
        type="fractalNoise"
        baseFrequency="0.02 0.03"
        numOctaves="3"
        seed="5"
        result="noise"
      >
        <animate
          attributeName="baseFrequency"
          dur="4s"
          repeatCount="indefinite"
          values="
            0.02 0.03;
            0.024 0.034;
            0.02 0.03
          "
          calcMode="linear"
        />
      </feTurbulence>

      <feDisplacementMap
        in="SourceGraphic"
        in2="noise"
        scale="40"
      >
        <animate
          attributeName="scale"
          dur="4s"
          repeatCount="indefinite"
          values="40;50;40"
          calcMode="linear"
        />
      </feDisplacementMap>

    </filter>
  </svg>
)}







      <div
        className={`flex flex-col items-center justify-end w-28 lg:w-36 h-[20.5rem] lg:h-[25rem] overflow-visible ${padding}`}
      >
        {/* Avatar + Name */}
        <div className='flex flex-col items-center gap-3 mb-4 overflow-visible'>
          <div
            className='fire-ring-container cursor-pointer hover:scale-105 active:translate-y-[3px]'
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
            <div className='fire-circle'></div>
            <div className={`fire-circle ${podiumRank === 2 ? 'fire-circle-2' : ''}`}></div>
            <img
              src={avatar}
              alt={`Avatar of ${nameField}`}
              className='object-cover object-top'
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
    </>
  );
};

export default PodiumLeaderboardSlot;
