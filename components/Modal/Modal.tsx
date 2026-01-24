import React, { useEffect, type ReactNode } from "react";
import css from "./Modal.module.css";
import { createPortal } from "react-dom";

interface ModalProps {
  onClose: () => void;
  children: ReactNode | React.ReactElement<{ onClose?: () => void }>;
}

interface ChildProps {
  onClose?: () => void;
}

function Modal({ onClose, children }: ModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        {React.isValidElement<ChildProps>(children)
          ? React.cloneElement(children, { onClose })
          : children}
      </div>
    </div>,
    document.body
  );
}

export default Modal;
