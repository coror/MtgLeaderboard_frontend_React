import { useEffect, useRef } from 'react';

/**
 * A custom hook to handle the behavior of a response modal, including
 * closing on 'Escape' key press and clicks outside the modal content.
 * @param onConfirm - A callback function to execute when the modal should be confirmed or closed.
 * @returns An object containing a ref for the modal and a click handler for the backdrop.
 */
export default function useResponseModal(onConfirm: () => void) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Focus the modal for accessibility and to capture keyboard events
    if (modalRef.current) {
      modalRef.current.focus();
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onConfirm();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onConfirm]);

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    // If the click was outside the modal content, close the modal
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onConfirm();
    }
  }

  return { modalRef, handleBackdropClick };
}
