import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import Button from '../atoms/Button';
import ResponseModalHeader from '../atoms/ResponseModal/ResponseModalHeader';
import ResponseModalContent from '../atoms/ResponseModal/ResponseModalContent';

export default function ResponseModal({ onConfirm, title, message }) {
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

  return createPortal(
    <div
      role='dialog'
      aria-modal='true'
      aria-labelledby='modal-title'
      tabIndex={-1}
      onClick={handleBackdropClick}
      className='fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm px-5'
    >
      <div
        ref={modalRef}
        className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg max-w-md w-full px-6 py-4 text-center space-y-4'
      >
        <ResponseModalHeader title={title} />
        <ResponseModalContent message={message} />
        <div className='flex justify-center'>
          <Button onClick={onConfirm} isActive={true}>
            Ok
          </Button>
        </div>
      </div>
    </div>,
    document.getElementById('overlay-root')
  );
}
