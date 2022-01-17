import { useEffect, useState } from 'react';
import styles from './list.module.css';
import Modal from 'Components/Shared/Modal';
import Button from 'Components/Shared/Button';
import { useHistory } from 'react-router-dom';
import Table from 'Components/Shared/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getPositions, deletePosition } from 'redux/positions/thunks';
import { deleteInterview, getInterviews } from 'redux/interviews/thunks';
import { cleanError } from 'redux/positions/actions';
import { deleteApplication, getApplications } from 'redux/applications/thunks';

function Positions() {
  const [showModal, setShowModal] = useState(false);
  const [selectedIdPosition, setSelectedIdPosition] = useState(undefined);

  const history = useHistory();
  const dispatch = useDispatch();
  const positions = useSelector((store) => store.positions.list);
  const applications = useSelector((store) => store.applications.list);
  const interviews = useSelector((store) => store.interviews.list);
  const error = useSelector((store) => store.positions.error);
  const isLoading = useSelector((store) => store.positions.isFetching);

  useEffect(() => {
    if (!positions.length) {
      dispatch(getPositions());
      dispatch(getApplications());
      dispatch(getInterviews());
    }
    positions.forEach((position) => {
      if (position.vacancy === 0) {
        const interviewsToDelete = interviews.filter(
          (interview) => interview.application.positions._id === position._id
        );
        interviewsToDelete.forEach((interview) => dispatch(deleteInterview(interview._id)));
        const applicationsToDelete = applications.filter(
          (application) => application.positions._id === position._id
        );
        applicationsToDelete.forEach((application) => dispatch(deleteApplication(application._id)));
        dispatch(deletePosition(position._id));
      }
    });
  }, [positions]);

  return (
    <section className={styles.container}>
      <Modal
        show={showModal}
        title="Do you want to proceed and delete this position?"
        isLoading={isLoading}
        cancel={{
          text: 'Cancel',
          callback: () => setShowModal(false)
        }}
        confirm={{
          text: 'Confirm',
          callback: () => {
            dispatch(deletePosition(selectedIdPosition)).then(() => {
              setSelectedIdPosition(undefined);
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
      <h2 className={styles.title}>Positions</h2>
      {isLoading ? (
        <p className={styles.loading}>On Loading ...</p>
      ) : (
        <Table
          columns={[
            { name: 'Client', value: 'client.name' },
            { name: 'Vacancy', value: 'vacancy' },
            { name: 'Professional Profile', value: 'professionalProfile.name' },
            { name: 'Is Open', value: 'isOpen' }
          ]}
          data={positions}
          onRowClick={(item) => history.push(`/admin/positions/form?_id=${item._id}`)}
          actions={[
            {
              text: 'Delete',
              callback: (e, item) => {
                e.stopPropagation();
                setSelectedIdPosition(item._id);
                setShowModal(true);
              }
            }
          ]}
        />
      )}
      <div className={styles.buttonContainer}>
        <Button label="ADD POSITION" onClick={() => history.push('/admin/positions/form')} />
      </div>
    </section>
  );
}

export default Positions;
