import { createContext, useContext } from 'react';
import useLeaderboardState from '../hooks/useLeaderboardState';

export const LeaderboardContext = createContext({});

export default function LeaderboardContextProvider({ children }) {
  const leaderboardCtx = useLeaderboardState();
  return (
    <LeaderboardContext.Provider value={leaderboardCtx}>
      {children}
    </LeaderboardContext.Provider>
  );
}

export const useLeaderboard = () => useContext(LeaderboardContext);
