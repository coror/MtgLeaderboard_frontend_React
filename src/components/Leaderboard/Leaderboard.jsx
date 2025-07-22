import React, { useEffect, useState } from 'react';
import Parse from 'parse';
import { useQuery } from '@tanstack/react-query';
import LeaderboardSlot from './LeaderboardSlot';
import Spinner from '../UI/Spinner';

const Leaderboard = ({ className, nameField }) => {
  const [sessionToken, setSessionToken] = useState(
    localStorage.getItem('sessionToken')
  );

  useEffect(() => {
    const token = localStorage.getItem('sessionToken');
    setSessionToken(token);
  }, []);

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
    }));
  };

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['leaderboard', className, sessionToken],
    queryFn: fetchLeaderboardData,
    enabled: !!sessionToken, // Only fetch if sessionToken exists
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    refetchOnWindowFocus: false, // Optional: prevent refetching on window focus
  });
  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  const topThree = data.slice(0, 3);
  const others = data.slice(3);

  return (
    <div className='flex flex-col mt-16 w-screen md:max-w-[45rem]'>
      <div className='flex justify-center'>
        <LeaderboardSlot {...topThree[1]} podiumRank={2} />
        <LeaderboardSlot {...topThree[0]} podiumRank={1} />
        <LeaderboardSlot {...topThree[2]} podiumRank={3} />
      </div>
      <ul className='list-none p-0 my-1 mb-4 w-full bg-[#494A54] rounded-2xl shadow-[0_100px_400px_rgba(0,0,0,0.5),_0_60px_400px_rgba(0,0,0,0.5)] overflow-hidden'>
        {others.map((player) => (
          <div key={player.nameField}>
            <LeaderboardSlot {...player} />
            <hr className='border-t border-gray-300 opacity-20 w-80 mx-auto lg:w-[35rem]' />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
