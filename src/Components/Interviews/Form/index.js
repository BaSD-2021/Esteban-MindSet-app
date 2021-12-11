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
  const [postulantIdValue, setPostulantIdValue] = useState('');
  const [clientIdValue, setClientIdValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [applicationIdValue, setApplicationIdValue] = useState('');
  const [notesValue, setNotesValue] = useState('');
  const [postulantsValue, setPostulantsValue] = useState([]);
  const [clientsValue, setClientsValue] = useState([]);
  const [applicationValue, setApplicationValue] = useState([]);
  const [errorValue, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectPostulant, setSelectPostulant] = useState([]);
  const [selectClient, setSelectClient] = useState([]);
  const [selectApplication, setSelectApplication] = useState([]);

  const error = useSelector((store) => store.interviews.error);
  //const isLoading = useSelector((store) => store.interviews.isFetching);

  const query = useQuery();
  const history = useHistory();

  let fetchMethod = 'POST';

  const onLoading = (dat) => {
    setPostulantIdValue(dat.data[0].postulant ? dat.data[0].postulant._id : '');
    setClientIdValue(dat.data[0].client ? dat.data[0].client._id : '');
    setStatusValue(dat.data[0].status || '');
    setDateValue(dat.data[0].date || '');
    setApplicationIdValue(dat.data[0].application._id == null ? '' : dat.data[0].application._id);
    setNotesValue(dat.data[0].notes || '');
  };

  const onChangePostulantId = (event) => {
    setPostulantIdValue(event.target.value);
  };

  const onChangeClientId = (event) => {
    setClientIdValue(event.target.value);
  };

  const onChangeStatus = (event) => {
    setStatusValue(event.target.value);
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

  const interviewId = query.get('_id');
  const url1 = `${process.env.REACT_APP_API}/interviews?_id=${interviewId}`;

  if (interviewId) {
    fetchMethod = 'PUT';
  }

  const onSubmit = (event) => {
    event.preventDefault();

    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        postulant: postulantIdValue,
        client: clientIdValue,
        application: applicationIdValue,
        status: statusValue,
        date: dateValue,
        notes: notesValue
      }),
      method: fetchMethod
    };

    const url = interviewId
      ? `${process.env.REACT_APP_API}/interviews/${interviewId}`
      : `${process.env.REACT_APP_API}/interviews/`;

    setIsLoading(true);

    fetch(url, options)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then(() => {
        history.push(`/interviews`);
      })
      .catch((errorValue) => {
        setError(errorValue.toString());
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/postulants`)
      .then((response) => response.json())
      .then((res) => {
        setSelectPostulant(
          res.data.map((postulant) => ({
            value: postulant._id,
            label: `${postulant.firstName} ${postulant.lastName}`
          }))
        );
        setPostulantsValue(res.data);
      })
      .catch((errorValue) => {
        setError(errorValue.toString());
      });

    fetch(`${process.env.REACT_APP_API}/clients`)
      .then((response) => response.json())
      .then((res) => {
        setSelectClient(
          res.data.map((client) => ({
            value: client._id,
            label: client.name
          }))
        );
        setClientsValue(res.data);
      })
      .catch((errorValue) => {
        setError(errorValue.toString());
      });

    fetch(`${process.env.REACT_APP_API}/applications`)
      .then((response) => response.json())
      .then((res) => {
        setSelectApplication(
          res.data.map((application) => ({
            value: application._id,
            label: application._id
          }))
        );
        setApplicationValue(res.data);
      })
      .catch((errorValue) => {
        setError(errorValue.toString());
      });

    if (interviewId) {
      fetch(url1)
        .then((response) => response.json())
        .then((res) => {
          onLoading(res);
        })
        .catch((errorValue) => {
          setError(errorValue.toString());
        });
    }
  }, []);
  return (
    <div>
      <form onSubmit={onSubmit} className={styles.container}>
        <h2 className={styles.title}>Interview</h2>
        <label className={styles.label}>
          <span className={styles.span}>Postulant Name</span>
        </label>
        <Select
          title="Postulant Name"
          id="postulantId"
          name="postulantId"
          value={postulantIdValue}
          onChange={onChangePostulantId}
          arrayToMap={selectPostulant}
          required
        />
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
          title="Status"
          id="status"
          name="status"
          required
          value={statusValue}
          onChange={onChangeStatus}
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
          <Button name="saveButton" disabled={isLoading} />
        </div>
        <div className={styles.error}>{errorValue}</div>
      </form>
    </div>
  );
}

export default Form;
