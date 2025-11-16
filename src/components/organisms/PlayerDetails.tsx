import { useState, FC } from 'react';
import DeckViewer from './DeckViewer';
import Button from '../atoms/Button';
import Stat from '../atoms/Stat';

interface PlayerDetailsProps {
  nameField: string;
  avatar?: string;
  rank: number;
  gamesLost: number;
  gamesPlayed: number;
  gamesWon: number;
  winRate: number;
  decklist?: string;
  classDB: string;
}

const PlayerDetails: FC<PlayerDetailsProps> = ({
  nameField,
  avatar,
  rank,
  gamesLost,
  gamesPlayed,
  gamesWon,
  winRate,
  decklist,
  classDB,
}) => {
  const [showDeckList, setShowDecklist] = useState<boolean>(false);

  function handleShowDecklist(): void {
    setShowDecklist((state) => !state);
  }

  function closeDeckViewer(): void {
    setShowDecklist(false);
  }

  return (
    <div>
      {showDeckList && classDB === 'Edh' && decklist && (
        <DeckViewer decklist={decklist} onBack={closeDeckViewer} />
      )}
      {showDeckList && !decklist && <p>No decklist for this deck</p>}
      {!showDeckList && (
        <div className='space-y-6'>
          {/* Avatar + Rank */}
          <div className='flex items-center gap-2'>
            <div className='relative w-28 h-28'>
              <img
                src={avatar}
                alt={`Avatar of ${nameField}`}
                className='w-full h-full rounded-full object-cover object-top'
              />
              {/* Rank Badge - Dark Fantasy Shield with Fire Border */}
              <div
                className='absolute bottom-12 -right-16 fire-ring-container small'
                style={{ width: '45px', height: '54px' }}
              >
                <div className='relative w-full h-full flex items-center justify-center' style={{ zIndex: 10 }}>
                  <svg
                    viewBox='0 0 100 120'
                    className='absolute w-full h-full fire-shield-svg'
                    style={{ filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.8))', zIndex: 10 }}
                  >
                    <defs>
                      <linearGradient id='darkShield' x1='0%' y1='0%' x2='0%' y2='100%'>
                        <stop offset='0%' stopColor='#2d2d2d' />
                        <stop offset='50%' stopColor='#1a1a1a' />
                        <stop offset='100%' stopColor='#0a0a0a' />
                      </linearGradient>
                      <pattern id='firePattern' x='0' y='0' width='100' height='100' patternUnits='userSpaceOnUse'>
                        <image href='/fire-noise.png' x='0' y='0' width='100' height='100' />
                      </pattern>
                    </defs>
                    {/* Shield border with fire animation */}
                    <path
                      d='M50 5 L15 15 L15 50 Q15 85 50 115 Q85 85 85 50 L85 15 Z'
                      fill='none'
                      stroke='url(#firePattern)'
                      strokeWidth='3'
                      className='fire-shield-border'
                    />
                    {/* Shield shape */}
                    <path
                      d='M50 5 L15 15 L15 50 Q15 85 50 115 Q85 85 85 50 L85 15 Z'
                      fill='url(#darkShield)'
                    />
                  </svg>
                  <span
                    className='relative font-bold text-lg'
                    style={{
                      color: '#c0c0c0',
                      textShadow: '0 0 6px rgba(139, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.9)',
                      fontFamily: 'Georgia, serif',
                      letterSpacing: '0.5px',
                      zIndex: 20
                    }}
                  >
                    {rank}
                  </span>
                </div>
              </div>
            </div>
            <div className='flex flex-col w-32'>
              <h1 className='text-xl text-white font-semibold text-center tracking-tight drop-shadow-sm'>
                {nameField}
              </h1>
            </div>
          </div>

          <hr className='border-white/10' />

          {/* Decklist Button */}
          {classDB === 'Edh' && (
            <div className='flex justify-center'>
              <Button onClick={handleShowDecklist} className='w-full max-w-xs'>
                View Decklist
              </Button>
            </div>
          )}

          {/* Stats */}
          <div className='grid grid-cols-2 gap-4 text-center'>
            <Stat
              label='Games Played'
              value={gamesPlayed}
              accent='text-[#ffffff]'
            />
            <Stat label='Wins' value={gamesWon} accent='text-[#3C6127]' />
            <Stat label='Losses' value={gamesLost} accent='text-[#960202]' />
            <Stat
              label='Win Rate'
              value={`${winRate}%`}
              accent='text-[#967B02]'
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerDetails;
