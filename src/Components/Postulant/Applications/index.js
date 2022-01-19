import { useEffect } from 'react';
import styles from './applications.module.css';
import Modal from 'Components/Shared/Modal';
import Table from 'Components/Shared/TableToShow';
import { useDispatch, useSelector } from 'react-redux';
import { getApplicationsByPostulant } from 'redux/applications/thunks';
import { cleanError } from 'redux/applications/actions';
function Applications() {
  const dispatch = useDispatch();
  const applications = useSelector((store) => store.applications.list);
  const postulantId = useSelector((store) => store.auth.user._id);
  const error = useSelector((store) => store.applications.error);
  const isLoading = useSelector((store) => store.applications.isFetching);
  const columnName = [
    {
      name: 'Job Description',
      value: 'positions.jobDescription'
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
    dispatch(getApplicationsByPostulant(postulantId));
  }, []);
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
          <Table columns={columnName} data={applications} actions={[]} />
        )}
      </div>
    </section>
  );
}
export default Applications;
