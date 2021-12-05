import { useEffect, useState } from 'react';
//import Modal from './Modal';
import Modal from '../Shared/Modal';
import styles from './postulants.module.css';
import { Link, useHistory } from 'react-router-dom';

function Postulants() {
  const [showModal, setShowModal] = useState(false);
  const [postulants, setPostulants] = useState([]);
  //const [itemOnDelete, setItemOnDelete] = useState({});
  const [idToDelete, setIdToDelete] = useState('');
  const [showError, setShowError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/postulants`)
      .then((response) => response.json())
      .then((response) => {
        setPostulants(response.data);
      })
      .catch((err) => {
        setShowError(err);
      })
      .finally(() => setLoading(false));
  }, []);

  const deletePostulant = () => {
    setLoading(true);
    const url = `${process.env.REACT_APP_API}/postulants/${idToDelete}`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(() => {
        history.push(`/postulants`);
        closeModal();
      })
      .catch((err) => {
        setShowError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const preventAndShow = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    //setItemOnDelete(id);
    setIdToDelete(id);
    setShowModal(true);
  };
  // const modalOpen = (postulant) => {
  //   setShowModal(true);
  //   setItemOnDelete(postulant);
  // };

  return (
    <section className={styles.container}>
      {/* <Modal
        showModal={showModal}
        closeModal={closeModal}
        deletePostulant={deletePostulant}
        itemOnDelete={itemOnDelete}
      /> */}
      <Modal
        showModal={showModal}
        title="Do you want to proceed and delete this Postulant?"
        onClose={closeModal}
        isLoading={isLoading}
        onConfirm={deletePostulant}
      />
      <h2>Postulants</h2>
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
                  <button
                    onClick={(e) => {
                      preventAndShow(e, postulant._id);
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
      <Link to="/Postulants/Form" className={styles.button}>
        Add Postulant
      </Link>
    </section>
  );
}

export default Postulants;
