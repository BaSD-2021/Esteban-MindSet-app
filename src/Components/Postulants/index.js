import { useEffect, useState } from 'react';
import Button from '../Shared/Button';
import styles from './postulants.module.css';
import Modal from '../Shared/Modal';
import ErrorModal from '../Shared/ErrorModal';
import { Link, useHistory } from 'react-router-dom';

function Postulants() {
  const [showModal, setShowModal] = useState(false);
  const [postulants, setPostulants] = useState([]);
  const [idToDelete, setIdToDelete] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API}/postulants`)
      .then((response) => response.json())
      .then((response) => {
        setPostulants(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const deletePostulant = () => {
    setIsLoading(true);
    const url = `${process.env.REACT_APP_API}/postulants/${idToDelete}`;
    fetch(url, {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' }
    })
      .then((response) => {
        if (response.status !== 204) {
          throw 'There was an error while deleting this postulant.';
        }
        closeModal();
        history.go(0);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

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
        title="Do you want to proceed and delete this Postulant?"
        onClose={closeModal}
        isLoading={isLoading}
        onConfirm={deletePostulant}
      />
      <h2>Postulants</h2>
      {isLoading ? (
        <p className={styles.loading}>On Loading ...</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          {postulants.map((postulant) => {
            return (
              <tbody key={postulant._id}>
                <tr>
                  <td>
                    <Link to={`/postulants/form?_id=${postulant._id}`}>{postulant.firstName}</Link>
                  </td>
                  <td>
                    <Link to={`/postulants/form?_id=${postulant._id}`}>{postulant.lastName}</Link>
                  </td>
                  <td>
                    <Link to={`/postulants/form?_id=${postulant._id}`}>{postulant.email}</Link>
                  </td>
                  <td>
                    <Link to={`/postulants/form?_id=${postulant._id}`}>{postulant.phone}</Link>
                  </td>
                  <td>
                    <Link to={`/postulants/form?_id=${postulant._id}`}>{postulant.address}</Link>
                  </td>
                  <td>
                    <Button
                      name="deleteButton"
                      onClick={(e) => {
                        preventAndShow(e, postulant._id);
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            );
          })}
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
      <Link to="/Postulants/Form" className={styles.button}>
        <Button name="addButton" entity="POSTULANT" />
      </Link>
    </section>
  );
}

export default Postulants;
