import Table from 'Components/Shared/Table';
import styles from './home.module.css';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getApplications } from 'redux/applications/thunks';
import { getPositions } from 'redux/positions/thunks';
import { getSessions } from 'redux/sessions/thunks';
import { getPostulants } from 'redux/postulants/thunks';

function Home() {
  const history = useHistory();
  const dispatch = useDispatch();
  const applications = useSelector((store) => store.applications.list);
  const positions = useSelector((store) => store.positions.list);
  const sessions = useSelector((store) => store.sessions.list);
  const postulants = useSelector((store) => store.postulants.list);
  const isLoading = useSelector((store) => store.applications.isFetching);

  useEffect(() => {
    dispatch(getApplications());
    dispatch(getPositions());
    dispatch(getSessions());
    dispatch(getPostulants());
  }, []);

  const selectedPostulant = postulants.filter(
    (postulant) => postulant._id === process.env.REACT_APP_POSTULANT_ID
  );

  const lastApplications = applications
    .filter((application) => application.postulants._id === process.env.REACT_APP_POSTULANT_ID)
    .reverse()
    .slice(0, 4);

  const lastPositions = positions
    .filter((position) => position.isOpen)
    .reverse()
    .slice(0, 4);

  const lastSessions = sessions
    .filter((session) => session.postulant._id === process.env.REACT_APP_POSTULANT_ID)
    .reverse()
    .slice(0, 4);

  // const applicationsColumns = [
  //   {
  //     name: 'Job Description',
  //     value: 'positions'
  //   },
  //   {
  //     name: 'Interview',
  //     value: 'interview'
  //   },
  //   {
  //     name: 'Result',
  //     value: 'result'
  //   }
  // ];
  const positionsColumns = [
    { name: 'Client', value: 'client.name' },
    { name: 'Profile', value: 'professionalProfile.name' },
    { name: 'Is Open', value: 'isOpen' }
  ];
  const sessionsColumns = [
    { name: 'Psychologist', value: 'psychologist.lastName' },
    { name: 'Date', value: 'date' },
    { name: 'Status', value: 'status' }
  ];

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{`Hello ${selectedPostulant[0].firstName}`}</h2>
      {isLoading ? (
        <p className={styles.loading}>On Loading ...</p>
      ) : (
        <div className={styles.topContainer}>
          <div className={styles.widget}>
            <h3 className={styles.widgetTitle}>Latest Positions</h3>
            <Table
              columns={positionsColumns}
              data={lastPositions}
              onRowClick={(item) => history.push(`/postulant/positions/form?_id=${item._id}`)}
              actions={[]}
            />
          </div>
          <div className={styles.widget}>
            <h3 className={styles.widgetTitle}>Incoming Sessions</h3>
            <Table
              columns={sessionsColumns}
              data={lastSessions}
              onRowClick={(item) => history.push(`/postulant/sessions/form?_id=${item._id}`)}
              actions={[]}
            />
          </div>
        </div>
      )}

      <div className={styles.bottomContainer}>{/* <Table /> */}</div>
    </section>
  );
}

export default Home;
