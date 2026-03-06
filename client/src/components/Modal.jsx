import "../styles/Modal.css";

// Modal.jsx
export default function Modal({ onClose, children, className = "" }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal ${className}`} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}