import { useEffect, useState, useMemo } from 'react';
import Modal from 'Components/Shared/Modal';
import styles from './sessions.module.css';
import Button from 'Components/Shared/Button';
import { useHistory } from 'react-router-dom';
import Table from 'Components/Shared/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getSessions, updateSession } from 'redux/sessions/thunks';
import { cleanError } from 'redux/sessions/actions';

function Sessions() {
  const [processedSessions, setProcessedSessions] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const sessions = useSelector((store) => store.sessions.list);
  const error = useSelector((store) => store.sessions.error);
  const isLoading = useSelector((store) => store.sessions.isFetching);
  const postulantId = useSelector((store) => store.auth.user?._id);

  const sessionsOfOnePostulant = useMemo(() => {
    return sessions.filter((session) => session.postulant._id === postulantId);
  }, [sessions]);

  useEffect(() => {
    if (!sessions.length) {
      dispatch(getSessions());
    } else {
      processSessions();
    }
  }, [sessions]);

  const processSessions = () => {
    setProcessedSessions(
      sessionsOfOnePostulant.map((session) => {
        return {
          _id: session._id,
          psychologist: session.psychologist ? session.psychologist : '-',
          date: session.date ? session.date : '-',
          status: session.status
        };
      })
    );
  };
  const hasScheduleSessions = () => {
    return sessionsOfOnePostulant.length > 0;
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
      <h2 className={styles.title}>Sessions</h2>
      <div className={styles.buttonContainer}>
        <Button
          disabled={hasScheduleSessions()}
          label="ADD SESSION"
          onClick={() => history.push('/postulant/sessions/form')}
        />
      </div>
      <div>
        {isLoading ? (
          <p className={styles.loading}>On Loading ...</p>
        ) : (
          <Table
            columns={[
              { name: 'Psychologist', value: 'psychologist.lastName' },
              { name: 'Date', value: 'date' },
              { name: 'Status', value: 'status' }
            ]}
            data={processedSessions}
            onRowClick={(item) => history.push(`/postulant/sessions/form?_id=${item._id}`)}
            actions={[
              {
                text: 'Cancel',
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
        )}
      </div>
    </section>
  );
}
export default Sessions;
