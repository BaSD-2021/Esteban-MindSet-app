import { useEffect, useState } from 'react';
import Modal from './Modal';
import styles from './postulants.module.css';

function Postulants() {
  const [showModal, setShowModal] = useState(false);
  const [postulants, setPostulants] = useState([]);
  const [itemOnDelete, setItemOnDelete] = useState({});
  const [showError, setShowError] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/postulants`)
      .then((response) => response.json())
      .then((response) => {
        setPostulants(response.data);
      })
      .catch((err) => {
        setShowError(err);
      });
  }, []);

  const deletePostulant = (id) => {
    const url = `${process.env.REACT_APP_API}/postulants/${id}`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(() => {
        window.location.href = `${window.location.origin}/postulants`;
      })
      .catch((err) => {
        setShowError(err);
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
      <table className={styles.table}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Adress</th>
            <th>Actions</th>
          </tr>
        </thead>
        {postulants.map((postulant) => {
          return (
            <tbody key={postulant._id}>
              <tr>
                <td>
                  <a href={`/postulants/form?_id=${postulant._id}`}>{postulant.firstName}</a>
                </td>
                <td>
                  <a href={`/postulants/form?_id=${postulant._id}`}>{postulant.lastName}</a>
                </td>
                <td>
                  <a href={`/postulants/form?_id=${postulant._id}`}>{postulant.email}</a>
                </td>
                <td>
                  <a href={`/postulants/form?_id=${postulant._id}`}>{postulant.phone}</a>
                </td>
                <td>
                  <a href={`/postulants/form?_id=${postulant._id}`}>{postulant.address}</a>
                </td>
                <td>
                  <button
                    onClick={() => {
                      modalOpen(postulant);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
      <div className={styles.showError}>{showError.message}</div>
      <button
        onClick={() => {
          window.location.href = `${window.location.origin}/postulants/form`;
        }}
      >
        Create New Postulation
      </button>
    </section>
  );
}

export default Postulants;
