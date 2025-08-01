import placeholderImage from '/assets/placeholderAvatar.png';

export default function LeaderboardSlot({
  rank,
  avatar,
  nameField,
  onPlayerClick,
  gamesLost,
  gamesPlayed,
  gamesWon,
  winRate,
  decklist
}) {
  return (
    <div className='flex flex-row px-7 items-center justify-start gap-12 my-3'>
      <div className='w-1'>{rank}</div>

      <div
        className='w-12 h-12 rounded-full shadow-2xl shadow-stone-100'
        onClick={() =>
          onPlayerClick({
            nameField,
            avatar,
            rank,
            gamesLost,
            gamesPlayed,
            gamesWon,
            winRate,
            decklist
          })
        }
      >
        <img
          src={avatar || placeholderImage}
          alt={`Avatar or ${nameField}`}
          className='w-full h-full rounded-full'
        />
      </div>

      <div className='text-xs lg:text-lg text-center'>{nameField}</div>
    </div>
  );
}
