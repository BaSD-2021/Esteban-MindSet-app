import { useEffect, useState, useMemo } from 'react';
import Modal from 'Components/Shared/Modal';
import styles from './sessions.module.css';
import Button from 'Components/Shared/Button';
import { useHistory } from 'react-router-dom';
import Table from 'Components/Shared/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getSessions, updateSession } from 'redux/sessions/thunks';
import { cleanError } from 'redux/sessions/actions';
import { Field, Form } from 'react-final-form';
import Input from 'Components/Shared/Input';
import Select from 'Components/Shared/Select';
import { getProfiles } from 'redux/profiles/thunks';
import { getPostulantById, setProfilePostulant } from 'redux/postulants/thunks';

function Sessions() {
  const [processedSessions, setProcessedSessions] = useState([]);
  const [processedProfiles, setProcessedProfiles] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const sessions = useSelector((store) => store.sessions.list);
  const selectedPostulant = useSelector((store) => store.postulants.selectedPostulant);
  const error = useSelector((store) => store.sessions.error);
  const isLoading = useSelector((store) => store.sessions.isFetching);
  const psychologistId = useSelector((store) => store.auth.user?._id);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAlertSessionsChange, setShowAlertSessionsChange] = useState(false);
  const [showConfirmSession, setShowConfirmSession] = useState(false);
  const [showCancelSession, setShowCancelSession] = useState(false);
  const [itemOnEdit, setItemOnEdit] = useState({});

  const psychologistSessions = useMemo(() => {
    return sessions.filter((session) => session.psychologist._id === psychologistId);
  }, [sessions]);

  useEffect(() => {
    if (!sessions.length) {
      dispatch(getSessions());
    } else {
      processSessions();
    }
  }, [sessions]);

  useEffect(() => {
    dispatch(getProfiles()).then((response) => {
      setProcessedProfiles(
        response.map((profile) => ({
          value: profile._id,
          label: `${profile.name}`
        }))
      );
    });
  }, []);

  const processSessions = () => {
    setProcessedSessions(
      psychologistSessions.map((session) => {
        return {
          _id: session._id,
          postulant: session.postulant ? session.postulant : '-',
          date: session.date ? session.date : '-',
          status: session.status
        };
      })
    );
  };

  const required = (value) => {
    return value ? undefined : 'Required';
  };

  const validateDate = (value) => {
    if (required(value)) {
      return 'Required';
    }
    let sessionDate = value.split('T');
    let dateValue = Math.round(new Date(sessionDate[0]).getTime() / 1000);

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
    const date = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();

    let nowValue = Math.round(new Date(`${year}-${month}-${date}`).getTime() / 1000);
    return dateValue >= nowValue ? undefined : 'Invalid date';
  };

  const updateDate = (formValues) => {
    const body = {
      psychologist: { _id: psychologistId },
      date: formValues.date,
      postulant: { _id: itemOnEdit.postulant._id },
      status: itemOnEdit.status,
      notes: itemOnEdit.notes
    };
    dispatch(updateSession(itemOnEdit._id, body)).then((response) => {
      if (response) {
        setShowDateModal(false);
        setShowAlertSessionsChange(true);
      }
    });
  };

  const editProfile = (formValues) => {
    dispatch(setProfilePostulant(selectedPostulant._id, formValues.profile)).then((response) => {
      if (response) {
        setShowProfileModal(false);
      }
    });
    dispatch(
      updateSession(itemOnEdit._id, {
        ...itemOnEdit,
        status: 'closed'
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
      <Modal show={showDateModal} title="Reschedule Session">
        <Form
          onSubmit={updateDate}
          render={(formProps) => (
            <form onSubmit={formProps.handleSubmit}>
              <Field
                name="date"
                title="Date"
                type="datetime-local"
                disabled={formProps.submitting}
                placeholder="Select a date"
                component={Input}
                validate={validateDate}
                value=""
              />
              <div className={styles.buttonContainer}>
                <Button
                  label="SAVE"
                  disabled={formProps.submitting || formProps.pristine}
                  type="submit"
                />
                <Button
                  label="CANCEL"
                  disabled={formProps.submitting}
                  type="button"
                  onClick={() => setShowDateModal(false)}
                />
              </div>
            </form>
          )}
        />
      </Modal>
      <Modal show={showProfileModal} title="Select a profile">
        <Form
          onSubmit={editProfile}
          render={(formProps) => (
            <form onSubmit={formProps.handleSubmit}>
              <Field
                name="profile"
                title="Select a profile"
                disabled={formProps.submitting}
                component={Select}
                validate={required}
                arrayToMap={processedProfiles}
                value=""
              />
              <div className={styles.buttonContainer}>
                <Button
                  label="SAVE"
                  disabled={formProps.submitting || formProps.pristine}
                  type="submit"
                />
                <Button
                  label="CANCEL"
                  disabled={formProps.submitting}
                  type="button"
                  onClick={() => setShowProfileModal(false)}
                />
              </div>
            </form>
          )}
        />
      </Modal>
      <Modal
        show={showAlertSessionsChange}
        title="Changes Update"
        message="When making changes to the session schedule, the sessions already created that are outside the psychologist's time range will not be modified, since they have been previously confirmed."
        confirm={{
          text: 'Accept',
          callback: () => {
            setShowAlertSessionsChange(false);
            history.push('/psychologist/sessions');
          }
        }}
      />
      <Modal
        show={showConfirmSession}
        title="Confirm Session"
        message="By accepting to confirm the session, it will be marked as a successful session"
        confirm={{
          text: 'Accept',
          callback: () => {
            dispatch(
              updateSession(itemOnEdit._id, {
                ...itemOnEdit,
                status: 'successful'
              })
            );
            setShowConfirmSession(false);
          }
        }}
        cancel={{
          text: 'Close',
          callback: () => setShowConfirmSession(false)
        }}
      />
      <Modal
        show={showCancelSession}
        title="Cancel Session"
        message="Do you want to cancel this session?"
        confirm={{
          text: 'Confirm',
          callback: () => {
            dispatch(
              updateSession(itemOnEdit._id, {
                ...itemOnEdit,
                status: 'cancelled'
              })
            );
            setShowCancelSession(false);
          }
        }}
        cancel={{
          text: 'Cancel',
          callback: () => setShowCancelSession(false)
        }}
      />
      <h2 className={styles.title}>Sessions</h2>
      <div className={styles.buttonContainer}>
        <Button label="ADD SESSION" onClick={() => history.push('/psychologist/sessions/form')} />
      </div>
      <div>
        {isLoading ? (
          <p className={styles.loading}>On Loading ...</p>
        ) : (
          <Table
            columns={[
              { name: 'Postulant', value: 'postulant.lastName' },
              { name: 'Date', value: 'date' },
              { name: 'Status', value: 'status' }
            ]}
            data={processedSessions}
            onRowClick={(e) => e.preventDefault}
            actions={[
              {
                text: 'Cancel',
                disabled: (item) => item.status !== 'assigned',
                hidden: (item) => item.status !== 'cancelled' && item.status !== 'assigned',
                callback: (e, item) => {
                  e.stopPropagation();
                  setItemOnEdit(item);
                  setShowCancelSession(true);
                }
              },
              {
                text: 'Edit Date',
                disabled: (item) => item.status !== 'assigned',
                hidden: (item) => item.status !== 'cancelled' && item.status !== 'assigned',
                callback: (e, item) => {
                  e.stopPropagation();
                  setItemOnEdit(item);
                  setShowDateModal(true);
                }
              },
              {
                text: 'Complete',
                disabled: (item) => item.status !== 'confirmed',
                hidden: (item) =>
                  item.status !== 'confirmed' &&
                  item.status !== 'successful' &&
                  item.status !== 'closed',
                callback: (e, item) => {
                  e.stopPropagation();
                  setItemOnEdit(item);
                  setShowConfirmSession(true);
                }
              },
              {
                text: 'Profile',
                disabled: (item) => item.status !== 'successful',
                hidden: (item) =>
                  item.status !== 'confirmed' &&
                  item.status !== 'successful' &&
                  item.status !== 'closed',
                callback: (e, item) => {
                  e.stopPropagation();
                  dispatch(getPostulantById(item.postulant._id));
                  setItemOnEdit(item);
                  setShowProfileModal(true);
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
