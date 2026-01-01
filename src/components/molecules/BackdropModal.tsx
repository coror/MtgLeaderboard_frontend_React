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
              bg-gradient-to-br from-black/95 via-red-950/30 to-black/95
              backdrop-blur-xl rounded-2xl px-6 py-4 w-[90%] max-w-sm space-y-3
              border border-white/20 shadow-2xl
              max-h-[80dvh] overflow-y-auto my-auto
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
