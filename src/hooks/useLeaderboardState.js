import { useState } from 'react';

export default function useLeaderboardState() {
  const [edhLeaderboard, setEdhLeaderboard] = useState(false);
  const [edhPlayerLeaderboard, setEdhPlayerLeaderboard] = useState(true);

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
