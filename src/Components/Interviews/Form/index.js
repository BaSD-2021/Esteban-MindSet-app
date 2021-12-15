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
import { cleanError, cleanSelectedItem } from '../../../redux/interviews/actions';

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
  const [selectPostulant, setSelectPostulant] = useState([]);
  const [selectClient, setSelectClient] = useState([]);
  const [selectApplication, setSelectApplication] = useState([]);
  const [id, setInterviewId] = useState(undefined);

  const error = useSelector((store) => store.interviews.error);
  const isLoading = useSelector((store) => store.interviews.isFetching);
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const selectedInterview = useSelector((store) => store.interviews.selectedItem);

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

  useEffect(() => {
    const interviewId = query.get('_id');
    if (interviewId) {
      dispatch(getInterviewById(interviewId));
      // .then((selectedInterview) => {
      //       setInterviewId(interviewId);
      //       setPostulantIdValue(selectedInterview.postulant?._id);
      //       setClientIdValue(selectedInterview.client?._id);
      //       setApplicationIdValue(selectedInterview.application?._id);
      //       setStatusValue(selectedInterview.status);
      //       setDateValue(selectedInterview.date);
      //       setNotesValue(selectedInterview.notes);
      //     });
      //   }
      // }, [selectedInterview]);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(selectedInterview).length) {
      setPostulantIdValue(selectedInterview.postulant?._id);
      setClientIdValue(selectedInterview.client?._id);
      setApplicationIdValue(selectedInterview.application?._id);
      setStatusValue(selectedInterview.status);
      setDateValue(selectedInterview.date);
      setNotesValue(selectedInterview.notes);
    }
  }, [selectedInterview]);

  useEffect(() => {
    return () => {
      dispatch(cleanSelectedItem());
    };
  }, []);

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
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
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
          <Button label="Save" disabled={isLoading} type="submit" />
        </div>
      </form>
    </div>
  );
}

export default Form;
