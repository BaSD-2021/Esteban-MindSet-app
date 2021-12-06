import { useEffect, useState } from 'react';
import styles from './list.module.css';
import Modal from '../Shared/Modal';
import ErrorModal from '../Shared/ErrorModal';
import Button from '../Shared/Button';
import { Link, useHistory } from 'react-router-dom';

function Positions() {
  const [showModal, setShowModal] = useState(false);
  const [positions, savePositions] = useState([]);
  const [idToDelete, setIdToDelete] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  const deletePosition = () => {
    setIsLoading(true);
    const url = `${process.env.REACT_APP_API}/positions/${idToDelete}`;
    fetch(url, {
      method: 'DELETE'
    }).then(() => {
      fetch(`${process.env.REACT_APP_API}/positions`)
        .then((response) => {
          if (response.status !== 204) {
            throw 'There was an error while deleting this position.';
          }
          savePositions(response.data);
          closeModal();
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  };
  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API}/positions`)
      .then((response) => response.json())
      .then((response) => {
        savePositions(response.data);
      })
      .catch((error) => {
        setError(error.toString());
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };
  const closeErrModal = () => {
    setError(false);
  };

  const preventAndShow = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setIdToDelete(id);
    setShowModal(true);
  };

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
      {isLoading ? (
        <p className={styles.loading}>On Loading ...</p>
      ) : (
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
                    <Button
                      name="deleteButton"
                      onClick={(e) => {
                        preventAndShow(e, position._id);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {error && (
        <ErrorModal
          message={error}
          onClose={() => {
            closeErrModal(), closeModal();
          }}
        />
      )}
      <Link to="/Positions/Form" className={styles.button}>
        <Button name="addButton" entity="POSITION" />
      </Link>
    </section>
  );
}

export default Positions;
