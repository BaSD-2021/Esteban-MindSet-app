import styles from '../Modal/postulants.module.css';

function Modal(props) {
  if (!props.showModal) {
    return null;
  }

  const onCloseModal = (id) => {
    props.closeModal();
    props.deletePostulant(id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3>Caution</h3>
        <p>Do you really want to delete this postulation?</p>
        <div className={styles.buttons}>
          <button
            onClick={() => {
              onCloseModal(props.itemOnDelete._id);
            }}
          >
            Delete
          </button>
          <button
            onClick={() => {
              props.closeModal();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
