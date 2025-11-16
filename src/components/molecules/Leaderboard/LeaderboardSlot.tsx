import { Player } from '../../../models/player';
import placeholderImage from '/assets/placeholderAvatar.png';

type LeaderboardSlotProps = Player & {
  onPlayerClick: (player: Player) => void;
};

const LeaderboardSlot: React.FC<LeaderboardSlotProps> = ({
  rank,
  avatar,
  nameField,
  onPlayerClick,
  gamesLost,
  gamesPlayed,
  gamesWon,
  winRate,
  decklist,
}) => {
  return (
    <div className='flex flex-row px-7 items-center justify-start gap-10 my-3'>
      <div className='w-1'>{rank}</div>

      <div
  className='fire-ring-container small cursor-pointer hover:scale-110 active:translate-y-[2px]'
  style={{ width: '48px', height: '48px' }}

        onClick={() =>
          onPlayerClick({
            nameField,
            avatar,
            rank,
            gamesLost,
            gamesPlayed,
            gamesWon,
            winRate,
            decklist,
          })
        }
      >
        <div className='fire-circle'></div>
        <div className='fire-circle fire-circle-2'></div>
        <img
          src={avatar || placeholderImage}
          alt={`Avatar or ${nameField}`}
          className='object-cover object-top'
          style={{ width: '46px', height: '46px', borderRadius: '50%', position: 'relative', zIndex: 10, objectFit: 'cover', objectPosition: 'top', boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)' }}
        />
      </div>

      <div className='text-xs lg:text-lg text-center'>{nameField}</div>
    </div>
  );
};

export default LeaderboardSlot;
