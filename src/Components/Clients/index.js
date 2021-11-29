import { useEffect, useState } from 'react';
import styles from './clients.module.css';
import Modal from './Modal';

function Clients() {
  const [showModal, setShowModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const [clients, setClients] = useState([]);

  const deleteClient = (event, id) => {
    event.preventDefault();
    event.stopPropagation();
    const url = `${process.env.REACT_APP_API}/clients/${id}`;
    fetch(url, {
      method: 'DELETE'
    }).then(() => {
      fetch(`${process.env.REACT_APP_API}/clients`)
        .then((response) => response.json())
        .then((response) => {
          setClients(response.data);
          window.location.href = `/clients`;
        });
    });
  };

  const goToForm = () => {
    window.location.href = `/clients/form`;
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
      .then((response) => response.json())
      .then((response) => {
        setClients(response.data);
      });
  }, []);

  return (
    <section className={styles.container}>
      <h2 className={styles.subtitle}>Clients</h2>
      <table className={styles.tableData}>
        <thead className={styles.tableHeader}>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => {
            return (
              <tr
                onClick={() => (window.location.href = `/clients/form?_id=${client._id}`)}
                key={client._id}
              >
                <td>{client.name ? client.name : '-'}</td>
                <td>{client.phone ? client.phone : '-'}</td>
                <td>
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
      <Modal id={idToDelete} function={deleteClient} show={showModal} closeModal={closeModal} />
      <button type="button" onClick={goToForm} className={styles.buttonCreate}>
        Add client
      </button>
    </section>
  );
}

export default Clients;
