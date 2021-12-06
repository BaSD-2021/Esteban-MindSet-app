import { useEffect, useState } from 'react';
import Modal from '../Shared/Modal';
import styles from './profiles.module.css';
import Button from '../Shared/Button';
import { Link, useHistory } from 'react-router-dom';

function Profiles() {
  const [showModal, setShowModal] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [selectedItem, setSelectedItem] = useState(undefined);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API}/profiles`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => setProfiles(response.data))
      .catch((error) => setError(error.toString()))
      .finally(() => setIsLoading(false));
  }, []);

  const redirectToForm = (profile) => {
    profile ? history.push(`/profiles/form?_id=${profile}`) : history.push(`/profiles/form`);
  };

  const handleDelete = (event, profile) => {
    event.stopPropagation();
    setSelectedItem(profile._id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(undefined);
  };

  const deleteProfile = () => {
    setIsLoading(true);
    const url = `${process.env.REACT_APP_API}/profiles/${selectedItem}`;
    fetch(url, { method: 'DELETE' })
      .then((response) => {
        if (response.status !== 204) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return fetch(`${process.env.REACT_APP_API}/profiles`)
          .then((response) => {
            if (response.status !== 200) {
              return response.json().then(({ message }) => {
                throw new Error(message);
              });
            }
            return response.json();
          })
          .then((response) => {
            setProfiles(response.data);
            closeModal();
          });
      })
      .catch((error) => setError(error.toString()))
      .finally(() => setIsLoading(false));
  };

  return (
    <section className={styles.container}>
      <Modal
        showModal={showModal}
        title="Do you want to proceed and delete this profile?"
        onClose={closeModal}
        isLoading={isLoading}
        onConfirm={deleteProfile}
      />
      <h2 className={styles.title}>Profiles</h2>
      <div>
        {isLoading ? (
          <p className={styles.loading}>On Loading ...</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((profile) => {
                return (
                  <tr key={profile._id} onClick={() => redirectToForm(profile._id)}>
                    <td>{profile.name}</td>
                    <td>
                      <Button
                        name="deleteButton"
                        onClick={(event) => handleDelete(event, profile)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <div className={styles.error}>{error}</div>
      <div className={styles.buttonContainer}>
        <Link to="/Profiles/Form">
          <Button name="addButton" entity="PROFILE" />
        </Link>
      </div>
    </section>
  );
}

export default Profiles;
