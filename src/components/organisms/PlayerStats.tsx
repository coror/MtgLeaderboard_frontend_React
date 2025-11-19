import { FC } from 'react';
import Button from '../atoms/Button';
import placeholderImage from '/assets/placeholderAvatar.png';

interface PlayerMatchup {
  opponentId: string;
  opponentName: string;
  opponentAvatar: string;
  wins: number;
  losses: number;
  gamesPlayed: number;
  winRate: string;
}

interface PlayerStatsProps {
  playerName: string;
  playerAvatar: string;
  matchups: PlayerMatchup[] | null;
  isLoading: boolean;
  error: string | null;
  onBack: () => void;
}

const PlayerStats: FC<PlayerStatsProps> = ({
  playerName,
  playerAvatar,
  matchups,
  isLoading,
  error,
  onBack,
}) => {
  if (isLoading) {
    return (
      <div className='flex flex-col items-center justify-center space-y-4 py-8'>
        <p className='text-white/70'>Loading stats...</p>
        <div className='loading-spinner'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='space-y-4'>
        <p className='text-red-500 text-center'>{error}</p>
        <Button onClick={onBack} className='w-full'>
          Back
        </Button>
      </div>
    );
  }

  if (!matchups || matchups.length === 0) {
    return (
      <div className='space-y-4'>
        <p className='text-white/70 text-center'>
          No match history found for {playerName}
        </p>
        <Button onClick={onBack} className='w-full'>
          Back
        </Button>
      </div>
    );
  }

  // Sort matchups by win rate in descending order
  const sortedMatchups = matchups
    ? [...matchups].sort(
        (a, b) => parseFloat(b.winRate) - parseFloat(a.winRate)
      )
    : [];

  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-3'>
        <div
          className='fire-ring-container small'
          style={{ width: '48px', height: '48px' }}
        >
          <img
            src={playerAvatar || placeholderImage}
            alt={`Avatar of ${playerName}`}
            className='object-cover object-top'
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              position: 'relative',
              zIndex: 10,
              objectFit: 'cover',
              objectPosition: 'top',
              boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
            }}
          />
        </div>
        <h2 className='text-xl text-white font-semibold'>VS</h2>
      </div>

      <hr className='border-white/10' />

      <div className='space-y-3 max-h-96 overflow-y-auto'>
        {sortedMatchups.map((matchup) => (
          <div
            key={matchup.opponentId}
            className='bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10'
          >
            <div className='flex justify-between items-start mb-2'>
              <div
                className='fire-ring-container small'
                style={{ width: '40px', height: '40px' }}
              >
                <img
                  src={matchup.opponentAvatar || placeholderImage}
                  alt={`Avatar of ${matchup.opponentName}`}
                  className='object-cover object-top'
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    position: 'relative',
                    zIndex: 10,
                    objectFit: 'cover',
                    objectPosition: 'top',
                    boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
                  }}
                />
              </div>
              <span
                className={`text-sm font-semibold ${
                  parseFloat(matchup.winRate) >= 50
                    ? 'text-[#3C6127]'
                    : 'text-[#960202]'
                }`}
              >
                {matchup.winRate}% Win Rate
              </span>
            </div>

            <div className='grid grid-cols-3 gap-2 text-center text-sm'>
              <div className='bg-white/5 rounded p-2'>
                <p className='text-white/50 text-xs'>Wins</p>
                <p className='text-[#3C6127] font-bold text-lg'>
                  {matchup.wins}
                </p>
              </div>
              <div className='bg-white/5 rounded p-2'>
                <p className='text-white/50 text-xs'>Losses</p>
                <p className='text-[#960202] font-bold text-lg'>
                  {matchup.losses}
                </p>
              </div>
              <div className='bg-white/5 rounded p-2'>
                <p className='text-white/50 text-xs'>Games</p>
                <p className='text-white font-bold text-lg'>
                  {matchup.gamesPlayed}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button onClick={onBack} className='w-full'>
        Back
      </Button>
    </div>
  );
};

export default PlayerStats;
