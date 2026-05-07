import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className="overlay" onClick={onClose}>
      <div className="m-auto flex" onClick={(e) => e.stopPropagation()}>
        <div className="custom-container">{children}</div>
      </div>
    </div>,
    document.body,
  );
};
