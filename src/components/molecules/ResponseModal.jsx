import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import Button from '../atoms/Button';
import ResponseModalHeader from '../atoms/ResponseModalHeader';
import ResponseModalContent from '../atoms/ResponseModalContent';

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

  return createPortal(
    <div
      role='dialog'
      aria-modal='true'
      aria-labelledby='modal-title'
      tabIndex={-1}
      ref={modalRef}
    >
      <ResponseModalHeader title={title} />
      <ResponseModalContent message={message} />
      <Button onClick={onConfirm} isActive={true}>
        Ok
      </Button>
    </div>,
    document.getElementById('overlay-root')
  );
}
