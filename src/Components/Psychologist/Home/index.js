import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import Select from 'Components/Shared/Select';
import Table from 'Components/Shared/Table';
import React, { useEffect, useMemo, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { getPostulantById, updatePostulant } from 'redux/postulants/thunks';
import { getProfiles } from 'redux/profiles/thunks';
import { getPsychologistById } from 'redux/psychologists/thunks';
import { getSessions, updateSession } from 'redux/sessions/thunks';
import styles from './home.module.css';

const Home = () => {
  const dispatch = useDispatch();
  const selectedPsychologist = useSelector((store) => store.psychologists.selectedItem);
  const psychologistId = useSelector((store) => store.auth.user?._id);
  const sessions = useSelector((store) => store.sessions.list);
  const [processedSessions, setProcessedSessions] = useState([]);
  const [processedProfiles, setProcessedProfiles] = useState([]);
  const selectedPostulant = useSelector((store) => store.postulants.selectedPostulant);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [itemOnEdit, setItemOnEdit] = useState({});

  useEffect(() => {
    dispatch(getPsychologistById(psychologistId));
  }, []);

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

  const successfulSessions = processedSessions.filter((session) => session.status === 'successful');

  const required = (value) => {
    return value ? undefined : 'Required';
  };

  const editProfile = (formValues) => {
    const body = {
      ...selectedPostulant,
      profiles: { _id: formValues.profile }
    };
    dispatch(updatePostulant(selectedPostulant._id, body)).then((response) => {
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

  const psychologistSessions = useMemo(() => {
    return sessions.filter((session) => session.psychologist._id === psychologistId);
  }, [sessions]);

  const incomingSessions = sessions.filter(
    (session) => session.psychologist._id === psychologistId && session.status === 'assigned'
  );

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Hello {selectedPsychologist.firstName}</h1>
      <div className={styles.flexContainer}>
        <div className={styles.dataContainer}>
          <h2 className={styles.incomingTitle}>Incoming Sessions:</h2>
          {incomingSessions.map((session, i) => (
            <div key={i}>
              <div className={styles.incomingSessionContainer}>
                <div className={styles.incomingSessionData}>
                  <span className={styles.label}>Date: </span>
                  <span className={styles.text}>{session.date}</span>
                </div>
                <div className={styles.incomingSessionData}>
                  <span className={styles.label}>Postulant: </span>
                  <span
                    className={styles.text}
                  >{`${session.postulant.firstName} ${session.postulant.lastName}`}</span>
                </div>
                <div className={styles.incomingSessionData}>
                  <span className={styles.label}>Notes: </span>
                  <span className={styles.text}>{session.notes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.dataContainer}>
          <h2 className={styles.incomingTitle}>Select a Profile for successful candidates:</h2>
          <Table
            columns={[
              { name: 'Postulant', value: 'postulant.lastName' },
              { name: 'Date', value: 'date' }
            ]}
            data={successfulSessions}
            onRowClick={(e) => e.preventDefault}
            actions={[
              {
                text: 'Select Profile',
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
        </div>
      </div>
    </section>
  );
};

export default Home;
