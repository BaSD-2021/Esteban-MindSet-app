import { useEffect, useState } from 'react';
import styles from './admins.module.css';
import Modal from './modal/modal';

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [modal, setModal] = useState(false);

  console.log('admins', admins);

  const getAdmins = () => {
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
      .catch((error) => {
        console.log('err', error);
      });
  };

  useEffect(() => {
    getAdmins();
  }, []);

  const updateAdmin = (id) => {
    window.location.href = `/admins/form?_id=${id}`;
  };

  const deleteAdmin = (id) => {
    fetch(`${process.env.REACT_APP_API}/admins/${id}`, { method: 'DELETE' }).then(() => {
      setModal(true);
      getAdmins();
    });
  };

  const handleClose = () => {
    setModal(false);
  };

  return (
    <section className={styles.container}>
      <h2>Admins</h2>
      <a href="/admins/form" className={styles.btn}>
        ADD ADMIN
      </a>
      <div>
        <table>
          <thead>
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
                  <td>{admin.name}</td>
                  <td>{admin.username}</td>
                  <td>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteAdmin(admin._id);
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
      {modal && <Modal handleClose={handleClose} />}
    </section>
  );
};

export default Admins;
