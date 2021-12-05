import { useEffect, useState } from 'react';
import Modal from './Modal';
import Button from '../Shared/Button';
import styles from './postulants.module.css';
import { Link, useHistory } from 'react-router-dom';

function Postulants() {
  const [showModal, setShowModal] = useState(false);
  const [postulants, setPostulants] = useState([]);
  const [itemOnDelete, setItemOnDelete] = useState({});
  const [showError, setShowError] = useState('');
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
        setShowError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const deletePostulant = (id) => {
    setIsLoading(true);
    const url = `${process.env.REACT_APP_API}/postulants/${id}`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(() => {
        history.push(`/postulants`);
      })
      .catch((err) => {
        setShowError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const modalOpen = (postulant) => {
    setShowModal(true);
    setItemOnDelete(postulant);
  };

  return (
    <section className={styles.container}>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        deletePostulant={deletePostulant}
        itemOnDelete={itemOnDelete}
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
                      onClick={() => {
                        modalOpen(postulant);
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      )}
      <div className={styles.showError}>{showError.message}</div>
      <Link to="/Postulants/Form" className={styles.button}>
        <Button name="addButton" entity="POSTULANT" />
      </Link>
    </section>
  );
}

export default Postulants;
