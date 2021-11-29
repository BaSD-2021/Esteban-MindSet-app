import { useEffect, useState } from 'react';
import Modal from './Modal';
import styles from './sessions.module.css';

function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(undefined);
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
      .then((response) => setSessions(response.data))
      .catch((error) => setError(error.toString()))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (event, session) => {
    event.stopPropagation();
    setSelectedSession(session._id);
    setShowModal(true);
  };

  const showForm = (session) => {
    if (session) {
      window.location.href = `sessions/form?id=${session._id}`;
    } else {
      window.location.href = `sessions/form`;
    }
  };

  const deleteSession = () => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/sessions/${selectedSession}`, { method: 'DELETE' })
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
            setSessions(response.data);
            closeModal();
          });
      })
      .catch((error) => setError(error.toString()))
      .finally(() => setLoading(false));
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedSession(undefined);
  };

  return (
    <section className={styles.container}>
      <Modal
        show={showModal}
        title="Are you sure you want to delete this session?"
        onCancel={closeModal}
        isLoading={isLoading}
        onConfirm={deleteSession}
      />
      <h2>Sessions</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>postulant</th>
            <th>psychologist</th>
            <th>date</th>
            <th>status</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr key={session._id} onClick={() => showForm(session)}>
              <td>
                {`${session.postulant?.firstName || ''} ${session.postulant?.lastName || ''}`}
              </td>
              <td>
                {`${session.psychologist?.firstName || ''} ${session.psychologist?.lastName || ''}`}
              </td>
              <td>{session.date.replace('T', ' ')}</td>
              <td>{session.status}</td>
              <td>
                <button onClick={(event) => handleDelete(event, session)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.error}>{error}</div>
      <button disabled={isLoading} className={styles.button} onClick={() => showForm()}>
        Add new Session
      </button>
    </section>
  );
}

export default Sessions;
