import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './list.module.css';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import Table from '../Shared/Table';

function Interviews() {
  const [showModal, setShowModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [infoToShow, setInfoToShow] = useState([]);
  const [idToPass, setIdToPass] = useState([]);
  const history = useHistory();
  const columnName = ['Postulant', 'Client', 'Status', 'Date', 'Action'];

  const deleteInterview = () => {
    setIsLoading(true);
    const url = `${process.env.REACT_APP_API}/interviews/${idToDelete}`;
    fetch(url, {
      method: 'DELETE'
    })
      .then(() => {
        fetch(`${process.env.REACT_APP_API}/interviews`)
          .then((response) => response.json())
          .then(() => {
            closeModal();
          })
          .catch((error) => {
            setErrorMessage(error);
          });
      })
      .finally(() => {
        setIsLoading(false);
        history.go(0);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API}/interviews`)
      .then((response) => response.json())
      .then((response) => {
        setInformationToShow(response.data);
      })
      .catch((error) => {
        setErrorMessage(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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
    history.push(`/interviews/form?_id=${id}`);
  };

  const setInformationToShow = (data) => {
    const idToPass = [];
    const dataToPass = [];
    data.map((row) => {
      idToPass.push(row._id);
      dataToPass.push([
        row.postulant ? row.postulant.firstName + ' ' + row.postulant.lastName : '-',
        row.client ? row.client.name : '-',
        row.status ? row.status : '-',
        row.date ? row.date : '-'
      ]);
    });
    setInfoToShow(dataToPass);
    setIdToPass(idToPass);
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Interviews</h2>
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
      <Modal
        showModal={showModal}
        title="Do you want to proceed and delete this Interview?"
        onClose={closeModal}
        isLoading={isLoading}
        onConfirm={deleteInterview}
      />
      <div className={styles.buttonContainer}>
        <Link to="/Interviews/Form" className={styles.button}>
          <Button name="addButton" entity="INTERVIEW" />
        </Link>
      </div>
    </section>
  );
}

export default Interviews;
