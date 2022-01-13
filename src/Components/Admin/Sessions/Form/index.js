import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useQuery from 'Hooks/useQuery';
import Button from 'Components/Shared/Button';
import styles from './form.module.css';
import Input from 'Components/Shared/Input';
import Select from 'Components/Shared/Select';
import Modal from 'Components/Shared/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { getSessionById, createSession, updateSession } from 'redux/sessions/thunks';
import { getPsychologists } from 'redux/psychologists/thunks';
import { getPostulants } from 'redux/postulants/thunks';
import { cleanError, cleanSelectedItem } from 'redux/sessions/actions';

function sessionsForm() {
  const [dateValue, setDateValue] = useState('');
  const [postulantValue, setPostulantValue] = useState('');
  const [psychoValue, setPsychoValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [notesValue, setNotesValue] = useState('');
  const [selectPostulant, setSelectPostulant] = useState([]);
  const [selectPsychologist, setSelectPsychologist] = useState([]);

  const query = useQuery();
  const history = useHistory();
  const dispatch = useDispatch();
  const error = useSelector((store) => store.sessions.error);
  const selectedSession = useSelector((store) => store.sessions.selectedItem);

  useEffect(() => {
    if (Object.keys(selectedSession).length) {
      setDateValue(selectedSession.date);
      setPostulantValue(selectedSession.postulant?._id);
      setPsychoValue(selectedSession.psychologist?._id);
      setStatusValue(selectedSession.status);
      setNotesValue(selectedSession.notes);
    }
  }, [selectedSession]);

  useEffect(() => {
    return () => {
      dispatch(cleanSelectedItem());
    };
  }, []);

  useEffect(() => {
    const sessionId = query.get('_id');
    dispatch(getPostulants()).then((response) => {
      setSelectPostulant(
        response.map((postulant) => ({
          value: postulant._id,
          label: `${postulant.firstName} ${postulant.lastName}`
        }))
      );
    });
    dispatch(getPsychologists()).then((response) => {
      setSelectPsychologist(
        response.map((psychologist) => ({
          value: psychologist._id,
          label: `${psychologist.firstName} ${psychologist.lastName}`
        }))
      );
    });
    if (sessionId) {
      dispatch(getSessionById(sessionId));
    }
  }, []);

  const onSubmit = (formValues) => {
    const sessionId = query.get('_id');
    const body = {
      date: formValues.date,
      postulant: formValues.postulant,
      psychologist: formValues.psychologist,
      status: formValues.status,
      notes: formValues.notes
    };

    if (sessionId) {
      dispatch(updateSession(sessionId, body)).then((response) => {
        if (response) {
          history.push('/admin/sessions/list');
        }
      });
    } else {
      dispatch(createSession(body)).then((response) => {
        if (response) {
          history.push('/admin/sessions/list');
        }
      });
    }
  };

  const required = (value) => {
    return value ? undefined : 'Required';
  };

  const validateDate = (value) => {
    if (query.get('_id')) {
      return undefined;
    }
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

  return (
    <div className={styles.container}>
      <Modal
        show={!!error}
        title="Error"
        message={error}
        cancel={{
          text: 'Close',
          callback: () => dispatch(cleanError())
        }}
      />
      <Form
        onSubmit={onSubmit}
        initialValues={selectedSession}
        render={(formProps) => (
          <form onSubmit={formProps.handleSubmit} className={styles.container}>
            <h2 className={styles.title}>Session</h2>
            <Field
              name="postulant"
              title="Select a postulant"
              disabled={formProps.submitting}
              component={Select}
              validate={required}
              arrayToMap={selectPostulant}
              initialValue={postulantValue}
              value={postulantValue}
            />
            <Field
              name="psychologist"
              title="Select a psychologist"
              disabled={formProps.submitting}
              component={Select}
              validate={required}
              arrayToMap={selectPsychologist}
              initialValue={psychoValue}
              value={psychoValue}
            />
            <Field
              name="status"
              title="Status"
              disabled={formProps.submitting}
              component={Select}
              validate={required}
              arrayToMap={[
                { value: 'assigned', label: 'Assigned' },
                { value: 'successful', label: 'Successful' },
                { value: 'cancelled', label: 'Cancelled' }
              ]}
              initialValue={statusValue}
            />
            <Field
              name="date"
              title="Date"
              type="datetime-local"
              disabled={formProps.submitting}
              placeholder="Select a date"
              component={Input}
              validate={validateDate}
              initialValue={dateValue}
            />
            <Field
              name="notes"
              title="Notes"
              placeholder="Write here your notes"
              component={Input}
              initialValue={notesValue}
              value={notesValue}
            />
            <div className={styles.buttonContainer}>
              <Button
                label="Save"
                disabled={formProps.submitting || formProps.pristine}
                type="submit"
              />
            </div>
          </form>
        )}
      />
    </div>
  );
}
export default sessionsForm;
