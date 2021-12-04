import { useEffect, useState } from 'react';
import styles from './clients.module.css';
import Modal from './Modal';
import { Link, useHistory } from 'react-router-dom';

function Clients() {
  const [showModal, setShowModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const [clients, setClients] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const deleteClient = (event, id) => {
    const url = `${process.env.REACT_APP_API}/clients/${id}`;
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
          });
      })
      .catch((err) => {
        setErrorMessage(err);
      })
      .finally(() => {
        closeModal();
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
      });
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
      <Modal id={idToDelete} function={deleteClient} show={showModal} closeModal={closeModal} />
      <Link to="/Clients/Form" className={styles.buttonCreate}>
        ADD CLIENT
      </Link>
    </section>
  );
}

export default Clients;
