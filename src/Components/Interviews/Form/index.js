/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useQuery from '../../../Hooks/useQuery';
import styles from './form.module.css';
import Input from '../../Shared/Input';
import Button from '../../Shared/Button';
import Modal from '../../Shared/Modal';
import Select from '../../Shared/Select';
import { useDispatch, useSelector } from 'react-redux';
import {
  createInterview,
  getInterviewById,
  updateInterview
} from '../../../redux/interviews/thunks';
import { cleanError } from '../../../redux/interviews/actions';

function Form() {
  const [interviewId, setInterviewId] = useState(undefined);
  const [postulantIdValue, setPostulantIdValue] = useState('');
  const [clientIdValue, setClientIdValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [applicationIdValue, setApplicationIdValue] = useState('');
  const [notesValue, setNotesValue] = useState('');
  // const [postulantsValue, setPostulantsValue] = useState([]);
  // const [clientsValue, setClientsValue] = useState([]);
  // const [applicationValue, setApplicationValue] = useState([]);
  // const [errorValue, setError] = useState('');
  const [selectPostulant, setSelectPostulant] = useState([]);
  const [selectClient, setSelectClient] = useState([]);
  const [selectApplication, setSelectApplication] = useState([]);

  const error = useSelector((store) => store.interviews.error);
  const isLoading = useSelector((store) => store.interviews.isFetching);
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();

  useEffect(() => {
    const interviewId = query.get('_id');
    if (interviewId) {
      dispatch(getInterviewById(interviewId)).then((selectedInterview) => {
        setInterviewId(interviewId);
        setPostulantIdValue(selectedInterview.postulant);
        setClientIdValue(selectedInterview.client);
        setApplicationIdValue(selectedInterview.application);
        setStatusValue(selectedInterview.status);
        setDateValue(selectedInterview.date);
        setNotesValue(selectedInterview.notes);
      });
    }
  }, []);

  const save = (e) => {
    e.preventDefault();

    const interviewId = query.get('_id');

    if (interviewId) {
      dispatch(
        updateInterview(interviewId, {
          postulant: postulantIdValue,
          client: clientIdValue,
          application: applicationIdValue,
          status: statusValue,
          date: dateValue,
          notes: notesValue
        })
      ).then((response) => {
        if (response) {
          history.push('/interviews');
        }
      });
    } else {
      dispatch(
        createInterview({
          postulant: postulantIdValue,
          client: clientIdValue,
          application: applicationIdValue,
          status: statusValue,
          date: dateValue,
          notes: notesValue
        })
      ).then((response) => {
        if (response) {
          history.push('/interviews');
        }
      });
    }
  };
  //

  return (
    <div>
      <form onSubmit={save} className={styles.container}>
        <h2 className={styles.title}>Interview</h2>
        <label className={styles.label}>
          <span className={styles.span}>Postulant Name</span>
        </label>
        <Select
          title="Postulant Name"
          id="postulantId"
          name="postulantId"
          value={postulantIdValue}
          onChange={(e) => setPostulantIdValue(e.target.value)}
          arrayToMap={selectPostulant}
          required
        />
        <Select
          title="Client Name"
          id="clientId"
          name="clientId"
          value={clientIdValue}
          onChange={(e) => setClientIdValue(e.target.value)}
          arrayToMap={selectClient}
          required
        />
        <Select
          title="Status"
          id="status"
          name="status"
          required
          value={statusValue}
          onChange={(e) => setStatusValue(e.target.value)}
          arrayToMap={[
            { value: 'successful', label: 'Successful' },
            { value: 'failed', label: 'Failed' },
            { value: 'cancelled', label: 'Cancelled' },
            { value: 'assigned', label: 'Assigned' },
            { value: 'confirmed', label: 'Confirmed' }
          ]}
        />
        <Select
          title="Application ID"
          id="application"
          name="application"
          required
          value={applicationIdValue}
          onChange={(e) => setApplicationIdValue(e.target.value)}
          arrayToMap={selectApplication}
        />
        <Input
          title="Date"
          id="date"
          name="date"
          type="datetime-local"
          value={dateValue}
          onChange={(e) => setDateValue(e.target.value)}
          disabled={isLoading}
          required
        />
        <Input
          title="Notes"
          id="notes"
          name="notes"
          type="text"
          value={notesValue}
          onChange={(e) => setNotesValue(e.target.value)}
          disabled={isLoading}
        />
        <div className={styles.buttonContainer}>
          <Button label="Save" disabled={isLoading} type="submit" />
        </div>
        {error && (
          <Modal>
            {`${error}`}
            <button className={styles.button} onClick={() => dispatch(cleanError())}>
              Close
            </button>
          </Modal>
        )}
      </form>
    </div>
  );
}

export default Form;
