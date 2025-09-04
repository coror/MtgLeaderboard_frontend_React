import { useState } from 'react';

export type LeaderboardState = {
  edhLeaderboard: boolean;
  edhPlayerLeaderboard: boolean;
  handleEdhLeaderboard: () => void;
  handleEdhPlayerLeaderboard: () => void;
};

export default function useLeaderboardState(): LeaderboardState {
  const [edhLeaderboard, setEdhLeaderboard] = useState<boolean>(false);
  const [edhPlayerLeaderboard, setEdhPlayerLeaderboard] =
    useState<boolean>(true);

  const handleEdhLeaderboard = () => {
    setEdhLeaderboard(true);
    setEdhPlayerLeaderboard(false);
  };

  const handleEdhPlayerLeaderboard = () => {
    setEdhLeaderboard(false);
    setEdhPlayerLeaderboard(true);
  };

  return {
    handleEdhLeaderboard,
    handleEdhPlayerLeaderboard,
    edhLeaderboard,
    edhPlayerLeaderboard,
  };
}
