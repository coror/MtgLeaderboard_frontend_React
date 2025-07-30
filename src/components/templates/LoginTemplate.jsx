import useViewportHeight from '../../hooks/useViewportHeight';

// templates/LoginTemplate.jsx
export default function LoginTemplate({ children }) {
  useViewportHeight();

  return (
    <div
      className='relative flex flex-col items-center text-white overflow-x-hidden'
      style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
    >
      {/* Fixed full-screen background image */}
      <img
        src='/assets/background13.jpg'
        alt='Background'
        className='fixed top-0 left-0 w-full h-full object-cover z-[-1]'
      />
      <div className='mt-60 flex flex-col gap-16'>
        <h1 className='text-4xl font-bold text-center text-white'>
          MTG Leaderboard
        </h1>
        <div className='bg-black/40 backdrop-blur-sm p-10 rounded-lg shadow-lg'>
          {children}
        </div>
      </div>
    </div>
  );
}
