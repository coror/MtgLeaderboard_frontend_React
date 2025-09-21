import { createPortal } from 'react-dom';

import Button from '../atoms/Button';
import ResponseModalHeader from '../atoms/ResponseModal/ResponseModalHeader';
import ResponseModalContent from '../atoms/ResponseModal/ResponseModalContent';
import useResponseModal from '../../hooks/useResponseModal';

type ResponseModalProps = {
  onConfirm: () => void;
  title: string;
  message: string | null;
};

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
      className='fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm px-5'
    >
      <div
        ref={modalRef}
        className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg max-w-md w-full px-6 py-4 text-center space-y-4'
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
