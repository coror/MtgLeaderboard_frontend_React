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
        className='
    w-12 h-12 rounded-full
    shadow-[0_8px_15px_rgba(0,0,0,0.25),0_4px_6px_rgba(0,0,0,0.15)]
    cursor-pointer
    transition-transform duration-150 ease-out
    hover:scale-110
    hover:shadow-[0_12px_24px_rgba(0,0,0,0.35),0_6px_10px_rgba(0,0,0,0.2)]
    active:translate-y-[2px] active:shadow-[0_6px_10px_rgba(0,0,0,0.2),0_3px_5px_rgba(0,0,0,0.1)]
  '
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
        <img
          src={avatar || placeholderImage}
          alt={`Avatar or ${nameField}`}
          className='w-full h-full rounded-full object-cover object-top'
        />
      </div>

      <div className='text-xs lg:text-lg text-center'>{nameField}</div>
    </div>
  );
};

export default LeaderboardSlot;
