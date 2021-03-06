import { useEffect, useState } from 'react';
import styles from './applications.module.css';
import Modal from 'Components/Shared/Modal';
import { useHistory } from 'react-router-dom';
import Table from 'Components/Shared/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getApplications, deleteApplication } from 'redux/applications/thunks';
import { cleanError } from 'redux/applications/actions';

function Applications() {
  const [showModal, setShowModal] = useState(false);
  const [selectedIdApplication, setSelectedIdApplication] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const [processedApplications, setProcessedApplications] = useState([]);
  const applications = useSelector((store) => store.applications.list);
  const error = useSelector((store) => store.applications.error);
  const isLoading = useSelector((store) => store.applications.isFetching);

  const columnName = [
    {
      name: 'Job Description',
      value: 'positions'
    },
    {
      name: 'Postulant',
      value: 'postulants'
    },
    {
      name: 'Result',
      value: 'result'
    }
  ];

  useEffect(() => {
    if (!applications.length) {
      dispatch(getApplications());
    } else {
      processApplications();
    }
  }, [applications]);

  const processApplications = () => {
    setProcessedApplications(
      applications.map((application) => {
        return {
          _id: application._id,
          positions: application.positions ? application.positions.jobDescription : '-',
          postulants: application.postulants
            ? `${application.postulants.firstName} ${application.postulants.lastName}`
            : '-',
          interview: application.interview ? application.interview.date : '-',
          result: application?.result
        };
      })
    );
  };

  return (
    <section className={styles.container}>
      <Modal
        show={showModal}
        title="Are you sure you want to delete this application?"
        isLoading={isLoading}
        cancel={{
          text: 'Cancel',
          callback: () => setShowModal(false)
        }}
        confirm={{
          text: 'Confirm',
          callback: () => {
            dispatch(deleteApplication(selectedIdApplication)).then(() => {
              setSelectedIdApplication(undefined);
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
      <h2 className={styles.title}>Applications</h2>
      <div>
        {isLoading ? (
          <p className={styles.loading}>On Loading ...</p>
        ) : (
          <Table
            columns={columnName}
            data={processedApplications}
            onRowClick={(item) => history.push(`/admin/applications/form?_id=${item._id}`)}
            actions={[]}
          />
        )}
      </div>
    </section>
  );
}

export default Applications;
