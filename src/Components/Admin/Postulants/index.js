import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './postulants.module.css';
import Modal from 'Components/Shared/Modal';
import { useHistory } from 'react-router-dom';
import Table from 'Components/Shared/Table';
import { cleanError } from 'redux/postulants/actions';
import { getPostulants } from 'redux/postulants/thunks';

function Postulants() {
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
    history.push(`/admin/postulants/form?_id=${postulant._id}`);
  };

  return (
    <section className={styles.container}>
      <Modal
        show={!!error}
        title="Error"
        message={error}
        cancel={{
          text: 'Close',
          callback: () => dispatch(cleanError())
        }}
      />
      <h2 className={styles.title}>Postulants</h2>
      {isLoading ? (
        <p className={styles.loading}>On Loading ...</p>
      ) : (
        <Table actions={[]} columns={columns} data={postulants} onRowClick={redirectUpdate} />
      )}
    </section>
  );
}

export default Postulants;
