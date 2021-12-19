import { useEffect, useState } from 'react';
import styles from './applications.module.css';
import Modal from 'Components/Shared/Modal';
import { useHistory } from 'react-router-dom';
import Table from 'Components/Shared/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getApplications } from 'redux/applications/thunks';
import { cleanError } from 'redux/applications/actions';

function Applications() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [processedApplications, setProcessedApplications] = useState([]);
  const applications = useSelector((store) => store.applications.list);
  const error = useSelector((store) => store.applications.error);
  const isLoading = useSelector((store) => store.applications.isFetching);

  const applicationsOfOnePostulant = applications.filter(
    (application) => application.postulants._id === process.env.REACT_APP_POSTULANT_ID
  );

  const columnName = [
    {
      name: 'Job Description',
      value: 'positions'
    },
    {
      name: 'Interview',
      value: 'interview'
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
      applicationsOfOnePostulant.map((application) => {
        return {
          _id: application._id,
          positions: application.positions ? application.positions.jobDescription : '-',
          interview: application.interview ? application.interview.date : '-',
          result: application.result
        };
      })
    );
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
      <h2 className={styles.title}>My Applications</h2>
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
