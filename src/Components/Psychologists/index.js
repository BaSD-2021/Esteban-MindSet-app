import styles from './psychologists.module.css';
import { useState, useEffect } from 'react';
import List from './List';
import Form from './Form';
import Modal from '../Shared/Modal';
import ModalAvailability from './ModalAvailability';
import AvailabilityTable from './AvailabilityTable';
import { PSYCHOLOGIST_FORM, PSYCHOLOGIST_AVAILABILITY } from './utils/psychologist-inputs-utils';

const itemOnEditInitialState = {
  address: '',
  availability: {
    monday: {
      availability: false,
      from: 1200,
      to: 1200
    },
    tuesday: {
      availability: false,
      from: 1200,
      to: 1200
    },
    wednesday: {
      availability: false,
      from: 1200,
      to: 1200
    },
    thursday: {
      availability: false,
      from: 1200,
      to: 1200
    },
    friday: {
      availability: false,
      from: 1200,
      to: 1200
    },
    sunday: {
      availability: false,
      from: 1200,
      to: 1200
    },
    saturday: {
      availability: false,
      from: 1200,
      to: 1200
    }
  },
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  phone: '',
  username: ''
};

function Psychologists() {
  const [psychologists, setPsychologist] = useState([]);
  const [toggleForm, setToggleForm] = useState(false);
  const [itemOnEdit, setItemOnEdit] = useState(itemOnEditInitialState);
  const [isEditing, setIsEditing] = useState(false);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [psychologistAvailability, setPsychologistAvailability] = useState({});
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPsychologists();
  }, []);

  const getPsychologists = () => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API}/psychologists`)
      .then((response) => response.json())
      .then((response) => {
        setPsychologist(response.data);
      })
      .catch(() => getError('There has been an error while retrieving psychologists'))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getError = (error) => {
    setError(error);
    setShowError(true);
  };

  const toggleFormDisplay = () => {
    setToggleForm(!toggleForm);
    setItemOnEdit(itemOnEditInitialState);
  };

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
      setItemOnEdit(psychologist);
      setShowConfirmModal(true);
    } else {
      setItemOnEdit(itemOnEditInitialState);
      setShowConfirmModal(false);
    }
  };

  const handleEdit = (psychologist) => {
    toggleFormDisplay();
    setItemOnEdit(psychologist);
    setIsEditing(true);
  };

  const onChange = (e) => {
    if (e.target.name.match(/^(firstName|lastName|username|password|email|phone|address)$/)) {
      setItemOnEdit({
        ...itemOnEdit,
        [e.target.name]: e.target.value
      });
    } else {
      const keys = e.target.name.split('.');
      setItemOnEdit({
        ...itemOnEdit,
        availability: {
          ...itemOnEdit.availability,
          [keys[0]]: {
            ...itemOnEdit.availability[keys[0]],
            [keys[1]]: keys[1] === 'availability' ? e.target.checked : e.target.value
          }
        }
      });
    }
  };

  const handleSubmit = (item, e) => {
    e.preventDefault();

    const formattedAvailability = Object.keys(item.availability).reduce(
      (attrs, day) => ({
        ...attrs,
        [day]: Object.keys(item.availability[day]).reduce(
          (attrs, key) => ({
            ...attrs,
            [key]:
              key === 'availability'
                ? item.availability[day][key] === 'true'
                : parseInt(item.availability[day][key])
          }),
          {}
        )
      }),
      {}
    );
    const formattedPhone = parseInt(item.phone);

    let url;
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...item, phone: formattedPhone, availability: formattedAvailability })
    };
    if (isEditing) {
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API}/psychologists/${item._id}`;
    } else {
      options.method = 'POST';
      url = `${process.env.REACT_APP_API}/psychologists`;
    }

    fetch(url, options)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then(() => {
        getPsychologists();
        setToggleForm(!toggleForm);
      })
      .catch((error) => error)
      .finally(() => setIsEditing(false));
  };

  const handleDelete = () => {
    setIsLoading(true);
    const url = `${process.env.REACT_APP_API}/psychologists/${itemOnEdit._id}`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then((res) => {
        if (res.status !== 204) {
          return res.json().then((message) => {
            throw new Error(message);
          });
        }
        toggleConfirmModal();
        getPsychologists();
      })
      .catch((error) => error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Psychologists</h2>
      <div className={styles.formContainer}>
        {toggleForm ? (
          <Form
            inputs={PSYCHOLOGIST_FORM}
            availability={PSYCHOLOGIST_AVAILABILITY}
            toggleFormDisplay={toggleFormDisplay}
            itemOnEdit={itemOnEdit}
            onChange={onChange}
            handleSubmit={handleSubmit}
          />
        ) : isLoading ? (
          <p className={styles.loading}>On Loading ...</p>
        ) : (
          <List
            psychologists={psychologists}
            handleEdit={handleEdit}
            toggleFormDisplay={toggleFormDisplay}
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
            isLoading={isEditing}
            onConfirm={handleDelete}
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
