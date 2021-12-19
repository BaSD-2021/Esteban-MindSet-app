import { useEffect, useState } from 'react';
import styles from './interviews.module.css';
import Modal from 'Components/Shared/Modal';
import Table from 'Components/Shared/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getInterviews, deleteInterview } from 'redux/interviews/thunks';
import { cleanError } from 'redux/interviews/actions';

function Interviews() {
  const [showModal, setShowModal] = useState(false);
  const [selectedIdInterview, setIdInterview] = useState(false);
  const [disableArrayValue, setDisableArrayValue] = useState([]);

  const dispatch = useDispatch();

  const interviews = useSelector((store) => store.interviews.list);
  const interviewsOfOnePostulant = interviews.filter(
    (interview) => interview.postulant._id === process.env.REACT_APP_POSTULANT_ID
  );

  const error = useSelector((store) => store.interviews.error);
  const isLoading = useSelector((store) => store.interviews.isFetching);

  let disableArray = [];

  useEffect(() => {
    if (!interviews.length) {
      dispatch(getInterviews());
    }

    interviewsOfOnePostulant.map((interview) => {
      if (interview.status === 'assigned' || interview.status === 'successful') {
        disableArray.push('false');
      } else {
        disableArray.push('true');
      }
    });

    setDisableArrayValue(disableArray);
  }, []);

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
          disableEdit={true}
          disableArray={disableArrayValue}
          actions={[
            {
              text: 'Cancel',
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
    </section>
  );
}

export default Interviews;
