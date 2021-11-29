import React from 'react';

function Modal(props) {
  if (!props.show) {
    return null;
  }
  return (
    <section id="modal-section" className="modal-display-off">
      <div id="modal-content">
        <span id="modal-close-button" onClick={props.closeModal}>
          &times;
        </span>
        <h1 id="modal-title"></h1>
        <div id="modal-data-inputs"></div>
        <div id="error_message"></div>
        <div id="modal-buttons">
          <button id="cancel-button" onClick={props.closeModal}>
            CANCEL
          </button>
          <button
            id="proceed-button"
            onClick={() => {
              props.function(props.id);
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
