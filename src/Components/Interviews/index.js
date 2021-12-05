import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './list.module.css';
import Modal from '../Shared/Modal';

function Interviews() {
  const [showModal, setShowModal] = useState(false);
  const [interviews, saveInterviews] = useState([]);
  const [idToDelete, setIdToDelete] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();

  const deleteInterview = () => {
    setLoading(true);
    const url = `${process.env.REACT_APP_API}/interviews/${idToDelete}`;
    fetch(url, {
      method: 'DELETE'
    })
      .then(() => {
        fetch(`${process.env.REACT_APP_API}/interviews`)
          .then((response) => response.json())
          .then((response) => {
            saveInterviews(response.data);
            closeModal();
          })
          .catch((error) => {
            setErrorMessage(error);
          });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/interviews`)
      .then((response) => response.json())
      .then((response) => {
        saveInterviews(response.data);
      })
      .catch((error) => {
        setErrorMessage(error);
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
                onClick={() => history.push(`/interviews/form?_id=${interview._id}`)}
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
      <Modal
        showModal={showModal}
        title="Do you want to proceed and delete this Interview?"
        onClose={closeModal}
        isLoading={isLoading}
        onConfirm={deleteInterview}
      />
      <Link to="/Interviews/Form" className={styles.button}>
        ADD INTERVIEW
      </Link>
    </section>
  );
}

export default Interviews;
