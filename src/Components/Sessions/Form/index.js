import { useEffect, useState } from 'react';
import styles from './form.module.css';
import Input from '../Input';

function sessionsForm() {
  const [dateValue, setDateValue] = useState('');
  const [postulantValue, setPostulantValue] = useState('');
  const [psychoValue, setPsychoValue] = useState('');
  const [statusValue, setStatusValue] = useState('');

  const onLoading = (dat) => {
    setDateValue(dat.data[0].date);
    setPostulantValue(dat.data[0].postulant);
    setPsychoValue(dat.data[0].psychologist._id);
    setStatusValue(dat.data[0].status);
  };

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
    console.log(event.target.value);
  };

  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get('_id');

  useEffect(() => {
    if (sessionId) {
      fetch(`${process.env.REACT_APP_API}/session/id/${sessionId}`)
        .then((response) => {
          if (response.status !== 200) {
            return response.json().then(({ message }) => {
              throw new Error(message);
            });
          }
          return response.json();
        })
        .then((response) => {
          setDateValue(response.date);
          setPostulantValue(response.postulant);
          setPsychoValue(response.psychologist);
          setStatusValue(response.status);
        });
    }
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();

    let url;
    console.log(dateValue);
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        date: dateValue,
        postulant: postulantValue,
        psychologist: psychoValue,
        status: statusValue,
        notes: ''
      })
    };

    if (sessionId === null) {
      options.method = 'POST';
      url = `${process.env.REACT_APP_API}/sessions/`;
      window.location.href = `/sessions`;
    } else {
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API}/sessions/?_id=${sessionId}`;
      window.location.href = `/sessions`;
    }
    console.log(options.body);
    fetch(url, options)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((res) => {
        if (sessionId) {
          onLoading(res);
        }
      })
      .catch((error) => {
        return error;
      });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h2>Session Form</h2>
        <label>Date:</label>
        <Input
          name="date"
          type="datetime-local"
          value={dateValue}
          onChange={onChangeDateInput}
          required
        />
        <label>Postulant:</label>
        <Input name="postulant" value={postulantValue} onChange={onChangePostulantInput} required />
        <label>Psychologist:</label>
        <Input name="psychologist" value={psychoValue} onChange={onChangePsychoInput} required />
        <label>Status:</label>
        <select
          className={styles.select}
          name="status"
          value={statusValue}
          onChange={onChangeStatusInput}
          required
        >
          <option value="assigned">Assigned</option>
          <option value="succesful">Successful</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
export default sessionsForm;
