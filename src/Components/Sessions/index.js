import { useEffect, useState } from 'react';
import Modal from './Modal';
import styles from './sessions.module.css';
import Button from '../Shared/Button';
import { Link, useHistory } from 'react-router-dom';

function Sessions() {
  const [showModal, setShowModal] = useState(false);
  const [sessions, saveSessions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(undefined);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

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
      .then((response) => saveSessions(response.data))
      .catch((error) => setError(error.toString()))
      .finally(() => setIsLoading(false));
  }, []);

  const redirectToForm = (session) => {
    session ? history.push(`/Sessions/form?id=${session}`) : history.push(`/Sessions/Form`);
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
          .then((response) => {
            saveSessions(response.data);
            closeModal();
          });
      })
      .catch((error) => setError(error.toString()))
      .finally(() => setIsLoading(false));
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
                      <Button
                        name="deleteButton"
                        onClick={(event) => handleDelete(event, session)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <div className={styles.error}>{error}</div>
      <div className={styles.buttonContainer}>
        <Link to="/Sessions/Form" className={styles.button}>
          <Button name="addButton" entity="SESSION" />
        </Link>
      </div>
    </section>
  );
}
export default Sessions;
