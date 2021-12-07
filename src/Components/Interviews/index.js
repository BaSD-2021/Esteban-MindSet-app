import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './list.module.css';
import Modal from '../Shared/Modal';
import ErrorModal from '../Shared/ErrorModal';
import Button from '../Shared/Button';

function Interviews() {
  const [showModal, setShowModal] = useState(false);
  const [interviews, saveInterviews] = useState([]);
  const [idToDelete, setIdToDelete] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const deleteInterview = () => {
    setIsLoading(true);
    const url = `${process.env.REACT_APP_API}/interviews/${idToDelete}`;
    fetch(url, {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' }
    })
      .then((response) => {
        if (response.status !== 204) {
          throw 'There was an error while deleting this interview.';
        }
        saveInterviews(response.data);
        closeModal();
      })
      .catch((error) => {
        setErrorMessage(error);
      })
      .finally(() => {
        setIsLoading(false);
        history.go(0);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API}/interviews`)
      .then((response) => response.json())
      .then((response) => {
        saveInterviews(response.data);
      })
      .catch((error) => {
        setErrorMessage(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };
  const closeErrModal = () => {
    setErrorMessage(false);
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
      {isLoading ? (
        <p className={styles.loading}>On Loading ...</p>
      ) : (
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
                    <Button
                      name="deleteButton"
                      onClick={(e) => {
                        preventAndShow(e, interview._id);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <Modal
        showModal={showModal}
        title="Do you want to proceed and delete this Interview?"
        onClose={closeModal}
        isLoading={isLoading}
        onConfirm={deleteInterview}
      />
      {errorMessage && (
        <ErrorModal
          message={errorMessage}
          onClose={() => {
            closeErrModal(), closeModal();
          }}
        />
      )}
      <Link to="/Interviews/Form" className={styles.button}>
        <Button name="addButton" entity="INTERVIEW" />
      </Link>
    </section>
  );
}

export default Interviews;
