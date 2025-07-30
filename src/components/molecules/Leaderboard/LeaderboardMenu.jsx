import { useLeaderboard } from '../../../store/leaderboard-context';

export default function LeaderboardMenu() {
  const {
    edhLeaderboard,
    edhPlayerLeaderboard,
    handleEdhLeaderboard,
    handleEdhPlayerLeaderboard,
  } = useLeaderboard();

  return (
    <div className='relative w-[17rem] h-12 flex items-center justify-between px-1 py-1 rounded-full bg-gradient-to-br from-zinc-900/60 to-black/70 backdrop-blur-xl border border-white/10 shadow-[inset_0_2px_4px_rgba(255,255,255,0.05)] overflow-hidden'>
      {/* Fiery blob slider */}
      <div
        className={`absolute top-1 left-1 h-10 w-[8rem] rounded-full transition-all duration-700 ease-out
          bg-gradient-to-br from-amber-500/30 via-orange-600/30 to-red-500/30
          shadow-[0_0_20px_4px_rgba(255,115,0,0.15)]
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
            ? 'text-white drop-shadow-[0_0_6px_rgba(255,160,60,0.5)]'
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
            ? 'text-white drop-shadow-[0_0_6px_rgba(255,160,60,0.5)]'
            : 'text-white/50 hover:text-white/80'
        }`}
      >
        Commanders
      </button>
    </div>
  );
}
