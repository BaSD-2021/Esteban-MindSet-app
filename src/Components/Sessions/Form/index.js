import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useQuery from '../../../Hooks/useQuery';
import Select from '../Select';
import TextArea from '../TextArea';
import Input from '../Input';
import Button from '../../Shared/Button';
import styles from './form.module.css';

function sessionsForm() {
  const [dateValue, setDateValue] = useState('');
  const [postulantValue, setPostulantValue] = useState('');
  const [psychoValue, setPsychoValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [notesValue, setNotesValue] = useState('');
  const [postulants, setPostulants] = useState([]);
  const [psychologists, setPsychologists] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const query = useQuery();
  const history = useHistory();

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
    setLoading(true);
    const sessionId = query.get('id');
    if (sessionId) {
      fetch(`${process.env.REACT_APP_API}/sessions?_id=${sessionId}`)
        .then((response) => {
          if (response.status !== 200) {
            return response.json().then(({ message }) => {
              throw new Error(message);
            });
          }
          return response.json();
        })
        .then((response) => {
          setDateValue(response.data[0].date);
          setPostulantValue(response.data[0].postulant?._id);
          setPsychoValue(response.data[0].psychologist?._id);
          setStatusValue(response.data[0].status);
          setNotesValue(response.data[0].notes);
        })
        .catch((error) => {
          setError(error.toString());
        })
        .finally(() => setLoading(false));
    }

    fetch(`${process.env.REACT_APP_API}/postulants`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        setPostulants(
          response.data.map((postulant) => ({
            value: postulant._id,
            label: `${postulant.firstName} ${postulant.lastName}`
          }))
        );
      })
      .catch((error) => {
        setError(error.toString());
      })
      .finally(() => setLoading(false));

    fetch(`${process.env.REACT_APP_API}/psychologists`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        setPsychologists(
          response.data.map((psychologist) => ({
            value: psychologist._id,
            label: `${psychologist.firstName} ${psychologist.lastName}`
          }))
        );
      })
      .catch((error) => {
        setError(error.toString());
      })
      .finally(() => setLoading(false));
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const sessionId = query.get('id');

    let url;
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        date: dateValue,
        postulant: postulantValue,
        psychologist: psychoValue,
        status: statusValue,
        notes: notesValue
      })
    };

    if (sessionId) {
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API}/sessions/${sessionId}`;
    } else {
      options.method = 'POST';
      url = `${process.env.REACT_APP_API}/sessions`;
    }

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
        history.push('/sessions');
      })
      .catch((error) => {
        setError(error.toString());
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h2 className={styles.title}>Form</h2>
        <Select
          name="postulant"
          value={postulantValue}
          onChange={onChangePostulantInput}
          options={postulants}
          disabled={isLoading}
          required
        />
        <Select
          name="psychologist"
          value={psychoValue}
          onChange={onChangePsychoInput}
          options={psychologists}
          disabled={isLoading}
          required
        />
        <Select
          name="status"
          value={statusValue}
          onChange={onChangeStatusInput}
          options={[
            { value: 'assigned', label: 'Assigned' },
            { value: 'successful', label: 'Successful' },
            { value: 'cancelled', label: 'Cancelled' }
          ]}
          disabled={isLoading}
          required
        />
        <Input
          name="date"
          value={dateValue}
          onChange={onChangeDateInput}
          type="datetime-local"
          disabled={isLoading}
          required
        />
        <TextArea
          name="notes"
          value={notesValue}
          onChange={onChangeNotesInput}
          disabled={isLoading}
        />
        <div className={styles.buttonContainer}>
          <Button disabled={isLoading} name="saveButton" />
        </div>
        <div className={styles.error}>{error}</div>
      </form>
    </div>
  );
}
export default sessionsForm;
