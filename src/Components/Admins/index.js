import { useEffect, useState } from 'react';
import styles from './admins.module.css';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import { Link, useHistory } from 'react-router-dom';
import Table from '../Shared/Table/index';

const Admins = () => {
  const [showModal, setShowModal] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [adminToDelete, setAdminToDelete] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const [infoToShow, setInfoToShow] = useState([]);
  const [idToPass, setIdToPass] = useState([]);
  const columnName = ['Name', 'Username', 'Actions'];

  const getAdmins = () => {
    setIsLoading(true);
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
        setInformationToShow(response);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getAdmins();
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDelete = () => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API}/admins/${adminToDelete}`, { method: 'DELETE' })
      .then((response) => {
        if (response.status !== 204) {
          throw 'There was an error while deleting this admin.';
        }
        setAdminToDelete(false);
        getAdmins();
        closeModal();
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const setInformationToShow = (data) => {
    const idToPass = [];
    const dataToPass = [];
    data.data.map((row) => {
      idToPass.push(row._id);
      dataToPass.push([row.name ? row.name : '-', row.username ? row.username : '-']);
    });
    setInfoToShow(dataToPass);
    setIdToPass(idToPass);
  };

  const redirect = (id) => {
    history.push(`/admins/form?_id=${id}`);
  };

  const preventAndShow = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setAdminToDelete(id);
    setShowModal(true);
  };

  return (
    <section className={styles.container}>
      <Modal
        showModal={showModal}
        title="Are you sure you want to delete this Admin User?"
        onClose={closeModal}
        isLoading={isLoading}
        onConfirm={handleDelete}
      />
      <h2>Admins</h2>
      {isLoading ? (
        <p className={styles.loading}>On Loading ...</p>
      ) : (
        <Table
          columnsName={columnName}
          id={idToPass}
          tableInfo={infoToShow}
          deleteFunction={preventAndShow}
          redirectFunction={redirect}
        />
      )}
      {error && (
        <Modal>
          {error}
          <Button name="modalCancelButton" onClick={() => setError(false)}></Button>
        </Modal>
      )}
      <Link to="/admins/form">
        <Button name="addButton" entity="ADMIN" />
      </Link>
    </section>
  );
};

export default Admins;
