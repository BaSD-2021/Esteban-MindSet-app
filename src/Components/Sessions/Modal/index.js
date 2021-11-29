import styles from './modal.module.css';

function Modal(props) {
  if (!props.showModal) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3>You are deleting the selected session</h3>
      </div>
    </div>
  );
}

export default Modal;
