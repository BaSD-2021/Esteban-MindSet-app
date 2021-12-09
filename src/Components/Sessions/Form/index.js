import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useQuery from '../../../Hooks/useQuery';
import Textarea from '../../Shared/Textarea';
import Button from '../../Shared/Button';
import styles from './form.module.css';
import Input from '../../Shared/Input';
import Select from '../../Shared/Select';

function sessionsForm() {
  const [dateValue, setDateValue] = useState('');
  const [postulantValue, setPostulantValue] = useState('');
  const [psychoValue, setPsychoValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [notesValue, setNotesValue] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [selectPostulant, setSelectPostulant] = useState([]);
  const [selectPsychologist, setSelectPsychologist] = useState([]);
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
          setLoading(false);
        })
        .catch((error) => {
          setError(error.toString());
        });
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
        setLoading(false);
        setSelectPostulant(
          response.data.map((postulant) => ({
            value: postulant._id,
            label: `${postulant.firstName} ${postulant.lastName}`
          }))
        );
      })
      .catch((error) => {
        setError(error.toString());
      });

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
        setLoading(false);
        setSelectPsychologist(
          response.data.map((psychologist) => ({
            value: psychologist._id,
            label: `${psychologist.firstName} ${psychologist.lastName}`
          }))
        );
      })
      .catch((error) => {
        setError(error.toString());
      });
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

    setLoading(true);

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
        setLoading(false);
        history.push('/sessions');
      })
      .catch((error) => {
        setError(error.toString());
      });
  };

  return (
    <div className={styles.container}>
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
          <Button label="SAVE" theme="primary" disabled={isLoading} type="submit"></Button>
        </div>
        <div className={styles.error}>{error}</div>
      </form>
    </div>
  );
}
export default sessionsForm;
