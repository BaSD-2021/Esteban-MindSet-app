import { useEffect, useState } from 'react';
import styles from './applications.module.css';
import Modal from './Modal';

function Applications() {
  const [showModal, setShowModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const [applications, setApplications] = useState([]);

  const deleteApplication = (event, id) => {
    event.preventDefault();
    event.stopPropagation();
    const url = `${process.env.REACT_APP_API}/applications/${id}`;
    fetch(url, {
      method: 'DELETE'
    }).then(() => {
      fetch(`${process.env.REACT_APP_API}/applications`)
        .then((response) => response.json())
        .then((response) => {
          setApplications(response.data);
          window.location.href = `/applications`;
        });
    });
  };

  const goToForm = () => {
    window.location.href = `/applications/form`;
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
    fetch(`${process.env.REACT_APP_API}/applications`)
      .then((response) => response.json())
      .then((response) => {
        setApplications(response.data);
      });
  }, []);

  return (
    <section className={styles.container}>
      <h2 className={styles.subtitle}>Applications</h2>
      <table className={styles.tableData}>
        <thead className={styles.tableHeader}>
          <tr>
            <th>Job Description</th>
            <th>Postulant</th>
            <th>Interview</th>
            <th>Result</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => {
            return (
              <tr
                onClick={() => (window.location.href = `/applications/form?_id=${application._id}`)}
                key={application._id}
              >
                <td>
                  {application.positions.jobDescription
                    ? application.positions.jobDescription
                    : '-'}
                </td>
                <td>
                  {application.postulants
                    ? application.postulants.firstName + ' ' + application.postulants.lastName
                    : '-'}
                </td>
                <td>{application.interview ? application.interview.date.substr(0, 10) : '-'}</td>
                <td>{application.result ? application.result : '-'}</td>
                <td>
                  <button
                    type="button"
                    onClick={(e) => {
                      preventAndShow(e, application._id);
                    }}
                    className={styles.buttonDelete}
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
        id={idToDelete}
        function={deleteApplication}
        show={showModal}
        closeModal={closeModal}
      />
      <button type="button" onClick={goToForm} className={styles.buttonCreate}>
        Add application
      </button>
    </section>
  );
}

export default Applications;
