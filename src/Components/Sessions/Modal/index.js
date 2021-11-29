import styles from './modal.module.css';

function Modal(props) {
  if (!props.showModal) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3>{props.title}</h3>
        <div>
          <button
            disabled={props.isLoading}
            onClick={props.onClose}
            className={`${styles.button} ${styles.cancel}`}
          >
            Cancel
          </button>
          <button disabled={props.isLoading} onClick={props.onConfirm} className={styles.button}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
