import { useEffect, useState } from 'react';
import styles from './list.module.css';
import Modal from './Modal';

function Positions() {
  const [showModal, setShowModal] = useState(false);
  const [positions, savePositions] = useState([]);
  const [idToDelete, setIdToDelete] = useState('');
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
        });
    });
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/positions`)
      .then((response) => response.json())
      .then((response) => {
        savePositions(response.data);
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
                <td>
                  <button
                    type="button"
                    onClick={(e) => {
                      preventAndShow(e, position._id);
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
      <Modal id={idToDelete} function={deletePosition} show={showModal} closeModal={closeModal} />
      <button type="button" onClick={goToForm}>
        Add position
      </button>
    </section>
  );
}

export default Positions;
