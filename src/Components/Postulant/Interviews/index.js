import { useEffect, useState } from 'react';
import styles from './interviews.module.css';
import Modal from 'Components/Shared/Modal';
import Table from 'Components/Shared/TableToShow';
import { useDispatch, useSelector } from 'react-redux';
import { getInterviews, updateInterview } from 'redux/interviews/thunks';
import { cleanError } from 'redux/interviews/actions';

function Interviews() {
  const [showModal, setShowModal] = useState(false);
  const [selectedIdInterview, setIdInterview] = useState('');
  const [interviewsOfOnePostulant, setInterviewsOfOnePostulant] = useState([]);

  const dispatch = useDispatch();

  const interviews = useSelector((store) => store.interviews.list);
  const error = useSelector((store) => store.interviews.error);
  const isLoading = useSelector((store) => store.interviews.isFetching);

  useEffect(() => {
    if (!interviews.length) {
      dispatch(getInterviews());
    }
  }, []);

  useEffect(() => {
    setInterviewsOfOnePostulant(
      interviews.filter(
        (interview) => interview.postulant._id === process.env.REACT_APP_POSTULANT_ID
      )
    );
  }, [interviews]);

  const editInterview = (selectedIdInterview) => {
    return interviewsOfOnePostulant.find((interview) => interview._id === selectedIdInterview);
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>My Interviews</h2>
      {isLoading ? (
        <p className={styles.loading}>On Loading ...</p>
      ) : (
        <Table
          columns={[
            { name: 'Client', value: 'client.name' },
            { name: 'Status', value: 'status' },
            { name: 'Date', value: 'date' }
          ]}
          data={interviewsOfOnePostulant}
          actions={[
            {
              text: 'Cancel',
              disabled: (item) => item.status !== 'assigned' && item.status !== 'confirmed',
              callback: (e, item) => {
                e.stopPropagation();
                if (item.status === 'assigned' || item.status === 'confirmed') {
                  setIdInterview(item._id);
                  setShowModal(true);
                }
              }
            }
          ]}
        />
      )}
      <Modal
        show={showModal}
        title="Do you want to proceed and cancel this Interview?"
        isLoading={isLoading}
        cancel={{
          text: 'Cancel',
          callback: () => setShowModal(false)
        }}
        confirm={{
          text: 'Confirm',
          callback: () => {
            const interviewToEdit = editInterview(selectedIdInterview);
            dispatch(
              updateInterview(selectedIdInterview, {
                postulant: interviewToEdit.postulant._id,
                client: interviewToEdit.client._id,
                application: interviewToEdit.application._id,
                status: 'cancelled',
                date: interviewToEdit.date,
                notes: interviewToEdit.notes
              })
            ).then(() => {
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
    </section>
  );
}

export default Interviews;
