import podium1 from '/assets/podium1.png';
import podium2 from '/assets/podium2.png';
import podium3 from '/assets/podium3.png';

const getPodiumIcon = (rank) => {
  switch (rank) {
    case 1:
      return (
        <img
          src='./assets/1.png'
          alt='goldMedal'
          className='w-10 h-10 absolute translate-x-14 -translate-y-[90px]'
        ></img>
      );
    case 2:
      return (
        <img
          src='./assets/2.png'
          alt='goldMedal'
          className='w-8 h-8 absolute translate-x-14 -translate-y-[90px]'
        ></img>
      );
    case 3:
      return (
        <img
          src='./assets/3.png'
          alt='goldMedal'
          className='w-8 h-8 absolute translate-x-14 -translate-y-[90px]'
        ></img>
      );
    default:
      return null;
  }
};

const podiumData = {
  1: {
    src: podium1,
    height: 'h-40',
    padding: undefined,
    // medal: getPodiumIcon(1),
  },
  2: {
    src: podium2,
    height: 'h-28',
    padding: 'pr-3',
    // medal: getPodiumIcon(2),
  },
  3: {
    src: podium3,
    height: 'h-20',
    padding: 'pr-2',
    // medal: getPodiumIcon(3),
  },
};

export default function PodiumLeaderboardSlot({
  nameField,
  avatar,
  podiumRank,
  onPlayerClick,
  rank,
  gamesLost,
  gamesPlayed,
  gamesWon,
  winRate,
}) {
  const { src, height, padding, medal } = podiumData[podiumRank] || {};

  return (
    <div
      className={`flex flex-col items-center justify-end w-28 lg:w-36 h-[20.5rem] lg:h-[25rem] ${padding}`}
    >
      {/* Avatar + Name */}
      <div className='flex flex-col items-center gap-3 mb-4'>
        <div
          className='w-20 h-20 lg:w-20 lg:h-20 shadow-2xl shadow-stone-100 rounded-full'
          onClick={() =>
            onPlayerClick({
              nameField,
              avatar,
              rank,
              gamesLost,
              gamesPlayed,
              gamesWon,
              winRate,
            })
          }
        >
          <img
            src={avatar}
            alt={`Avatar of ${nameField}`}
            className='w-full h-full rounded-full object-cover object-top '
          />
          <div>{medal}</div>
        </div>
        <h1 className='h-[38px] lg:h-12 text-center text-sm  lg:text-lg flex items-center justify-center text-wrap text-ellipsis overflow-hidden'>
          {nameField}
        </h1>
      </div>

      {/* Podium Image */}
      <img
        src={src}
        className={`${height} object-contain`}
        alt={`Podium ${podiumRank}`}
      />
    </div>
  );
}
