import { useState } from 'react';
// @ts-expect-error it works, but i dont know why it shows no module found
import Parse from 'parse/dist/parse.min.js';

interface PlayerMatchup {
  opponentId: string;
  opponentName: string;
  opponentAvatar: string;
  wins: number;
  losses: number;
  gamesPlayed: number;
  winRate: string;
}

interface PlayerStatsResult {
  found: boolean;
  matchups: PlayerMatchup[];
  message?: string;
}

interface UsePlayerStatsResult {
  stats: PlayerStatsResult | null;
  isLoading: boolean;
  error: string | null;
  fetchStats: (id: string, classDB: string) => Promise<void>;
  resetStats: () => void;
}

export default function usePlayerStats(): UsePlayerStatsResult {
  const [stats, setStats] = useState<PlayerStatsResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async (id: string, classDB: string) => {
    if (!id) {
      setError('ID is required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      let result;
      if (classDB === 'EdhPlayer') {
        result = await Parse.Cloud.run('getAllMatchupsForPlayer', {
          playerId: id,
        });
      } else if (classDB === 'Edh') {
        result = await Parse.Cloud.run('getAllMatchupsForDeck', {
          edhId: id,
        });
      } else {
        throw new Error('Invalid class type');
      }

      setStats(result);
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError((err as Error).message || 'Failed to fetch statistics');
    } finally {
      setIsLoading(false);
    }
  };

  const resetStats = () => {
    setStats(null);
    setError(null);
  };

  return {
    stats,
    isLoading,
    error,
    fetchStats,
    resetStats,
  };
}
