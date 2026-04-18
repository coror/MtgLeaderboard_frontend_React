import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
// @ts-expect-error it works, but i dont know why it shows no module found
import Parse from 'parse/dist/parse.min.js';

import { useAuth } from '../store/auth-context';
import { Player } from '../models/player';
import { resolveAvatarUrl } from '../helpers/parseAvatar';

export default function useLeaderBoardData(classDB: string, nameField: string) {
  const { sessionToken } = useAuth();

  const fetchLeaderboardData = async ({
    queryKey,
  }: QueryFunctionContext): Promise<Player[]> => {
    const [, className, sessionToken] = queryKey;

    if (!sessionToken) {
      throw new Error('No session token available');
    }

    const query = new Parse.Query(className);
    query.ascending('rank');
    query.include('avatar');
    const fields = ['rank', 'avatar', nameField, 'winRate', 'gamesWon', 'gamesLost', 'gamesPlayed'];
    if (className === 'Edh') {
      fields.push('moxfieldUrl', 'deckUpdatedAt', 'deckChanges', 'winsAtLastUpdate', 'lossesAtLastUpdate');
    }
    query.select(fields);

    const result = await query.find({ useMasterKey: false });

    return result.map((data: Parse.Object) => ({
      objectId: data.id,
      rank: data.get('rank'),
      avatar: resolveAvatarUrl(data),
      nameField: data.get(nameField),
      winRate: data.get('winRate'),
      gamesWon: data.get('gamesWon'),
      gamesLost: data.get('gamesLost'),
      gamesPlayed: data.get('gamesPlayed'),
      moxfieldUrl: data.get('moxfieldUrl'),
      deckUpdatedAt: data.get('deckUpdatedAt'),
      deckChanges: data.get('deckChanges'),
      winsAtLastUpdate: data.get('winsAtLastUpdate'),
      lossesAtLastUpdate: data.get('lossesAtLastUpdate'),
    }));
  };

  const {
    data = [],
    isLoading,
    error,
  } = useQuery<Player[], Error>({
    queryKey: ['leaderboard', classDB, sessionToken],
    queryFn: fetchLeaderboardData,
    enabled: !!sessionToken, // Only fetch if sessionToken exists
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    refetchOnWindowFocus: false, // Optional: prevent refetching on window focus
  });

  return { data, isLoading, error };
}
