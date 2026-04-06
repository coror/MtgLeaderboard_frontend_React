import { createPortal } from 'react-dom';
import Button from '../atoms/Button';
import useNextMatch from '../../hooks/useNextMatch';
import placeholderImage from '/assets/placeholderAvatar.png';
import { GiCrossedSwords } from 'react-icons/gi';

interface NextMatchModalProps {
  onClose: () => void;
}

export default function NextMatchModal({ onClose }: NextMatchModalProps) {
  const { suggestion, isLoading, error, findNextMatch } = useNextMatch();

  const handleOpen = () => {
    if (!suggestion && !isLoading) {
      findNextMatch();
    }
  };

  // Trigger fetch on mount
  if (!suggestion && !isLoading && !error) {
    handleOpen();
  }

  return createPortal(
    <div
      role='dialog'
      aria-modal='true'
      onClick={onClose}
      className='fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-5'
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='bg-gradient-to-br from-[#1a1812] via-[#0f0e0b] to-[#1a1812] rounded-2xl shadow-2xl border border-[rgba(201,169,89,0.25)] max-w-sm w-full px-6 py-6 text-center space-y-5'
      >
        <h2 className='text-[#c9a959] text-xl font-bold'>Next Match</h2>

        {isLoading && (
          <div className='flex flex-col items-center gap-4 py-6'>
            <div className='next-match-loader'>
              <GiCrossedSwords size={36} color='#c9a959' />
            </div>
            <p className='text-[#e0d7c8]/70 text-sm'>Analyzing matchups...</p>
          </div>
        )}

        {error && (
          <p className='text-[#b05050] text-sm'>{error}</p>
        )}

        {suggestion && (
          <div className='space-y-4'>
            {suggestion.isNewRound && (
              <div className='bg-[rgba(201,169,89,0.08)] border border-[rgba(201,169,89,0.2)] rounded-lg px-3 py-2'>
                <p className='text-[#c9a959] text-xs font-semibold'>New Round Starting</p>
              </div>
            )}

            <div className='flex items-center justify-center gap-4'>
              {/* Commander 1 */}
              <div className='flex flex-col items-center gap-2'>
                <div className='gold-ring-sm w-16 h-16'>
                  <img
                    src={suggestion.commander1.avatar || placeholderImage}
                    alt={suggestion.commander1.name}
                  />
                </div>
                <span className='text-[#e8d5a3] text-xs font-semibold max-w-[80px] text-center leading-tight'>
                  {suggestion.commander1.name}
                </span>
              </div>

              {/* VS */}
              <div className='flex flex-col items-center'>
                <span className='text-[#c9a959] text-2xl font-bold'>VS</span>
              </div>

              {/* Commander 2 */}
              <div className='flex flex-col items-center gap-2'>
                <div className='gold-ring-sm w-16 h-16'>
                  <img
                    src={suggestion.commander2.avatar || placeholderImage}
                    alt={suggestion.commander2.name}
                  />
                </div>
                <span className='text-[#e8d5a3] text-xs font-semibold max-w-[80px] text-center leading-tight'>
                  {suggestion.commander2.name}
                </span>
              </div>
            </div>

            <p className='text-[#e0d7c8]/50 text-xs'>
              Previous matches: {suggestion.gamesPlayed}
            </p>
          </div>
        )}

        <div className='flex justify-center'>
          <Button onClick={onClose} className='w-32'>
            Close
          </Button>
        </div>
      </div>
    </div>,
    document.getElementById('overlay-root')!
  );
}
