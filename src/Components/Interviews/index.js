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
    console.log('delete id', id);

    const url = `${process.env.REACT_APP_API}/interviews/${id}`;
    fetch(url, {
      method: 'DELETE'
    }).then(() => {
      fetch(`${process.env.REACT_APP_API}/interviews`)
        .then((response) => response.json())
        .then((response) => {
          saveInterviews(response.data);
        });
    });
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/interviews`)
      .then((response) => response.json())
      .then((response) => {
        saveInterviews(response.data);
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
        <thead>
          <tr>
            <td>Postulant</td>
            <td>Client</td>
            <td>Status</td>
            <td>Date</td>
            <td>Delete</td>
          </tr>
        </thead>
        <tbody>
          {interviews.map((interview) => {
            return (
              <tr
                onClick={() => (window.location.href = `/interviews/form?_id=${interview._id}`)}
                key={interview._id}
              >
                <td>{interview.postulant?.firstName || '-'}</td>
                <td>{interview.client?.name || '-'}</td>
                <td>{interview.status}</td>
                <td>{interview.date}</td>
                <td>
                  <button
                    type="button"
                    onClick={(e) => {
                      preventAndShow(e, interview._id);
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
      <Modal id={idToDelete} function={deleteInterview} show={showModal} closeModal={closeModal} />
      <button type="button" onClick={goToForm}>
        Add interview
      </button>
    </section>
  );
}

export default Interviews;
