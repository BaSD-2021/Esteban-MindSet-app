import { useEffect, useState } from 'react';
import Modal from '../Shared/Modal';
import styles from './sessions.module.css';
import Button from '../Shared/Button';
import { useHistory } from 'react-router-dom';
import Table from '../Shared/TableV2';
import { useDispatch, useSelector } from 'react-redux';
import { getSessions, deleteSession } from '../../redux/sessions/thunks';
import { cleanError } from '../../redux/sessions/actions';

function Sessions() {
  const [showModal, setShowModal] = useState(false);
  const [selectedIdSession, setSelectedIdSession] = useState(undefined);
  const history = useHistory();
  const dispatch = useDispatch();
  const sessions = useSelector((store) => store.sessions.list);
  const error = useSelector((store) => store.sessions.error);
  const isLoading = useSelector((store) => store.sessions.isFetching);

  useEffect(() => {
    if (!sessions.length) {
      dispatch(getSessions());
    }
  }, [sessions]);

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
            dispatch(deleteSession(selectedIdSession)).then(() => {
              setSelectedIdSession(undefined);
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
      <h2 className={styles.title}>Sessions</h2>
      <div>
        {isLoading ? (
          <p className={styles.loading}>On Loading ...</p>
        ) : (
          <Table
            columns={[
              { name: 'Postulant', value: 'postulant.lastName' },
              { name: 'Psychologist', value: 'psychologist.lastName' },
              { name: 'Date', value: 'date' },
              { name: 'Status', value: 'status' }
            ]}
            data={sessions}
            onRowClick={(item) => history.push(`/sessions/form?_id=${item._id}`)}
            actions={[
              {
                text: 'Delete',
                callback: (e, item) => {
                  e.stopPropagation();
                  setSelectedIdSession(item._id);
                  setShowModal(true);
                }
              }
            ]}
          />
        )}
      </div>
      <div className={styles.buttonContainer}>
        <Button label="ADD SESSION" onClick={() => history.push('/sessions/form')} />
      </div>
    </section>
  );
}
export default Sessions;
