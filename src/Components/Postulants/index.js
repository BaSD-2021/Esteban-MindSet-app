import { useEffect, useState } from 'react';
import Button from '../Shared/Button';
import styles from './postulants.module.css';
import Modal from '../Shared/Modal';
import { useHistory } from 'react-router-dom';
import Table from '../Shared/Table';

function Postulants() {
  const [showModal, setShowModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const [showError, setShowError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [infoToShow, setInfoToShow] = useState([]);
  const [idToPass, setIdToPass] = useState([]);
  const history = useHistory();
  const columnName = ['First Name', 'Last Name', 'Email', 'Phone', 'Address', 'Actions'];

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API}/postulants`)
      .then((response) => response.json())
      .then((response) => {
        setInformationToShow(response.data);
      })
      .catch((err) => {
        setShowError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const deletePostulant = () => {
    setIsLoading(true);
    const url = `${process.env.REACT_APP_API}/postulants/${idToDelete}`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(() => {
        closeModal();
        history.go(0);
      })
      .catch((err) => {
        setShowError(err);
      })
      .finally(() => {
        setIsLoading(false);
        history.go(0);
      });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const preventAndShow = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setIdToDelete(id);
    setShowModal(true);
  };

  const redirect = (id) => {
    history.push(`/postulants/form?_id=${id}`);
  };

  const setInformationToShow = (data) => {
    const idToPass = [];
    const dataToPass = [];
    data.map((row) => {
      idToPass.push(row._id);
      dataToPass.push([
        row.firstName ? row.firstName : '-',
        row.lastName ? row.lastName : '-',
        row.email ? row.email : '-',
        row.phone ? row.phone : '-',
        row.address ? row.address : '-'
      ]);
    });
    setInfoToShow(dataToPass);
    setIdToPass(idToPass);
  };

  return (
    <section className={styles.container}>
      <Modal
        showModal={showModal}
        title="Do you want to proceed and delete this Postulant?"
        onClose={closeModal}
        isLoading={isLoading}
        onConfirm={deletePostulant}
      />
      <h2 className={styles.title}>Postulants</h2>
      {isLoading ? (
        <p className={styles.loading}>On Loading ...</p>
      ) : (
        <Table
          columnsName={columnName}
          id={idToPass}
          tableInfo={infoToShow}
          deleteFunction={preventAndShow}
          redirectFunction={redirect}
        />
      )}
      <div className={styles.showError}>{showError.message}</div>
      <div className={styles.buttonContainer}>
        <Button
          label="ADD POSTULANT"
          type="button"
          theme="primary"
          onClick={() => history.push('/postulants/form')}
        />
      </div>
    </section>
  );
}

export default Postulants;
