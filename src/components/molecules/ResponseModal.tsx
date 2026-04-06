import { createPortal } from 'react-dom';

import Button from '../atoms/Button';
import ResponseModalHeader from '../atoms/ResponseModal/ResponseModalHeader';
import ResponseModalContent from '../atoms/ResponseModal/ResponseModalContent';
import useResponseModal from '../../hooks/useResponseModal';
import { ResponseModalProps } from '../../models/responseModal';

export default function ResponseModal({
  onConfirm,
  title,
  message,
}: ResponseModalProps) {
  const { modalRef, handleBackdropClick } = useResponseModal(onConfirm);

  return createPortal(
    <div
      role='dialog'
      aria-modal='true'
      aria-labelledby='modal-title'
      tabIndex={-1}
      onClick={handleBackdropClick}
      className='fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-5'
    >
      <div
        ref={modalRef}
        className='bg-gradient-to-br from-[#1a1812] via-[#0f0e0b] to-[#1a1812] rounded-2xl shadow-2xl border border-[rgba(201,169,89,0.25)] max-w-md w-full px-6 py-6 text-center space-y-4 text-[#e0d7c8]'
      >
        <ResponseModalHeader title={title} />
        <ResponseModalContent message={message || ''} />
        <div className='flex justify-center'>
          <Button onClick={onConfirm} isActive={true}>
            Ok
          </Button>
        </div>
      </div>
    </div>,
    document.getElementById('overlay-root')!
  );
}
