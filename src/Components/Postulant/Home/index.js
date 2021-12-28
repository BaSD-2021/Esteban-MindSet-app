import Table from 'Components/Shared/Table';
import styles from './home.module.css';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getApplications } from 'redux/applications/thunks';
import { getPositions } from 'redux/positions/thunks';
import { getSessions, updateSession } from 'redux/sessions/thunks';
import { getPostulants } from 'redux/postulants/thunks';
import { getInterviews, updateInterview } from 'redux/interviews/thunks';

function Home() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [lastApplications, setLastApplications] = useState([]);
  const applications = useSelector((store) => store.applications.list);
  const positions = useSelector((store) => store.positions.list);
  const sessions = useSelector((store) => store.sessions.list);
  const interviews = useSelector((store) => store.interviews.list);
  const postulants = useSelector((store) => store.postulants.list);
  const isLoading = useSelector((store) => store.applications.isFetching);

  useEffect(() => {
    dispatch(getPositions());
    dispatch(getSessions());
    dispatch(getPostulants());
    dispatch(getInterviews());
  }, []);

  useEffect(() => {
    if (!applications.length) {
      dispatch(getApplications());
    } else {
      processApplications();
    }
  }, [applications]);

  const selectedPostulant = postulants.filter(
    (postulant) => postulant._id === process.env.REACT_APP_POSTULANT_ID
  );

  const processApplications = () => {
    setLastApplications(
      applications
        .filter((application) => application.postulants._id === process.env.REACT_APP_POSTULANT_ID)
        .reverse()
        .slice(0, 4)
        .map((application) => {
          return {
            _id: application._id,
            positions: application.positions ? application.positions.jobDescription : '-',
            postulants: application.postulants
              ? `${application.postulants.firstName} ${application.postulants.lastName}`
              : '-',
            interview: application.interview ? application.interview.date : '-',
            result: application.result
          };
        })
    );
  };

  const lastPositions = positions
    .filter((position) => position.isOpen)
    .reverse()
    .slice(0, 4);

  const lastSessions = sessions
    .filter((session) => session.postulant._id === process.env.REACT_APP_POSTULANT_ID)
    .reverse()
    .slice(0, 4);

  const lastInterviews = interviews
    .filter((interview) => interview.postulant._id === process.env.REACT_APP_POSTULANT_ID)
    .reverse()
    .slice(0, 4);

  const applicationsColumns = [
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
  const interviewsColumns = [
    { name: 'Client', value: 'client.name' },
    { name: 'Status', value: 'status' },
    { name: 'Date', value: 'date' }
  ];

  return (
    <section className={styles.container}>
      {isLoading ? (
        <p className={styles.loading}>On Loading ...</p>
      ) : (
        <>
          <h2 className={styles.title}>{`Hello ${
            selectedPostulant.length ? selectedPostulant[0].firstName : ''
          }`}</h2>
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
                actions={[
                  {
                    text: 'Cancel',
                    disabled: (item) => item.status === 'cancelled',
                    callback: (e, item) => {
                      e.stopPropagation();
                      dispatch(
                        updateSession(item._id, {
                          ...item,
                          status: 'cancelled'
                        })
                      );
                    }
                  }
                ]}
              />
            </div>
          </div>
          <div className={styles.bottomContainer}>
            <div className={styles.widget}>
              <h3 className={styles.widgetTitle}>Latest Applications</h3>
              <Table
                columns={applicationsColumns}
                data={lastApplications}
                onRowClick={(item) => history.push(`/postulant/applications/form?_id=${item._id}`)}
                actions={[]}
              />
            </div>
            <div className={styles.widget}>
              <h3 className={styles.widgetTitle}>Incoming Interviews</h3>
              <Table
                columns={interviewsColumns}
                data={lastInterviews}
                onRowClick={(item) => history.push(`/postulant/interviews/form?_id=${item._id}`)}
                actions={[
                  {
                    text: 'Cancel',
                    disabled: (item) => item.status === 'cancelled',
                    callback: (e, item) => {
                      e.stopPropagation();
                      dispatch(
                        updateInterview(item._id, {
                          ...item,
                          status: 'cancelled'
                        })
                      );
                    }
                  }
                ]}
              />
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default Home;
