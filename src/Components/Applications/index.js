import { useEffect, useState } from 'react';
import styles from './applications.module.css';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import { Link, useHistory } from 'react-router-dom';
import Table from '../Shared/Table/index';

function Applications() {
  const [showModal, setShowModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const [infoToShow, setInfoToShow] = useState([]);
  const [idToPass, setIdToPass] = useState([]);

  const columnName = ['Job Description', 'Postulant', 'Interview', 'Result', 'Actions'];

  const deleteApplication = () => {
    setIsLoading(true);
    const url = `${process.env.REACT_APP_API}/applications/${idToDelete}`;
    fetch(url, {
      method: 'DELETE'
    })
      .then(() => {
        fetch(`${process.env.REACT_APP_API}/applications`)
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

  const closeModal = () => {
    setShowModal(false);
  };

  const preventAndShow = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setIdToDelete(id);
    setShowModal(true);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/applications`)
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
      .catch((error) => {
        setErrorMessage(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const setInformationToShow = (data) => {
    const dataToPass = [];
    const idToPass = [];
    data.map((row) => {
      idToPass.push(row._id);
      dataToPass.push([
        row.positions ? row.positions.jobDescription : '-',
        row.postulants ? row.postulants.firstName + ' ' + row.postulants?.lastName : '-',
        row.interview ? row.interview.date.slice(0, 10) : '-',
        row.result ? row.result : '-'
      ]);
    });
    setInfoToShow(dataToPass);
    setIdToPass(idToPass);
  };

  const redirect = (id) => {
    history.push(`/applications/form?_id=${id}`);
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Applications</h2>
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
      <div id="error_message" className={styles.errorMessage}>
        {errorMessage.message}
      </div>
      <Modal
        showModal={showModal}
        title="Do you want to proceed and delete this application?"
        onClose={closeModal}
        isLoading={isLoading}
        onConfirm={deleteApplication}
      />
      <div className={styles.buttonContainer}>
        <Link to="/Applications/Form">
          <Button name="addButton" entity="APPLICATION" />
        </Link>
      </div>
    </section>
  );
}

export default Applications;
