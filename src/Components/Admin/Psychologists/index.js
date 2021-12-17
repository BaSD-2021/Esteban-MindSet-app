import styles from './psychologists.module.css';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import List from './List';
import Modal from 'Components/Shared/Modal';
import ModalAvailability from './ModalAvailability';
import AvailabilityTable from './AvailabilityTable';
import { getPsychologists, deletePsychologist } from 'redux/psychologists/thunks';

function Psychologists() {
  const [idToDelete, setIdToDelete] = useState('');
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [psychologistAvailability, setPsychologistAvailability] = useState({});
  const [showError, setShowError] = useState(false);

  const history = useHistory();

  const dispatch = useDispatch();

  const psychologists = useSelector((store) => store.psychologists.list);
  const error = useSelector((store) => store.psychologists.error);
  const isLoading = useSelector((store) => store.psychologists.isFetching);

  useEffect(() => {
    if (!psychologists.length) {
      dispatch(getPsychologists());
    }
  }, [psychologists]);

  const toggleAvailabilityModal = (e, psychologist) => {
    if (!showAvailabilityModal) {
      e.stopPropagation();
      setPsychologistAvailability(psychologist.availability);
      setShowAvailabilityModal(!showAvailabilityModal);
    } else {
      setShowAvailabilityModal(!showAvailabilityModal);
    }
  };

  const toggleConfirmModal = (e, psychologist) => {
    if (!showConfirmModal) {
      e.stopPropagation();
      setIdToDelete(psychologist._id);
      setShowConfirmModal(true);
    } else {
      setShowConfirmModal(false);
    }
  };

  const redirect = (id) => {
    history.push(`/psychologists/form?_id=${id}`);
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Psychologists</h2>
      <div className={styles.formContainer}>
        {isLoading ? (
          <p className={styles.loading}>On Loading ...</p>
        ) : (
          <List
            psychologists={psychologists}
            handleEdit={redirect}
            toggleAvailabilityModal={toggleAvailabilityModal}
            toggleConfirmModal={toggleConfirmModal}
          />
        )}
        {showAvailabilityModal && (
          <ModalAvailability showModal={toggleAvailabilityModal} title="Availability">
            <AvailabilityTable availability={psychologistAvailability} />
          </ModalAvailability>
        )}
        {showConfirmModal && (
          <Modal
            showModal={showConfirmModal}
            title="Do you want to proceed and delete this psychologist?"
            onClose={toggleConfirmModal}
            isLoading={isLoading}
            onConfirm={() => {
              dispatch(deletePsychologist(idToDelete)).then(() => {
                setIdToDelete();
                setShowConfirmModal(false);
              });
            }}
          />
        )}
        {showError && (
          <Modal toggleModal={() => setShowError(!showError)}>
            <div>{error}</div>
          </Modal>
        )}
      </div>
    </section>
  );
}

export default Psychologists;
