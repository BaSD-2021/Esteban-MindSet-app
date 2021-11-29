import React from 'react';
import styles from './modal.module.css';

const Modal = ({ title, children, confirmButton, cancelButton, ToggleModal }) => {
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h3 className={styles.title}>{title}</h3>
          <button onClick={ToggleModal}>X</button>
        </div>
        <div className={styles.content}>{children}</div>
        <div>
          {confirmButton && <button>{confirmButton}</button>}
          {cancelButton && <button>{cancelButton}</button>}
        </div>
      </div>
    </div>
  );
};

export default Modal;
