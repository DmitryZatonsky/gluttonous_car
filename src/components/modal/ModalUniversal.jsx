import React from 'react';

const Modal = ({ isOpen, onClose, onConfirm, title, children, confirmText = 'Да', cancelText = 'Отмена', isDanger = false }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3 style={styles.title}>{title}</h3>
        <div style={styles.content}>{children}</div>
        
        <div style={styles.buttonGroup}>
          <button style={styles.cancelBtn} onClick={onClose}>
            {cancelText}
          </button>
          <button 
            style={{ ...styles.confirmBtn, backgroundColor: isDanger ? '#ff4d4d' : '#d9008d' }} 
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(9, 7, 13, 0.8)',
    backdropFilter: 'blur(5px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10000,
    padding: '20px'
  },
  modal: {
    backgroundColor: '#1a1825',
    borderRadius: '16px',
    padding: '24px',
    width: '100%',
    maxWidth: '350px',
    border: '1px solid rgba(217, 0, 141, 0.2)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
  },
  title: {
    margin: '0 0 10px 0',
    color: '#fff',
    fontSize: '18px'
  },
  content: {
    color: '#a49caf',
    fontSize: '14px',
    marginBottom: '20px',
    lineHeight: '1.5'
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px'
  },
  cancelBtn: {
    backgroundColor: 'transparent',
    color: '#a49caf',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  confirmBtn: {
    color: '#fff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};

export default Modal;