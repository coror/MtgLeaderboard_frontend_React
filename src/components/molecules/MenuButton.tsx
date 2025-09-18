type MenuButtonProps = {
  toggleMenu: () => void;
  menuOpen: boolean;
};

export default function MenuButton({ toggleMenu, menuOpen }: MenuButtonProps) {
  return (
    <div className='absolute top-4 right-4 z-[95]'>
      <button
        onClick={toggleMenu}
        className='flex flex-col justify-center items-center w-10 h-10 group'
      >
        <div
          className={`w-6 h-0.5 bg-white my-1 transition-all duration-300 ease-in-out ${
            menuOpen ? 'rotate-45 translate-y-2' : ''
          }`}
        />
        <div
          className={`w-6 h-0.5 bg-white my-1 transition-all duration-300 ease-in-out ${
            menuOpen ? 'opacity-0' : ''
          }`}
        />
        <div
          className={`w-6 h-0.5 bg-white my-1 transition-all duration-300 ease-in-out ${
            menuOpen ? '-rotate-45 -translate-y-3' : ''
          }`}
        />
      </button>
    </div>
  );
}
