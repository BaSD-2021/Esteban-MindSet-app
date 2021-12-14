import styles from './psychologists.module.css';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import List from './List';
import Modal from '../Shared/Modal';
import ModalAvailability from './ModalAvailability';
import AvailabilityTable from './AvailabilityTable';
import { getPsychologists, deletePsychologist } from '../../redux/psychologists/thunks';
//import { cleanError } from '../../redux/psychologists/actions';

function Psychologists() {
  //const [psychologists, setPsychologist] = useState([]);
  const [idToDelete, setIdToDelete] = useState('');
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [psychologistAvailability, setPsychologistAvailability] = useState({});
  const [showError, setShowError] = useState(false);
  //const [error, setError] = useState('');
  //const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  const dispatch = useDispatch();

  const psychologists = useSelector((store) => store.psychologists.list);
  const error = useSelector((store) => store.psychologists.error);
  const isLoading = useSelector((store) => store.psychologists.isFetching);

  // useEffect(() => {
  //   getPsychologists();
  // }, []);

  useEffect(() => {
    if (!psychologists.length) {
      dispatch(getPsychologists());
    }
  }, [psychologists]);

  // const getPsychologists = () => {
  //   setIsLoading(true);
  //   fetch(`${process.env.REACT_APP_API}/psychologists`)
  //     .then((response) => response.json())
  //     .then((response) => {
  //       setPsychologist(response.data);
  //     })
  //     .catch(() => getError('There has been an error while retrieving psychologists'))
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // };

  // const getError = (error) => {
  //   setError(error);
  //   setShowError(true);
  // };

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

  // const handleDelete = () => {
  //   setIsLoading(true);
  //   const url = `${process.env.REACT_APP_API}/psychologists/${idToDelete}`;
  //   fetch(url, {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-type': 'application/json'
  //     }
  //   })
  //     .then((res) => {
  //       if (res.status !== 204) {
  //         return res.json().then((message) => {
  //           throw new Error(message);
  //         });
  //       }
  //       toggleConfirmModal();
  //       getPsychologists();
  //     })
  //     .catch((error) => error)
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // };

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
                setIdToDelete(undefined);
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
