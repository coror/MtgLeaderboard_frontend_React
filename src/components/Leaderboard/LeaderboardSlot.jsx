import classes from './LeaderboardSlot.module.css';


export default function LeaderboardSlot({
  rank,
  avatar,
  nameField,
  winRate,
  gamesWon,
  gamesLost,
  gamesPlayed,
  podiumRank,
}) {
  const isPodium = podiumRank && podiumRank <= 3;

  // Function to select the correct hexagon icon based on the podium rank
  const getPodiumIcon = (rank) => {
    switch (rank) {
      case 1:
        return (
          <img
            src='./assets/1.png'
            alt='goldMedal'
            className='w-8 h-8 absolute translate-x-8 -translate-y-4'
          ></img>
        );
      case 2:
        return (
          <img
            src='./assets/2.png'
            alt='goldMedal'
            className='w-8 h-8 absolute translate-x-8 -translate-y-4'
          ></img>
        );
      case 3:
        return (
          <img
            src='./assets/3.png'
            alt='goldMedal'
            className='w-8 h-8 absolute translate-x-8 -translate-y-4'
          ></img>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div
        className={`${
          isPodium
            ? `flex flex-col items-center justify-start text-center h-[20rem] w-[6.8rem] lg:h-[25rem] lg:w-[10rem] ${
                podiumRank === 1
                  ? 'translate-y-[10px] lg:translate-y-[-40px]'
                  : podiumRank === 2
                  ? 'translate-y-[40px] lg:translate-y-[0px]'
                  : 'translate-y-[60px] lg:translate-y-[20px]'
              }`
            : 'flex flex-row items-center h-20 lg:h-32'
        }`}
      >
        <div
          className={`${!isPodium && 'flex flex-row items-center w-full px-4'}`}
        >
          {!isPodium && <div className='w-2 lg:w-20 text-center'>{rank}</div>}
          <div
            className={`flex items-center justify-center mx-auto ${
              !isPodium && 'mx-6'
            }`}
          >
            <img
              src={avatar}
              alt={`Avatar of ${nameField}`}
              className={`${
                isPodium
                  ? 'w-16 h-16 border lg:h-32 lg:w-32'
                  : 'w-12 h-12 lg:h-20 lg:w-20'
              } rounded-full object-cover object-top`}
            />
            {isPodium && getPodiumIcon(podiumRank)}
          </div>
          <div className=''>
            <div className={`${isPodium && ' text-[#e3bfa1]'} lg:text-xl`}>
              {nameField}
            </div>
            <div
              className={`${
                !isPodium ? 'flex flex-row gap-x-14  text-center ' : 'my-2'
              } text-xs lg:text-lg lg:items-center`}
            >
              <div className={`${!isPodium ? 'w-2 lg:w-20' : 'my-[1px]'}`}>
                W {gamesWon}
              </div>
              <div className={`${!isPodium ? 'w-2 lg:w-20' : 'my-[1px]'}`}>
                L {gamesLost}
              </div>
              <div className={`${!isPodium ? 'w-2 lg:w-20' : 'my-[1px]'}`}>
                GP {gamesPlayed}
              </div>
              <div className={`${!isPodium ? 'w-9 lg:w-20' : 'my-[1px]'}`}>
                WR {winRate}%
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='relative h-5'>
        {isPodium && (
          <div>
            {/* Top of the box */}
            <div
              className={`${
                podiumRank === 1
                  ? `h-[20px] w-full absolute top-[-120px] bg-gradient-to-b from-gray-600/50 to-gray-600/60 ${classes.trapezoid1}`
                  : podiumRank === 2
                  ? `h-[20px] bg-white absolute top-[-80px] w-full bg-gradient-to-b from-gray-800/50 to-gray-700/60 ${classes.trapezoid2}`
                  : `h-[20px] bg-white absolute top-[-60px] w-full bg-gradient-to-b from-gray-900/50 to-gray-800/60 ${classes.trapezoid3}`
              }`}
            />
            <div
              className={`${
                podiumRank === 1
                  ? 'h-[120px] text-[70px] font-bold bg-gradient-to-b from-gray-400/50 to-gray-500/20 text-gray-500'
                  : podiumRank === 2
                  ? 'h-[80px] text-[60px] font-bold bg-gradient-to-b from-gray-500/50 to-gray-500/10 text-gray-500/50'
                  : 'h-[60px] text-[45px] font-bold bg-gradient-to-b from-gray-500/30 to-gray-500/10 text-gray-500/30'
              } text-center w-full absolute bottom-0 flex items-center justify-center`}
            >
              {podiumRank}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
