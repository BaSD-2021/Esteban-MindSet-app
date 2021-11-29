import { useEffect, useState } from 'react';
//import Modal from './Modal';
import styles from './sessions.module.css';

function Sessions() {
  // const [showModal, setShowModal] = useState(false);
  const [sessions, saveSessions] = useState([]);
  // const [selectedItem, setSelectedItem] = useState({});

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/sessions`)
      .then((response) => response.json())
      .then((response) => {
        saveSessions(response.data);
      });
  }, []);

  // const closeModal = () => {
  //   setShowModal(false);
  // };

  const deleteSession = (event, id) => {
    event.preventDefault(event);

    const url = `${process.env.REACT_APP_API}/sessions/${id}`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    }).then(() => {
      window.location.href = `${window.location.origin}/sessions`;
    });
  };

  const redirectToForm = (sessionId) => {
    sessionId
      ? (window.location.href = `${window.location.pathname}/form?_id=${sessionId}`)
      : (window.location.href = `${window.location.pathname}/form`);
  };

  return (
    <section className={styles.container}>
      {/* <Modal
        showModal={showModal}
        closeModal={closeModal}
        deleteSession={deleteSession}
        itemSelected={selectedItem}
      /> */}
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
                  <td>{session.date}</td>
                  <td>{session.status}</td>
                  <td>
                    <button
                      type="delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSession(e, session._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <button type="add" onClick={() => redirectToForm(null)}>
        Add Session
      </button>
    </section>
  );
}
export default Sessions;
