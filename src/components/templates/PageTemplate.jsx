import useViewportHeight from '../../hooks/useViewportHeight';

export default function PageTemplate({ children }) {
  useViewportHeight();

  return (
    <div
      className='relative text-white overflow-x-hidden'
      style={{
        minHeight: 'calc(var(--vh, 1vh) * 100)',
        height: 'calc(var(--vh, 1vh) * 100)',
      }}
    >
      {/* Fixed full-screen background image */}
      <img
        src='/assets/background13.jpg'
        alt='Background'
        className='fixed top-0 left-0 w-full h-full object-cover z-[-1]'
      />

      {/* Centered content */}
      {children}
    </div>
  );
}
