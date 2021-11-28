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
        <h3>Modal</h3>
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
  );
}

export default Modal;
