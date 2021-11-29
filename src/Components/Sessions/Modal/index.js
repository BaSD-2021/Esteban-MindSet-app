import styles from './modal.module.css';

function Modal(props) {
  if (!props.show) {
    return null;
  }
  return (
    <section className={styles.container}>
      <div className={styles.modal}>
        <h4>{props.title}</h4>
        <div>
          <button
            disabled={props.isLoading}
            onClick={props.onCancel}
            className={`${styles.button} ${styles.cancel}`}
          >
            Cancel
          </button>
          <button disabled={props.isLoading} onClick={props.onConfirm} className={styles.button}>
            Confirm
          </button>
        </div>
      </div>
    </section>
  );
}

export default Modal;
