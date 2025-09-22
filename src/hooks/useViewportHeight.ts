import { useEffect } from 'react';

export default function useViewportHeight() {
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01; // window.innerHeight gives real usable heigh EXCLUDING the address bar. Multiplying it by 0.01 gives us 1vh
      document.documentElement.style.setProperty('--vh', `${vh}px`); // this sets a custom css variable called --vh glovally. now I can use height: calc(var(--vh, 1vh) * 100) instead of h: 100vh
    };

    setVH(); // set on load
    window.addEventListener('resize', setVH); // update on resize. so if the user rotates the phone, or browser UI changes size

    return () => window.removeEventListener('resize', setVH);
  }, []);
}
