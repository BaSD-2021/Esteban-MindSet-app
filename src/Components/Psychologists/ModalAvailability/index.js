import React from 'react';
import styles from './modal.module.css';

const ModalAvailability = ({
  title,
  children,
  confirmButton,
  cancelButton,
  toggleModal,
  handleConfirm,
  handleCancel
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h3 className={styles.title}>{title}</h3>
          <button className={styles.closeBtn} onClick={toggleModal}>
            X
          </button>
        </div>
        <div className={styles.content}>{children}</div>
        <div className={styles.btnContainer}>
          {confirmButton && (
            <button className={styles.confirmBtn} onClick={handleConfirm}>
              {confirmButton}
            </button>
          )}
          {cancelButton && (
            <button className={styles.cancelBtn} onClick={handleCancel}>
              {cancelButton}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalAvailability;
