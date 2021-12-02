import { useEffect, useState } from 'react';
import styles from './list.module.css';
import Modal from './Modal';

function Positions() {
  const [showModal, setShowModal] = useState(false);
  const [positions, savePositions] = useState([]);
  const [idToDelete, setIdToDelete] = useState('');
  const [errorValue, setError] = useState('');
  const goToForm = () => {
    window.location.href = `/positions/form`;
  };

  const deletePosition = (id) => {
    const url = `${process.env.REACT_APP_API}/positions/${id}`;
    fetch(url, {
      method: 'DELETE'
    }).then(() => {
      fetch(`${process.env.REACT_APP_API}/positions`)
        .then((response) => response.json())
        .then((response) => {
          savePositions(response.data);
        })
        .catch((errorValue) => {
          setError(errorValue.toString());
        });
    });
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/positions`)
      .then((response) => response.json())
      .then((response) => {
        savePositions(response.data);
      })
      .catch((errorValue) => {
        setError(errorValue.toString());
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
      <h2>Positions</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Client</td>
            <td>Job Description</td>
            <td>Vacancy</td>
            <td>Professional profile</td>
            <td>Is Open</td>
            <td>Delete</td>
          </tr>
        </thead>
        <tbody>
          {positions.map((position) => {
            return (
              <tr
                onClick={() => (window.location.href = `/positions/form?_id=${position._id}`)}
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
      <Modal id={idToDelete} function={deletePosition} show={showModal} closeModal={closeModal} />
      <button type="button" onClick={goToForm} className={styles.button}>
        Add position
      </button>
      <div className={styles.error}>{errorValue}</div>
    </section>
  );
}

export default Positions;
