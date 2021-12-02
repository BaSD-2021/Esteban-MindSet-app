import React from 'react';
import styles from './modal.module.css';

function Modal(props) {
  if (!props.show) {
    return null;
  }

  const onCloseModal = (id) => {
    props.closeModal();
    props.function(id);
  };

  return (
    <section id="modal-section" className={styles.container}>
      <div id="modal-content" className={styles.modal}>
        <h2 id="modal-title">Caution</h2>
        <p> You are about to delete a position</p>
        <div id="modal-data-inputs"></div>
        <div id="error_message"></div>
        <div id="modal-buttons" className={styles.buttonContainer}>
          <button id="cancel-button" onClick={props.closeModal}>
            CANCEL
          </button>
          <button
            id="proceed-button"
            onClick={() => {
              onCloseModal(props.id);
            }}
          >
            CONFIRM
          </button>
        </div>
      </div>
    </section>
  );
}

export default Modal;
