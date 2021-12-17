import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useQuery from '../../../Hooks/useQuery';
import Textarea from '../../Shared/Textarea';
import Button from '../../Shared/Button';
import styles from './form.module.css';
import Input from '../../Shared/Input';
import Select from '../../Shared/Select';
import Modal from '../../Shared/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getSessionById, createSession, updateSession } from '../../../redux/sessions/thunks';
import { getPsychologists } from '../../../redux/psychologists/thunks';
import { getPostulants } from '../../../redux/postulants/thunks';
import { cleanError, cleanSelectedItem } from '../../../redux/sessions/actions';

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
  const isLoading = useSelector((store) => store.sessions.isLoading);
  const selectedSession = useSelector((store) => store.sessions.selectedItem);

  const onChangeDateInput = (event) => {
    setDateValue(event.target.value);
  };

  const onChangePostulantInput = (event) => {
    setPostulantValue(event.target.value);
  };

  const onChangePsychoInput = (event) => {
    setPsychoValue(event.target.value);
  };

  const onChangeStatusInput = (event) => {
    setStatusValue(event.target.value);
  };
  const onChangeNotesInput = (event) => {
    setNotesValue(event.target.value);
  };

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

  const onSubmit = (event) => {
    event.preventDefault();
    const sessionId = query.get('_id');
    const body = {
      date: dateValue,
      postulant: postulantValue,
      psychologist: psychoValue,
      status: statusValue,
      notes: notesValue
    };

    if (sessionId) {
      dispatch(updateSession(sessionId, body)).then((response) => {
        if (response) {
          history.push('/sessions');
        }
      });
    } else {
      dispatch(createSession(body)).then((response) => {
        if (response) {
          history.push('/sessions');
        }
      });
    }
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
      <form className={styles.form} onSubmit={onSubmit}>
        <h2 className={styles.title}>Session</h2>
        <Select
          title="Postulant"
          id="postulant"
          name="postulant"
          value={postulantValue}
          onChange={onChangePostulantInput}
          arrayToMap={selectPostulant}
          disabled={isLoading}
          required
        />
        <Select
          title="Psychologist"
          id="psychologist"
          name="psychologist"
          value={psychoValue}
          onChange={onChangePsychoInput}
          arrayToMap={selectPsychologist}
          disabled={isLoading}
          required
        />
        <Select
          title="Status"
          id="status"
          name="status"
          value={statusValue}
          onChange={onChangeStatusInput}
          arrayToMap={[
            { value: 'assigned', label: 'Assigned' },
            { value: 'successful', label: 'Successful' },
            { value: 'cancelled', label: 'Cancelled' }
          ]}
          disabled={isLoading}
          required
        />
        <Input
          title="Date"
          name="date"
          value={dateValue}
          onChange={onChangeDateInput}
          type="datetime-local"
          disabled={isLoading}
          required
        />
        <Textarea
          title="Notes"
          name="notes"
          value={notesValue}
          onChange={onChangeNotesInput}
          disabled={isLoading}
        />
        <div className={styles.buttonContainer}>
          <Button label="SAVE" disabled={isLoading} type="submit"></Button>
        </div>
      </form>
    </div>
  );
}
export default sessionsForm;
