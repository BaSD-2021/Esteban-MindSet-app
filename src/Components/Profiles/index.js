import { useEffect, useState } from 'react';
import Modal from '../Shared/Modal';
import styles from './profiles.module.css';
import Button from '../Shared/Button';
import { Link, useHistory } from 'react-router-dom';
import Table from '../Shared/Table';

function Profiles() {
  const [showModal, setShowModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [infoToShow, setInfoToShow] = useState([]);
  const [idToPass, setIdToPass] = useState([]);
  const history = useHistory();
  const columnName = ['Name', 'Actions'];

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API}/profiles`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        setInformationToShow(response.data);
      })
      .catch((error) => setError(error.toString()))
      .finally(() => setIsLoading(false));
  }, []);

  const redirectToForm = (profile) => {
    profile ? history.push(`/profiles/form?_id=${profile}`) : history.push(`/profiles/form`);
  };

  const closeModal = () => {
    setShowModal(false);
    setIdToDelete('');
  };

  const deleteProfile = () => {
    setIsLoading(true);
    const url = `${process.env.REACT_APP_API}/profiles/${idToDelete}`;
    fetch(url, { method: 'DELETE' })
      .then((response) => {
        if (response.status !== 204) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return fetch(`${process.env.REACT_APP_API}/profiles`)
          .then((response) => {
            if (response.status !== 200) {
              return response.json().then(({ message }) => {
                throw new Error(message);
              });
            }
            return response.json();
          })
          .then(() => {
            closeModal();
          });
      })
      .catch((error) => setError(error.toString()))
      .finally(() => {
        setIsLoading(false);
        history.go(0);
      });
  };

  const preventAndShow = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setIdToDelete(id);
    setShowModal(true);
  };

  const setInformationToShow = (data) => {
    const idToPass = [];
    const dataToPass = [];
    data.map((row) => {
      idToPass.push(row._id);
      dataToPass.push([row.name ? row.name : '-']);
    });
    setInfoToShow(dataToPass);
    setIdToPass(idToPass);
  };
  return (
    <section className={styles.container}>
      <Modal
        showModal={showModal}
        title="Do you want to proceed and delete this profile?"
        onClose={closeModal}
        isLoading={isLoading}
        onConfirm={deleteProfile}
      />
      <h2 className={styles.title}>Profiles</h2>
      <div>
        {isLoading ? (
          <p className={styles.loading}>On Loading ...</p>
        ) : (
          <Table
            columnsName={columnName}
            id={idToPass}
            tableInfo={infoToShow}
            deleteFunction={preventAndShow}
            redirectFunction={redirectToForm}
          />
        )}
      </div>
      <div className={styles.error}>{error}</div>
      <Link to="/Profiles/Form">
        <Button name="addButton" entity="PROFILE" />
      </Link>
    </section>
  );
}

export default Profiles;
