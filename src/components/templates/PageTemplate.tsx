import React, { PropsWithChildren } from 'react';
import useViewportHeight from '../../hooks/useViewportHeight';

// Type the component using PropsWithChildren
const PageTemplate: React.FC<PropsWithChildren> = ({ children }) => {
  useViewportHeight();

  return (
    <div
      className='relative text-white'
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
};

export default PageTemplate;
