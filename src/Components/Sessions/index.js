import { useEffect, useState } from 'react';
import Modal from './Modal';
import styles from './sessions.module.css';

function Sessions() {
  const [showModal, setShowModal] = useState(false);
  const [sessions, saveSessions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(undefined);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/sessions`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => saveSessions(response.data))
      .catch((error) => setError(error.toString()))
      .finally(() => setLoading(false));
  }, []);

  const redirectToForm = (session) => {
    session
      ? (window.location.href = `${window.location.pathname}/form?id=${session}`)
      : (window.location.href = `${window.location.pathname}/form`);
  };

  const handleDelete = (event, session) => {
    event.stopPropagation();
    setSelectedItem(session._id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(undefined);
  };

  const deleteSession = () => {
    setLoading(true);
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
          .then((response) => {
            saveSessions(response.data);
            closeModal();
          });
      })
      .catch((error) => setError(error.toString()))
      .finally(() => setLoading(false));
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
      <h2>Sessions</h2>
      <div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Postulant</th>
              <th>Psychologist</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => {
              return (
                <tr key={session._id} onClick={() => redirectToForm(session._id)}>
                  <td>
                    {session.postulant?.firstName || '-'}
                    {session.postulant?.lastName || '-'}
                  </td>
                  <td>
                    {session.psychologist?.firstName || '-'}
                    {session.psychologist?.lastName || '-'}
                  </td>
                  <td>{session.date.replace('T', ' ')}</td>
                  <td>{session.status}</td>
                  <td>
                    <button type="delete" onClick={(event) => handleDelete(event, session)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={styles.error}>{error}</div>
      <button
        type="add"
        className={styles.button}
        disabled={isLoading}
        onClick={() => redirectToForm()}
      >
        Add Session
      </button>
    </section>
  );
}
export default Sessions;
