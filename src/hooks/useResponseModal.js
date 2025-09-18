import { useEffect, useRef } from 'react';

export default function useResponseModal(onConfirm) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (modalRef.current) modalRef.current.focus();

    function onKeyDown(e) {
      if (e.key === 'Escape') {
        onConfirm();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onConfirm]);

  function handleBackdropClick(e) {
    // If click was outside the modal content, close the modal
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onConfirm();
    }
  }

  return { modalRef, handleBackdropClick };
}
