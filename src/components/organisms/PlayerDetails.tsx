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
  classDB
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
              <div className='absolute -bottom-1 -right-1 px-2 py-0.5 font-bold rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-red-400 text-zinc-900 shadow-lg'>
                #{rank}
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
              accent='text-amber-300'
            />
            <Stat label='Wins' value={gamesWon} accent='text-lime-300' />
            <Stat label='Losses' value={gamesLost} accent='text-rose-300' />
            <Stat
              label='Win Rate'
              value={`${winRate}%`}
              accent='text-sky-300'
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerDetails;