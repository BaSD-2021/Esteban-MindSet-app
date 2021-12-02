import React from 'react';
import styles from './modal.module.css';

function Modal(props) {
  if (!props.show) {
    return null;
  }
  return (
    <section id="modal-section" className={styles.container}>
      <div id="modal-content" className={styles.window}>
        <h2 id="modal-title">Delete item</h2>
        <p>YOU ARE ABOUT TO DELETE A CLIENT</p>
        <div className={styles.buttonContainer}>
          <button id="cancel-button" onClick={props.closeModal} className={styles.modalButton}>
            Cancel
          </button>
          <button
            id="proceed-button"
            onClick={(event) => {
              props.function(event, props.id);
            }}
            className={styles.modalButton}
          >
            Confirm
          </button>
        </div>
      </div>
    </section>
  );
}
export default Modal;
