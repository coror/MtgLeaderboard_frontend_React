import { useQuery } from '@tanstack/react-query';
import Parse from 'parse';

import { useAuth } from '../store/auth-context';

export default function useLeaderBoardData(classDB, nameField) {
  const { sessionToken } = useAuth();
  const fetchLeaderboardData = async ({ queryKey }) => {
    const [_key, className, sessionToken] = queryKey;

    if (!sessionToken) {
      throw new Error('No session token available');
    }

    const query = new Parse.Query(className);
    query.ascending('rank');
    query.include('avatar');

    const result = await query.find({ useMasterKey: false });
    return result.map((data) => ({
      objectId: data.id,
      rank: data.get('rank'),
      avatar:
        data.get('avatar') && data.get('avatar').get('avatar')
          ? data.get('avatar').get('avatar').url()
          : '',
      nameField: data.get(nameField),
      winRate: data.get('winRate'),
      gamesWon: data.get('gamesWon'),
      gamesLost: data.get('gamesLost'),
      gamesPlayed: data.get('gamesPlayed'),
      decklist: data.get('decklist'),
    }));
  };

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['leaderboard', classDB, sessionToken],
    queryFn: fetchLeaderboardData,
    enabled: !!sessionToken, // Only fetch if sessionToken exists
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    refetchOnWindowFocus: false, // Optional: prevent refetching on window focus
  });

  return { data, isLoading, error };
}
