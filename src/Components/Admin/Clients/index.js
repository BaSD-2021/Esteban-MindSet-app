import { useEffect, useState } from 'react';
import styles from './clients.module.css';
import Modal from 'Components/Shared/Modal';
import Button from 'Components/Shared/Button';
import { useHistory } from 'react-router-dom';
import Table from 'Components/Shared/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getClients, deleteClient } from 'redux/clients/thunks';
import { cleanError } from 'redux/clients/actions';

function Clients() {
  const [showModal, setShowModal] = useState(false);
  const [selectedIdClient, setSelectedIdClient] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const clients = useSelector((store) => store.clients.list);
  const error = useSelector((store) => store.clients.error);
  const isLoading = useSelector((store) => store.clients.isFetching);

  useEffect(() => {
    if (!clients.length) {
      dispatch(getClients());
    }
  }, [clients]);

  return (
    <section className={styles.container}>
      <Modal
        show={showModal}
        title="Are you sure you want to delete this Client?"
        isLoading={isLoading}
        cancel={{
          text: 'Cancel',
          callback: () => setShowModal(false)
        }}
        confirm={{
          text: 'Confirm',
          callback: () => {
            dispatch(deleteClient(selectedIdClient)).then(() => {
              setSelectedIdClient(undefined);
              setShowModal(false);
            });
          }
        }}
      />
      <Modal
        show={!!error}
        title="Error"
        message={error}
        cancel={{
          text: 'Close',
          callback: () => dispatch(cleanError())
        }}
      />
      <h2 className={styles.title}>Clients</h2>
      {isLoading ? (
        <p className={styles.loading}>On Loading ...</p>
      ) : (
        <Table
          columns={[
            { name: 'Name', value: 'name' },
            { name: 'Phone Number', value: 'phone' }
          ]}
          data={clients}
          onRowClick={(item) => history.push(`/admin/clients/form?_id=${item._id}`)}
          actions={[
            {
              text: 'Delete',
              callback: (e, item) => {
                e.stopPropagation();
                setSelectedIdClient(item._id);
                setShowModal(true);
              }
            }
          ]}
        />
      )}
      <div className={styles.errorMessage}>{error}</div>
      <div className={styles.buttonContainer}>
        <Button label="ADD CLIENT" onClick={() => history.push('/admin/clients/form')} />
      </div>
    </section>
  );
}

export default Clients;
