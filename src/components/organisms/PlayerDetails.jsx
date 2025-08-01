import { useState } from 'react';
import DeckViewer from '../../DeckViewer';
import Button from '../atoms/Button';
import Stat from '../atoms/Stat';

export default function PlayerDetails({
  nameField,
  avatar,
  rank,
  gamesLost,
  gamesPlayed,
  gamesWon,
  winRate,
  decklist,
}) {
  const [showDeckList, setShowDecklist] = useState(false);

  function handleShowDecklist() {
    setShowDecklist((state) => !state);
  }

   function closeDeckViewer() {
    setShowDecklist(false);
  }

  return (
    <div >
      {showDeckList && <DeckViewer decklist={decklist} onBack={closeDeckViewer} />}
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
              <div className='absolute -bottom-1 -right-1 px-2 py-0.5  font-bold rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-red-400 text-zinc-900 shadow-lg'>
                #{rank}
              </div>
            </div>
            <div className='flex flex-col w-32'>
              <h1 className='text-xl font-semibold text-center tracking-tight drop-shadow-sm'>
                {nameField}
              </h1>
            </div>
          </div>

          <hr className='border-white/10' />

          {/* Stats */}
          <div className='grid grid-cols-2 gap-6 text-center'>
            <Button onClick={handleShowDecklist}>Decklist</Button>

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
}
