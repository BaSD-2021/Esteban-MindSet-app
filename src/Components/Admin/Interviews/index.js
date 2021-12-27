import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './list.module.css';
import Modal from 'Components/Shared/Modal';
import Button from 'Components/Shared/Button';
import Table from 'Components/Shared/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getInterviews, deleteInterview } from 'redux/interviews/thunks';
import { cleanError } from 'redux/interviews/actions';

function Interviews() {
  const [showModal, setShowModal] = useState(false);
  const [selectedIdInterview, setIdInterview] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const interviews = useSelector((store) => store.interviews.list);
  const error = useSelector((store) => store.interviews.error);
  const isLoading = useSelector((store) => store.interviews.isFetching);

  useEffect(() => {
    if (!interviews.length) {
      dispatch(getInterviews());
    }
  }, []);

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Interviews</h2>
      {isLoading ? (
        <p className={styles.loading}>On Loading ...</p>
      ) : (
        <Table
          columns={[
            { name: 'Postulant', value: 'postulant.firstName' },
            { name: 'Client', value: 'client.name' },
            { name: 'Status', value: 'status' },
            { name: 'Date', value: 'date' }
          ]}
          data={interviews}
          onRowClick={(item) => history.push(`/admin/interviews/form?_id=${item._id}`)}
          actions={[
            {
              text: 'Delete',
              callback: (e, item) => {
                e.stopPropagation();
                setIdInterview(item._id);
                setShowModal(true);
              }
            }
          ]}
        />
      )}
      <Modal
        show={showModal}
        title="Do you want to proceed and delete this Interview?"
        isLoading={isLoading}
        cancel={{
          text: 'Cancel',
          callback: () => setShowModal(false)
        }}
        confirm={{
          text: 'Confirm',
          callback: () => {
            dispatch(deleteInterview(selectedIdInterview)).then(() => {
              setIdInterview(undefined);
              setShowModal(false);
            });
          }
        }}
      />
      <Modal
        showModal={!!error}
        title="Error"
        message={error}
        cancel={{
          text: 'Close',
          callback: () => dispatch(cleanError())
        }}
      />
      <div className={styles.buttonContainer}>
        <Button label="ADD INTERVIEW" onClick={() => history.push('/admin/interviews/form')} />
      </div>
    </section>
  );
}

export default Interviews;
