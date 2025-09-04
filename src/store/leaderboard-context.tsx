import { createContext, useContext, ReactNode } from 'react';
import useLeaderboardState, {
  LeaderboardState,
} from '../hooks/useLeaderboardState';

type LeaderboardContextType = LeaderboardState;

export const LeaderboardContext = createContext<
  LeaderboardContextType | undefined
>(undefined);

type Props = {
  children: ReactNode;
};

export default function LeaderboardContextProvider({ children }: Props) {
  const leaderboardCtx = useLeaderboardState();

  return (
    <LeaderboardContext.Provider value={leaderboardCtx}>
      {children}
    </LeaderboardContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLeaderboard = (): LeaderboardContextType => {
  const context = useContext(LeaderboardContext);
  if (!context) {
    throw new Error(
      'useLeaderboard must be used within a LeaderboardContextProvider'
    );
  }
  return context;
};
