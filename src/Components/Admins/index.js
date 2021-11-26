import { useEffect, useState } from 'react';
import styles from './admins.module.css';

const Admins = () => {
  const [admins, setAdmins] = useState([]);

  console.log('admins', admins);

  const getAdmins = () => {
    fetch(`${process.env.REACT_APP_API}/admins`)
      .then((response) => response.json())
      .then((response) => {
        setAdmins(response.data);
      });
  };

  useEffect(() => {
    getAdmins();
  }, []);

  const updateAdmin = () => {
    window.location.pathname = `/admins/Form`;
  };

  const deleteAdmin = (id) => {
    fetch(`${process.env.REACT_APP_API}/admins/${id}`, { method: 'DELETE' }).then(() => {
      getAdmins();
    });
  };

  return (
    <section className={styles.container}>
      <h2>Admins</h2>
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
                <tr onClick={updateAdmin} key={index}>
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
    </section>
  );
};

export default Admins;
