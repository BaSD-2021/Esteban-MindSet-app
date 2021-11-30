import styles from './modal.module.css';

const Modal = ({ handleClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        Admin successfully deleted!
        <button onClick={() => handleClose()}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
