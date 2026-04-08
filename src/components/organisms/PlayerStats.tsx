import { FC, useState } from 'react';
// @ts-expect-error it works, but i dont know why it shows no module found
import Parse from 'parse/dist/parse.min.js';
import { useQueryClient } from '@tanstack/react-query';
import Button from '../atoms/Button';
import placeholderImage from '/assets/placeholderAvatar.png';
import { isMoxfieldUrl, parseMoxfieldResponse } from '../../helpers/moxfield';

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
  deckUpdatedAt?: string;
  deckChanges?: string;
  gamesWon?: number;
  gamesLost?: number;
  winsAtLastUpdate?: number;
  lossesAtLastUpdate?: number;
  moxfieldUrl?: string;
  playerId?: string;
}

const PlayerStats: FC<PlayerStatsProps> = ({
  playerName,
  playerAvatar,
  matchups,
  isLoading,
  error,
  onBack,
  deckUpdatedAt,
  deckChanges,
  gamesWon,
  gamesLost,
  winsAtLastUpdate,
  lossesAtLastUpdate,
  moxfieldUrl,
  playerId,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [localDeckChanges, setLocalDeckChanges] = useState(deckChanges);
  const [localDeckUpdatedAt, setLocalDeckUpdatedAt] = useState(deckUpdatedAt);
  const [localWinsAtUpdate, setLocalWinsAtUpdate] = useState(winsAtLastUpdate);
  const [localLossesAtUpdate, setLocalLossesAtUpdate] = useState(lossesAtLastUpdate);
  const queryClient = useQueryClient();

  const handleRefreshDeck = async () => {
    if (!moxfieldUrl || !playerId) return;
    setRefreshing(true);

    try {
      const match = moxfieldUrl.trim().match(/moxfield\.com\/decks\/([A-Za-z0-9_-]+)/);
      if (!match) throw new Error('Invalid Moxfield URL');
      const deckId = match[1];

      const moxResponse = await fetch(
        `https://moxfield-proxy.coralic-erin.workers.dev/?deckId=${deckId}`
      );
      if (!moxResponse.ok) throw new Error('Failed to fetch from Moxfield');
      const moxData = await moxResponse.json();

      const Edh = Parse.Object.extend('Edh');
      const query = new Parse.Query(Edh);
      const deck = await query.get(playerId);

      const previousDecklist = deck.get('decklist') || '';
      const result = parseMoxfieldResponse(moxData, previousDecklist);

      deck.set('decklist', result.decklistJson);
      deck.set('deckUpdatedAt', result.lastUpdatedAt);
      deck.set('deckChanges', result.cardChanges);
      deck.set('winsAtLastUpdate', deck.get('gamesWon') || 0);
      deck.set('lossesAtLastUpdate', deck.get('gamesLost') || 0);
      await deck.save();

      setLocalDeckChanges(result.cardChanges);
      setLocalDeckUpdatedAt(result.lastUpdatedAt);
      setLocalWinsAtUpdate(deck.get('gamesWon') || 0);
      setLocalLossesAtUpdate(deck.get('gamesLost') || 0);
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
    } catch (err) {
      console.error('Error refreshing deck:', err);
    } finally {
      setRefreshing(false);
    }
  };
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
        <p className='text-[#8a7060] text-center'>{error}</p>
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
        <div className='gold-ring-sm'>
          <img
            src={playerAvatar || placeholderImage}
            alt={`Avatar of ${playerName}`}
          />
        </div>
        <h2 className='text-xl text-white font-semibold'>VS</h2>
      </div>

      {/* Since Last Deck Update */}
      {localDeckUpdatedAt && (
        <>
          <hr className='border-white/10' />
          <div className='space-y-3'>
            <h3 className='text-[#c9a959] text-sm font-semibold text-center'>
              Since Last Deck Update
            </h3>
            <div className='flex items-center justify-center gap-2'>
              <p className='text-[#e0d7c8]/50 text-xs'>
                {new Date(localDeckUpdatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
              {moxfieldUrl && (
                <button
                  onClick={handleRefreshDeck}
                  disabled={refreshing}
                  className='text-[#c9a959]/60 hover:text-[#c9a959] transition-colors disabled:opacity-30'
                  title='Refresh decklist from Moxfield'
                >
                  <svg
                    className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`}
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' />
                  </svg>
                </button>
              )}
            </div>

            {(() => {
              const sinceWins = (gamesWon || 0) - (localWinsAtUpdate || 0);
              const sinceLosses = (gamesLost || 0) - (localLossesAtUpdate || 0);
              const sinceGames = sinceWins + sinceLosses;
              const sinceWinRate = sinceGames > 0
                ? Math.round((sinceWins / sinceGames) * 100)
                : 0;

              return (
                <div className='grid grid-cols-3 gap-2 text-center'>
                  <div className='bg-[#1a1812]/60 rounded-lg p-2 border border-[rgba(201,169,89,0.1)]'>
                    <p className='text-[#e0d7c8]/50 text-xs'>Wins</p>
                    <p className='text-[#e8d5a3] font-bold text-lg'>{sinceWins}</p>
                  </div>
                  <div className='bg-[#1a1812]/60 rounded-lg p-2 border border-[rgba(201,169,89,0.1)]'>
                    <p className='text-[#e0d7c8]/50 text-xs'>Losses</p>
                    <p className='text-[#8a7060] font-bold text-lg'>{sinceLosses}</p>
                  </div>
                  <div className='bg-[#1a1812]/60 rounded-lg p-2 border border-[rgba(201,169,89,0.1)]'>
                    <p className='text-[#e0d7c8]/50 text-xs'>Win %</p>
                    <p className='text-[#c9a959] font-bold text-lg'>{sinceWinRate}%</p>
                  </div>
                </div>
              );
            })()}

            {localDeckChanges && (
              <div className='bg-[#1a1812]/60 border border-[rgba(201,169,89,0.15)] rounded-lg p-3 max-h-32 overflow-y-auto'>
                <p className='text-[#c9a959] text-xs font-semibold mb-1'>Card Changes</p>
                <pre className='text-[#e0d7c8]/70 text-xs whitespace-pre-wrap leading-relaxed'>
                  {localDeckChanges}
                </pre>
              </div>
            )}
          </div>
        </>
      )}

      <hr className='border-white/10' />

      <div className='space-y-3 max-h-96 overflow-y-auto'>
        {sortedMatchups.map((matchup) => (
          <div
            key={matchup.opponentId}
            className='bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10'
          >
            <div className='flex justify-between items-start mb-2'>
              <div className='gold-ring-sm' style={{ width: '40px', height: '40px' }}>
                <img
                  src={matchup.opponentAvatar || placeholderImage}
                  alt={`Avatar of ${matchup.opponentName}`}
                />
              </div>
              <span
                className={`text-sm font-semibold ${
                  parseFloat(matchup.winRate) >= 50
                    ? 'text-[#e8d5a3]'
                    : 'text-[#8a7060]'
                }`}
              >
                {Math.round(parseFloat(matchup.winRate))}% Win Rate
              </span>
            </div>

            <div className='grid grid-cols-3 gap-2 text-center text-sm'>
              <div className='bg-white/5 rounded p-2'>
                <p className='text-white/50 text-xs'>Wins</p>
                <p className='text-[#e8d5a3] font-bold text-lg'>
                  {matchup.wins}
                </p>
              </div>
              <div className='bg-white/5 rounded p-2'>
                <p className='text-white/50 text-xs'>Losses</p>
                <p className='text-[#8a7060] font-bold text-lg'>
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
