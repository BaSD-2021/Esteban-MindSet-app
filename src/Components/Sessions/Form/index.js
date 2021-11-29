import { useEffect, useState } from 'react';
import Input from '../Input';
import TextArea from '../TextArea';
import Select from '../Select';
import styles from './form.module.css';

function Form() {
  const [dateValue, setDateValue] = useState('');
  const [postulantValue, setPostulantValue] = useState('');
  const [psychologistValue, setPsychologistValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [notesValue, setNotesValue] = useState('');
  const [postulants, setPostulants] = useState([]);
  const [psychologists, setPsychologists] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('id');
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
          setPsychologistValue(response.data[0].psychologist?._id);
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

  const onChangeDateValue = (event) => {
    setDateValue(event.target.value);
  };

  const onChangePostulantValue = (event) => {
    setPostulantValue(event.target.value);
  };

  const onChangePsychologistValue = (event) => {
    setPsychologistValue(event.target.value);
  };

  const onChangeStatusValue = (event) => {
    setStatusValue(event.target.value);
  };

  const onChangeNotesValue = (event) => {
    setNotesValue(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('id');

    let url;
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        date: dateValue,
        postulant: postulantValue,
        psychologist: psychologistValue,
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
        window.location.href = '/sessions';
      })
      .catch((error) => {
        setError(error.toString());
      })
      .finally(() => setLoading(false));
  };

  return (
    <section className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h2>Sessions</h2>
        <Select
          name="postulant"
          value={postulantValue}
          onChange={onChangePostulantValue}
          options={postulants}
          required
          disabled={isLoading}
        />
        <Select
          name="psychologist"
          value={psychologistValue}
          onChange={onChangePsychologistValue}
          options={psychologists}
          required
          disabled={isLoading}
        />
        <Select
          name="status"
          value={statusValue}
          onChange={onChangeStatusValue}
          options={[
            { value: 'assigned', label: 'Assigned' },
            { value: 'succesful', label: 'Succesful' },
            { value: 'cancelled', label: 'Cancelled' }
          ]}
          required
          disabled={isLoading}
        />
        <Input
          name="date"
          value={dateValue}
          onChange={onChangeDateValue}
          type="datetime-local"
          required
          disabled={isLoading}
        />
        <TextArea
          name="notes"
          value={notesValue}
          onChange={onChangeNotesValue}
          disabled={isLoading}
        />
        <button disabled={isLoading} type="submit" className={styles.button}>
          Save
        </button>
        <div className={styles.error}>{error}</div>
      </form>
    </section>
  );
}

export default Form;
