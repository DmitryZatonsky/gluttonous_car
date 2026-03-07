import React from 'react';

export default function Modal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="modal-btn cancel" onClick={onClose}>Отмена</button>
          <button className="modal-btn confirm" onClick={onConfirm}>Удалить</button>
        </div>
      </div>
    </div>
  );
}