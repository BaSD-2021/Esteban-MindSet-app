import { useEffect, useState } from 'react';
import styles from './clients.module.css';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import { Link, useHistory } from 'react-router-dom';

function Clients() {
  const [showModal, setShowModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const [clients, setClients] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

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
          .then((response) => {
            setClients(response.data);
            closeModal();
          });
      })
      .catch((err) => {
        setErrorMessage(err);
      })
      .finally(() => {
        setIsLoading(false);
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
        setClients(response.data);
      })
      .catch((err) => {
        setErrorMessage(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Clients</h2>
      {isLoading ? (
        <p className={styles.loading}>On Loading ...</p>
      ) : (
        <table className={styles.tableData}>
          <thead className={styles.tableHeader}>
            <tr className={styles.tdStyles}>
              <th>Name</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => {
              return (
                <tr
                  onClick={() => history.push(`/clients/form?_id=${client._id}`)}
                  key={client._id}
                  className={styles.trStyles}
                >
                  <td className={styles.tdStyles}>{client.name ? client.name : '-'}</td>
                  <td className={styles.tdStyles}>{client.phone ? client.phone : '-'}</td>
                  <td className={styles.tdStyles}>
                    <Button
                      name="deleteButton"
                      onClick={(e) => {
                        preventAndShow(e, client._id);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <div className={styles.errorMessage}>{errorMessage.message}</div>
      <Modal
        showModal={showModal}
        title="Do you want to proceed and delete this Client?"
        onClose={closeModal}
        isLoading={isLoading}
        onConfirm={deleteClient}
      />
      <Link to="/Clients/Form">
        <Button name="addButton" entity="CLIENT" />
      </Link>
    </section>
  );
}

export default Clients;
