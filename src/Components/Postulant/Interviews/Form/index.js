import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './form.module.css';
import Input from 'Components/Shared/Input';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import Select from 'Components/Shared/Select';
import { useDispatch, useSelector } from 'react-redux';
import { createInterview } from 'redux/interviews/thunks';
import { getClients } from 'redux/clients/thunks';
import { getApplications } from 'redux/applications/thunks';
import { cleanError } from 'redux/interviews/actions';

function Form() {
  const [clientIdValue, setClientIdValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [applicationIdValue, setApplicationIdValue] = useState('');
  const [notesValue, setNotesValue] = useState('');
  const [selectClient, setSelectClient] = useState([]);
  const [selectApplication, setSelectApplication] = useState([]);

  const error = useSelector((store) => store.interviews.error);
  const isLoading = useSelector((store) => store.interviews.isFetching);
  const dispatch = useDispatch();
  const history = useHistory();

  const onChangeClientId = (event) => {
    setClientIdValue(event.target.value);
  };

  const onChangeDate = (event) => {
    setDateValue(event.target.value);
  };

  const onChangeApplication = (event) => {
    setApplicationIdValue(event.target.value);
  };

  const onChangeNotes = (event) => {
    setNotesValue(event.target.value);
  };

  useEffect(() => {
    dispatch(getClients()).then((response) => {
      setSelectClient(
        response.map((client) => ({
          value: client._id,
          label: client.name
        }))
      );
    });

    dispatch(getApplications()).then((response) => {
      setSelectApplication(
        response.map((application) => ({
          value: application._id,
          label: application._id
        }))
      );
    });
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(
      createInterview({
        postulant: '61adf3f49a63822458f2d7f0',
        client: clientIdValue,
        application: applicationIdValue,
        status: 'assigned',
        date: dateValue,
        notes: notesValue
      })
    ).then((response) => {
      if (response) {
        history.push('/postulant/interviews/list');
      }
    });
  };

  return (
    <div>
      <Modal
        show={!!error}
        title="Error"
        message={error}
        cancel={{
          text: 'Close',
          callback: () => dispatch(cleanError())
        }}
      />
      <form onSubmit={onSubmit} className={styles.container}>
        <h2 className={styles.title}>Schedule Interview</h2>
        <Select
          title="Client Name"
          id="clientId"
          name="clientId"
          value={clientIdValue}
          onChange={onChangeClientId}
          arrayToMap={selectClient}
          required
        />
        <Select
          title="Application ID"
          id="application"
          name="application"
          required
          value={applicationIdValue}
          onChange={onChangeApplication}
          arrayToMap={selectApplication}
        />
        <Input
          title="Date"
          id="date"
          name="date"
          type="datetime-local"
          value={dateValue}
          onChange={onChangeDate}
          disabled={isLoading}
          required
        />
        <Input
          title="Notes"
          id="notes"
          name="notes"
          type="text"
          value={notesValue}
          onChange={onChangeNotes}
          disabled={isLoading}
        />
        <div className={styles.buttonContainer}>
          <Button label="Save" disabled={isLoading} type="submit" />
        </div>
      </form>
    </div>
  );
}

export default Form;
