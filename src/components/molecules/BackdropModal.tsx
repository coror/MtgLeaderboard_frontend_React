import { createPortal } from 'react-dom';
import { BackdropModalProps } from '../../models/backdropModal';

const BackdropModal: React.FC<BackdropModalProps> = ({
  children,
  menuOpen,
  closeMenu,
}) => {
  return createPortal(
    <div
      className={`fixed inset-0 z-[90] h-full flex justify-center items-center transition-opacity duration-300 ${
        menuOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      } bg-black bg-opacity-70`}
      onClick={closeMenu} // click outside to close
    >
      <div
        className={`flex flex-col items-center justify-start
              bg-gradient-to-br from-amber-500/30 via-orange-600/30 to-red-500/30
              backdrop-blur-xl rounded-xl p-6 w-80 space-y-4 border border-white/10 shadow-xl
              max-h-[90vh] overflow-y-auto
              transform transition-all duration-300
              ${
                menuOpen
                  ? 'opacity-100 scale-100 translate-y-0'
                  : 'opacity-0 scale-95 translate-y-4'
              }`}
        onClick={(e) => e.stopPropagation()} // prevent click inside from closing
      >
        {children}
      </div>
    </div>,
    document.getElementById('backdrop-root')!
  );
};

export default BackdropModal;
