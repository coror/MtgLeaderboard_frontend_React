import { useLeaderboard } from '../../../store/leaderboard-context';

const LeaderboardMenu:React.FC = () => {
  const {
    edhLeaderboard,
    edhPlayerLeaderboard,
    handleEdhLeaderboard,
    handleEdhPlayerLeaderboard,
  } = useLeaderboard();

  return (
    <div className='relative w-[17rem] h-12 flex items-center justify-between px-1 py-1 rounded-full bg-gradient-to-br from-[#1a1812]/80 to-[#0f0e0b]/90 backdrop-blur-xl border border-[rgba(201,169,89,0.15)] shadow-[inset_0_2px_4px_rgba(201,169,89,0.03)] overflow-hidden'>
      {/* Gold blob slider */}
      <div
        className={`absolute top-1 left-1 h-10 w-[8rem] rounded-full transition-all duration-700 ease-out
          bg-gradient-to-br from-[rgba(218,165,32,0.25)] via-[rgba(201,169,89,0.18)] to-[rgba(180,140,50,0.12)]
          shadow-[0_0_20px_4px_rgba(218,165,32,0.15)]
          blur-[2px]
          ${
            edhPlayerLeaderboard
              ? 'translate-x-0'
              : 'translate-x-[calc(100%+0.5rem)]'
          }`}
      />

      {/* Players */}
      <button
        onClick={handleEdhPlayerLeaderboard}
        className={`relative z-10 w-[8rem] h-10 text-sm font-semibold rounded-full transition duration-300 ease-in-out hover:scale-105 ${
          edhPlayerLeaderboard
            ? 'text-[#e8d5a3] drop-shadow-[0_0_6px_rgba(201,169,89,0.5)]'
            : 'text-white/50 hover:text-white/80'
        }`}
      >
        Players
      </button>

      {/* Commanders */}
      <button
        onClick={handleEdhLeaderboard}
        className={`relative z-10 w-[8rem] h-10 text-sm font-semibold rounded-full transition duration-300 ease-in-out hover:scale-105 ${
          edhLeaderboard
            ? 'text-[#e8d5a3] drop-shadow-[0_0_6px_rgba(201,169,89,0.5)]'
            : 'text-white/50 hover:text-white/80'
        }`}
      >
        Commanders
      </button>
    </div>
  );
}

export default LeaderboardMenu