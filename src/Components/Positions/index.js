import { useEffect, useState } from 'react';
import styles from './list.module.css';
import Modal from '../Shared/Modal';
import { Link, useHistory } from 'react-router-dom';

function Positions() {
  const [showModal, setShowModal] = useState(false);
  const [positions, savePositions] = useState([]);
  const [idToDelete, setIdToDelete] = useState('');
  const [errorValue, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();

  const deletePosition = () => {
    setLoading(true);
    const url = `${process.env.REACT_APP_API}/positions/${idToDelete}`;
    fetch(url, {
      method: 'DELETE'
    }).then(() => {
      fetch(`${process.env.REACT_APP_API}/positions`)
        .then((response) => response.json())
        .then((response) => {
          savePositions(response.data);
          closeModal();
        })
        .catch((errorValue) => {
          setError(errorValue.toString());
        })
        .finally(() => {
          setLoading(false);
        });
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
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/positions`)
      .then((response) => response.json())
      .then((response) => {
        savePositions(response.data);
      })
      .catch((errorValue) => {
        setError(errorValue.toString());
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className={styles.container}>
      <Modal
        showModal={showModal}
        title="Do you want to proceed and delete this position?"
        onClose={closeModal}
        isLoading={isLoading}
        onConfirm={deletePosition}
      />
      <h2>Positions</h2>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <td>Client</td>
            <td>Job Description</td>
            <td>Vacancy</td>
            <td>Professional profile</td>
            <td>Is Open</td>
            <td>Delete</td>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {positions.map((position) => {
            return (
              <tr
                onClick={() => history.push(`/positions/form?_id=${position._id}`)}
                key={position._id}
              >
                <td>{position.client?.name || '-'}</td>
                <td>{position.jobDescription}</td>
                <td>{position.vacancy}</td>
                <td>{position.professionalProfile?.name || '-'}</td>
                <td>{position.isOpen.toString()}</td>
                <td>
                  <button
                    type="button"
                    onClick={(e) => {
                      preventAndShow(e, position._id);
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
      <Link to="/Positions/Form" className={styles.button}>
        ADD POSITION
      </Link>
      <div className={styles.error}>{errorValue}</div>
    </section>
  );
}

export default Positions;
