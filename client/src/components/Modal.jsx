import { useEffect } from "react";
import { useModal } from "../context/ModalContext";
import "../styles/Modal.css";

export default function Modal({ onClose, children, className = "" }) {
  const { registerOpen, registerClose } = useModal();

  useEffect(() => {
    registerOpen();
    return () => registerClose(); 
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal ${className}`} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}