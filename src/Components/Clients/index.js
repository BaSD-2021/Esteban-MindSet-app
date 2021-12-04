import { useEffect, useState } from 'react';
import styles from './clients.module.css';
import Modal from '../Shared/Modal';
import { Link, useHistory } from 'react-router-dom';

function Clients() {
  const [showModal, setShowModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const [clients, setClients] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();

  const deleteClient = () => {
    setLoading(true);
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
        setLoading(false);
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
    setLoading(true);
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
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className={styles.container}>
      <h2 className={styles.subtitle}>Clients</h2>
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
                  <button
                    type="button"
                    onClick={(e) => {
                      preventAndShow(e, client._id);
                    }}
                    className={styles.buttonDelete}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.errorMessage}>{errorMessage.message}</div>
      <Modal
        showModal={showModal}
        title="Do you want to proceed and delete this Client?"
        onClose={closeModal}
        isLoading={isLoading}
        onConfirm={deleteClient}
      />
      <Link to="/Clients/Form" className={styles.buttonCreate}>
        ADD CLIENT
      </Link>
    </section>
  );
}

export default Clients;
