import { useEffect, useState } from 'react';
import styles from './list.module.css';
import Modal from './Modal';

function Interviews() {
  const [showModal, setShowModal] = useState(false);
  const [interviews, saveInterviews] = useState([]);
  const [idToDelete, setIdToDelete] = useState('');
  const goToForm = () => {
    window.location.href = `/interviews/form`;
  };

  const deleteInterview = (id) => {
    const url = `${process.env.REACT_APP_API}/interviews/${id}`;
    fetch(url, {
      method: 'DELETE'
    }).then(() => {
      fetch(`${process.env.REACT_APP_API}/interviews`)
        .then((response) => response.json())
        .then((response) => {
          saveInterviews(response.data);
        })
        .catch((error) => {
          console.log('err', error);
        });
    });
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/interviews`)
      .then((response) => response.json())
      .then((response) => {
        saveInterviews(response.data);
      })
      .catch((error) => {
        console.log('err', error);
      });
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  const preventAndShow = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setIdToDelete(id);
    setShowModal(true);
  };

  return (
    <section className={styles.container}>
      <h2>Interviews</h2>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <td className={styles.td}>Postulant</td>
            <td className={styles.td}>Client</td>
            <td className={styles.td}>Status</td>
            <td className={styles.td}>Date</td>
            <td className={styles.td}>Delete</td>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {interviews.map((interview) => {
            return (
              <tr
                onClick={() => (window.location.href = `/interviews/form?_id=${interview._id}`)}
                key={interview._id}
              >
                <td className={styles.td}>{interview.postulant?.firstName || '-'}</td>
                <td className={styles.td}>{interview.client?.name || '-'}</td>
                <td className={styles.td}>{interview.status}</td>
                <td className={styles.td}>{interview.date}</td>
                <td className={styles.td}>
                  <button
                    type="button"
                    onClick={(e) => {
                      preventAndShow(e, interview._id);
                    }}
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal id={idToDelete} function={deleteInterview} show={showModal} closeModal={closeModal} />
      <button type="button" onClick={goToForm} className={styles.button}>
        Add interview
      </button>
    </section>
  );
}

export default Interviews;
