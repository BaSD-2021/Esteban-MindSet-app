import { useEffect, useState } from 'react';
import Modal from 'Components/Shared/Modal';
import styles from './sessions.module.css';
import Button from 'Components/Shared/Button';
import { useHistory } from 'react-router-dom';
import Table from 'Components/Shared/Table';

function Sessions() {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(undefined);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [infoToShow, setInfoToShow] = useState([]);
  const [idToPass, setIdToPass] = useState([]);
  const history = useHistory();
  const columnName = ['Postulant', 'Psychologist', 'Date', 'Status', 'Action'];

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API}/sessions`)
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

  const redirectToForm = (session) => {
    session
      ? history.push(`/admin/sessions/form?id=${session}`)
      : history.push(`/admin/sessions/Form`);
  };

  const handleDelete = (event, session) => {
    event.stopPropagation();
    setSelectedItem(session);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(undefined);
  };

  const deleteSession = () => {
    setIsLoading(true);
    const url = `${process.env.REACT_APP_API}/sessions/${selectedItem}`;
    fetch(url, { method: 'DELETE' })
      .then((response) => {
        if (response.status !== 204) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return fetch(`${process.env.REACT_APP_API}/sessions`)
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

  const setInformationToShow = (data) => {
    const idToPass = [];
    const dataToPass = [];
    data.map((row) => {
      idToPass.push(row._id);
      dataToPass.push([
        row.postulant ? row.postulant.firstName + ' ' + row.postulant.lastName : '-',
        row.psychologist ? row.psychologist.firstName + ' ' + row.psychologist.lastName : '-',
        row.date ? row.date : '-',
        row.status ? row.status : '-'
      ]);
    });
    setInfoToShow(dataToPass);
    setIdToPass(idToPass);
  };

  return (
    <section className={styles.container}>
      <Modal
        showModal={showModal}
        title="Do you want to proceed and delete this session?"
        onClose={closeModal}
        isLoading={isLoading}
        onConfirm={deleteSession}
      />
      <h2 className={styles.title}>Sessions</h2>
      <div>
        {isLoading ? (
          <p className={styles.loading}>On Loading ...</p>
        ) : (
          <Table
            columnsName={columnName}
            id={idToPass}
            tableInfo={infoToShow}
            deleteFunction={handleDelete}
            redirectFunction={redirectToForm}
          />
        )}
      </div>
      <div className={styles.error}>{error}</div>
      <div className={styles.buttonContainer}>
        <Button label="ADD SESSION" onClick={() => history.push('/admin/sessions/form')} />
      </div>
    </section>
  );
}
export default Sessions;
