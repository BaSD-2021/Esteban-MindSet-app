import { useEffect, useState } from 'react';
import styles from './applications.module.css';
import Modal from './Modal';
import { Link, useHistory } from 'react-router-dom';

function Applications() {
  const [showModal, setShowModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const [applications, setApplications] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  const deleteApplication = (id) => {
    setIsLoading(true);
    const url = `${process.env.REACT_APP_API}/applications/${id}`;
    fetch(url, {
      method: 'DELETE'
    })
      .then(() => {
        fetch(`${process.env.REACT_APP_API}/applications`)
          .then((response) => {
            if (response.status !== 200) {
              return response.json().then(({ message }) => {
                throw new Error(message);
              });
            }
            return response.json();
          })
          .then((response) => {
            setApplications(response.data);
          })
          .catch((error) => {
            setErrorMessage(error);
          });
      })
      .finally(() => {
        closeModal();
        setIsLoading(false);
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
    fetch(`${process.env.REACT_APP_API}/applications`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        setApplications(response.data);
      })
      .catch((error) => {
        setErrorMessage(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <section className={styles.container}>
      <h2 className={styles.subtitle}>Applications</h2>
      {isLoading ? (
        <p className={styles.loading}>On Loading ...</p>
      ) : (
        <table className={styles.tableData}>
          <thead className={styles.tableHeader}>
            <tr className={styles.trStyles}>
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
                  onClick={() => history.push(`/applications/form?_id=${application._id}`)}
                  key={application._id}
                  className={styles.trStyles}
                >
                  <td className={styles.tdStyles}>
                    {application.positions ? application.positions.jobDescription : '-'}
                  </td>
                  <td className={styles.tdStyles}>
                    {application.postulants
                      ? application.postulants.firstName + ' ' + application.postulants.lastName
                      : '-'}
                  </td>
                  <td className={styles.tdStyles}>
                    {application.interview ? application.interview.date.substr(0, 10) : '-'}
                  </td>
                  <td className={styles.tdStyles}>
                    {application.result ? application.result : '-'}
                  </td>
                  <td className={styles.tdStyles}>
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
      )}
      <div id="error_message" className={styles.errorMessage}>
        {errorMessage.message}
      </div>
      <Modal
        id={idToDelete}
        function={deleteApplication}
        show={showModal}
        closeModal={closeModal}
      />
      <Link to="/Applications/Form" className={styles.buttonCreate}>
        ADD APPLICATION
      </Link>
    </section>
  );
}

export default Applications;
