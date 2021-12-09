import { useEffect, useState } from 'react';
import styles from './admins.module.css';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import { useHistory } from 'react-router-dom';
import Table from '../Shared/Table/index';
import { useDispatch, useSelector } from 'react-redux';
import { getAdmins, deleteAdmin } from '../../redux/admins/thunks';
import { cleanError } from '../../redux/admins/actions';

const Admins = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedIdAdmin, setIdAdmin] = useState(false);

  const history = useHistory();

  // get the dispatcher to be able to dispatch Redux actions
  const dispatch = useDispatch();

  // get the Redux store values we need in the component
  const admins = useSelector((store) => store.admins.list);
  const error = useSelector((store) => store.admins.error);
  const isLoading = useSelector((store) => store.admins.isFetching);

  useEffect(() => {
    // get admins list when the list on Redux is empty
    if (!admins.length) {
      // Dispatch (execute) the async redux action to get the admin list
      dispatch(getAdmins());
    }
  }, [admins]);

  return (
    <section className={styles.container}>
      <Modal
        show={showModal}
        title="Are you sure you want to delete this Admin User?"
        isLoading={isLoading}
        cancel={{
          text: 'Cancel',
          callback: () => setShowModal(false)
        }}
        confirm={{
          text: 'Confirm',
          callback: () => {
            dispatch(deleteAdmin(selectedIdAdmin)).then(() => {
              setIdAdmin(undefined);
              setShowModal(false);
            });
          }
        }}
      />
      <Modal
        // The Error Modal is shown when an error exist in Redux
        show={!!error}
        title="Error"
        message={error}
        cancel={{
          text: 'Close',
          // Dispatch (execute) the cleanError action to remove the error in Redux
          // and hide the modal
          callback: () => dispatch(cleanError())
        }}
      />
      <h2 className={styles.title}>Admins</h2>
      {isLoading ? (
        <p className={styles.loading}>On Loading ...</p>
      ) : (
        <Table
          columns={[
            { name: 'Name', value: 'name' },
            { name: 'Username', value: 'username' }
          ]}
          data={admins}
          onRowClick={(item) => history.push(`/admins/form?_id=${item._id}`)}
          actions={[
            {
              text: 'Delete',
              callback: (e, item) => {
                e.stopPropagation();
                setIdAdmin(item._id);
                setShowModal(true);
              }
            }
          ]}
        />
      )}
      <div className={styles.buttonContainer}>
        <Button label="ADD ADMIN" onClick={() => history.push('/admins/form')} />
      </div>
    </section>
  );
};

export default Admins;
