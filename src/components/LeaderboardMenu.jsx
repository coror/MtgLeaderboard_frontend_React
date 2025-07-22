import Button from './UI/Button';

export default function LeaderboardMenu({
  handleEdhPlayerLeaderboard,
  edhPlayerLeaderboard,
  handleEdhLeaderboard,
  edhLeaderboard,
}) {
  return (
    <div className='flex flex-row items-center gap-x-3 justify-center'>
      <Button
        onClick={handleEdhPlayerLeaderboard}
        isActive={edhPlayerLeaderboard}
      >
        Players
      </Button>
      <Button onClick={handleEdhLeaderboard} isActive={edhLeaderboard}>
        Commanders
      </Button>
    </div>
  );
}
