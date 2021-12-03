import { useEffect, useState } from 'react';
import styles from './admins.module.css';
import Modal from './modal/modal';

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [adminToDelete, setAdminToDelete] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const getAdmins = () => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/admins`)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        setAdmins(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getAdmins();
  }, []);

  const updateAdmin = (id) => {
    window.location.href = `/admins/form?_id=${id}`;
  };

  const deleteAdmin = (admin) => {
    setAdminToDelete(admin);
  };

  const handleDelete = () => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/admins/${adminToDelete._id}`, { method: 'DELETE' })
      .then((response) => {
        if (response.status !== 204) {
          throw 'There was an error while deleting this admin.';
        }
        setAdminToDelete(false);
        getAdmins();
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className={styles.container}>
      <h2>Admins</h2>
      <a href="/admins/form" className={styles.button}>
        ADD ADMIN
      </a>
      {isLoading && 'Loading...'}
      <div>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th>Name</th>
              <th>User Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin, index) => {
              return (
                <tr onClick={() => updateAdmin(admin._id)} key={index}>
                  <td className={styles.tableRow}>{admin.name}</td>
                  <td className={styles.tableRow}>{admin.username}</td>
                  <td className={styles.tableRow}>
                    <button
                      className={styles.button}
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteAdmin(admin);
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
      </div>
      {adminToDelete && (
        <Modal>
          Are you sure you want to delete user: {adminToDelete.username}?
          <button className={styles.button} onClick={() => setAdminToDelete(false)}>
            Close
          </button>
          <button className={styles.button} disable={isLoading} onClick={handleDelete}>
            Delete
          </button>
        </Modal>
      )}
      {error && (
        <Modal>
          {error}
          <button className={styles.button} onClick={() => setError(false)}>
            Close
          </button>
        </Modal>
      )}
    </section>
  );
};

export default Admins;
