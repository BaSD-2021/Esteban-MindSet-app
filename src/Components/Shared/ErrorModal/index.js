import React from 'react';
import styles from './errorModal.module.css';

function errorModal(props) {
  // if (!props.showErrModal) {
  //   return null;
  // }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <p>{props.message}</p>
        <div>
          <button onClick={props.onClose} className={`${styles.button} ${styles.cancel}`}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default errorModal;
