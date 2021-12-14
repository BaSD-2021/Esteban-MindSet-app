import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Shared/Button';
import styles from './postulants.module.css';
import Modal from '../Shared/Modal';
import { useHistory } from 'react-router-dom';
import Table from '../Shared/TableV2';
import { clearPostulant, clearError } from '../../redux/postulants/actions';
import { getPostulants, deletePostulant } from '../../redux/postulants/thunks';

function Postulants() {
  const [showModal, setShowModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const history = useHistory();
  const columns = [
    {
      name: 'First Name',
      value: 'firstName'
    },
    {
      name: 'Last Name',
      value: 'lastName'
    },
    {
      name: 'Email',
      value: 'email'
    },
    {
      name: 'Phone',
      value: 'phone'
    },
    {
      name: 'Address',
      value: 'address'
    }
  ];
  const actions = [
    {
      text: 'Delete',
      callback: (e, item) => {
        e.stopPropagation();
        setIdToDelete(item._id);
        setShowModal(true);
      }
    }
  ];
  const dispatch = useDispatch();
  const postulants = useSelector((store) => store.postulants.list);
  const isLoading = useSelector((store) => store.postulants.isLoading);
  const error = useSelector((store) => store.postulants.error);

  useEffect(() => {
    if (!postulants.length) {
      dispatch(getPostulants());
    }
  }, [postulants]);

  const redirectUpdate = (postulant) => {
    history.push(`/postulants/form?_id=${postulant._id}`);
  };

  const setInformationToShow = () => {
    return postulants.map((row) => {
      return {
        _id: row._id,
        firstName: row.firstName ? row.firstName : '-',
        lastName: row.lastName ? row.lastName : '-',
        email: row.email ? row.email : '-',
        phone: row.phone ? row.phone : '-',
        address: row.address ? row.address : '-'
      };
    });
  };

  const redirectAdd = () => {
    dispatch(clearPostulant());
    history.push('/postulants/form');
  };

  const handleDeletePostulant = () => {
    dispatch(deletePostulant(idToDelete));
    setShowModal(false);
  };

  return (
    <section className={styles.container}>
      <Modal
        show={showModal}
        message="Do you want to proceed and delete this Postulant?"
        title="Delete Postulant"
        cancel={{
          text: 'Cancel',
          disable: false,
          callback: () => setShowModal(false)
        }}
        confirm={{
          text: 'Confirm',
          disable: false,
          callback: handleDeletePostulant
        }}
      />
      <Modal
        show={!!error}
        title="Error"
        message={error}
        cancel={{
          text: 'Close',
          callback: () => dispatch(clearError())
        }}
      />
      <h2 className={styles.title}>Postulants</h2>
      {isLoading ? (
        <p className={styles.loading}>On Loading ...</p>
      ) : (
        <Table
          actions={actions}
          columns={columns}
          data={setInformationToShow()}
          onRowClick={redirectUpdate}
        />
      )}
      <div className={styles.buttonContainer}>
        <Button label="ADD POSTULANT" onClick={redirectAdd} />
      </div>
    </section>
  );
}

export default Postulants;
