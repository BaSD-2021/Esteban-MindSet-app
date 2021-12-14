import { useEffect, useState } from 'react';
import styles from './clients.module.css';
import Modal from 'Components/Shared/Modal';
import Button from 'Components/Shared/Button';
import { useHistory } from 'react-router-dom';
import Table from 'Components/Shared/Table';

function Clients() {
  const [showModal, setShowModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const [infoToShow, setInfoToShow] = useState([]);
  const [idToPass, setIdToPass] = useState([]);
  const columnName = ['Name', 'Phone', 'Actions'];

  const deleteClient = () => {
    setIsLoading(true);
    const url = `${process.env.REACT_APP_API}/clients/${idToDelete}`;
    fetch(url, {
      method: 'DELETE'
    })
      .then(() => {
        fetch(`${process.env.REACT_APP_API}/clients`)
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
      .catch((err) => {
        setErrorMessage(err);
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
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API}/clients`)
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
      .catch((err) => {
        setErrorMessage(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const redirect = (id) => {
    history.push(`/admin/clients/form?_id=${id}`);
  };

  const setInformationToShow = (data) => {
    const idToPass = [];
    const dataToPass = [];
    data.map((row) => {
      idToPass.push(row._id);
      dataToPass.push([row.name ? row.name : '-', row.phone ? row.phone : '-']);
    });
    setInfoToShow(dataToPass);
    setIdToPass(idToPass);
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Clients</h2>
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
      <div className={styles.errorMessage}>{errorMessage.message}</div>
      <Modal
        showModal={showModal}
        title="Do you want to proceed and delete this Client?"
        onClose={closeModal}
        isLoading={isLoading}
        onConfirm={deleteClient}
      />
      <div className={styles.buttonContainer}>
        <Button label="ADD CLIENT" onClick={() => history.push('/admin/clients/form')} />
      </div>
    </section>
  );
}

export default Clients;
