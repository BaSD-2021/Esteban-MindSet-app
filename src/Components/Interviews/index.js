import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './list.module.css';
import Modal from './Modal';
import Button from '../Shared/Button';

function Interviews() {
  const [showModal, setShowModal] = useState(false);
  const [interviews, saveInterviews] = useState([]);
  const [idToDelete, setIdToDelete] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorValue, setError] = useState('');
  const history = useHistory();

  const deleteInterview = (id) => {
    setIsLoading(true);
    const url = `${process.env.REACT_APP_API}/interviews/${id}`;
    fetch(url, {
      method: 'DELETE'
    }).then(() => {
      fetch(`${process.env.REACT_APP_API}/interviews`)
        .then((response) => response.json())
        .then((response) => {
          saveInterviews(response.data);
        })
        .catch((errorValue) => {
          setError(errorValue.toString());
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API}/interviews`)
      .then((response) => response.json())
      .then((response) => {
        saveInterviews(response.data);
      })
      .catch((errorValue) => {
        setError(errorValue.toString());
      })
      .finally(() => {
        setIsLoading(false);
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
      <Modal id={idToDelete} function={deleteInterview} show={showModal} closeModal={closeModal} />
      <Link to="/Interviews/Form" className={styles.button}>
        <Button name="addButton" entity="INTERVIEW" />
      </Link>
      <div className={styles.error}>{errorValue}</div>
    </section>
  );
}

export default Interviews;
