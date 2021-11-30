import { useEffect, useState } from 'react';
import styles from './form.module.css';
function Form() {
  const [positionId, setPositionId] = useState('');
  const [postulantId, setPostulantId] = useState('');
  const [date, setDate] = useState('');
  const [result, setResult] = useState('');
  const [positions, setPositions] = useState([]);
  const [postulants, setPostulants] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const params = new URLSearchParams(window.location.search);
  const applicationId = params.get('_id');
  let fetchMethod = 'POST';

  const onLoading = (data) => {
    setPostulantId(data.data[0].postulants ? data.data[0].postulants._id : '');
    setPositionId(data.data[0].positions ? data.data[0].positions._id : '');
    setDate(data.data[0].interview ? data.data[0].interview._id : '');
    setResult(data.data[0].result);
  };
  const onChangePositionId = (event) => {
    setPositionId(event.target.value);
  };
  const onChangePostulantId = (event) => {
    setPostulantId(event.target.value);
  };
  const onChangeDate = (event) => {
    setDate(event.target.value);
  };
  const onChangeResult = (event) => {
    setResult(event.target.value);
  };

  if (applicationId) {
    fetchMethod = 'PUT';
  }

  const onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const params = new URLSearchParams(window.location.search);
    const applicationId = params.get('_id');
    const options = {
      method: fetchMethod,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        positions: positionId,
        postulants: postulantId,
        interview: date,
        result: result
      })
    };
    const url = applicationId
      ? `${process.env.REACT_APP_API}/applications/${applicationId}`
      : `${process.env.REACT_APP_API}/applications/`;
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
        window.location.href = '/applications';
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/positions`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((res) => {
        setPositions(res.data);
      })
      .catch((err) => {
        setErrorMessage(err);
      });
    fetch(`${process.env.REACT_APP_API}/postulants`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((res) => {
        setPostulants(res.data);
      })
      .catch((err) => {
        setErrorMessage(err);
      });
    fetch(`${process.env.REACT_APP_API}/interviews`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((res) => {
        setInterviews(res.data);
      })
      .catch((err) => {
        setErrorMessage(err);
      });
    if (applicationId) {
      fetch(`${process.env.REACT_APP_API}/applications?_id=${applicationId}`)
        .then((response) => {
          if (response.status !== 200) {
            return response.json().then(({ message }) => {
              throw new Error(message);
            });
          }
          return response.json();
        })
        .then((res) => {
          onLoading(res);
        })
        .catch((err) => {
          setErrorMessage(err);
        });
    }
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit} className={styles.container}>
        <h2 className={styles.subtitle}>Form</h2>
        <label className={styles.label}>
          <span>Position</span>
        </label>
        <select
          id="positionId"
          name="positionId"
          required
          value={positionId}
          onChange={onChangePositionId}
          className={styles.selectInput}
        >
          <option value={''} disabled>
            {'--Select an Option--'}
          </option>
          {positions.map((position) => {
            return (
              <option value={position._id} key={position._id}>
                {position.jobDescription}
              </option>
            );
          })}
        </select>
        <label className={styles.label}>
          <span>Postulant</span>
        </label>
        <select
          id="clientId"
          name="clientId"
          required
          value={postulantId}
          onChange={onChangePostulantId}
          className={styles.selectInput}
        >
          <option value={''} disabled>
            {'--Select an Option--'}
          </option>
          {postulants.map((postulant) => {
            return (
              <option value={postulant._id} key={postulant._id}>
                {postulant.firstName + ' ' + postulant.lastName}
              </option>
            );
          })}
        </select>
        <label className={styles.label}>
          <span>Interview</span>
        </label>
        <select
          id="interview"
          name="interview"
          value={date}
          onChange={onChangeDate}
          className={styles.selectInput}
        >
          <option value={''} disabled>
            {'--Select an Option--'}
          </option>
          {interviews.map((interview) => {
            return (
              <option value={interview._id} key={interview._id}>
                {interview.date}
              </option>
            );
          })}
        </select>
        <label className={styles.label}>
          <span>Result</span>
        </label>
        <input
          id="result"
          name="result"
          type="text"
          required
          value={result}
          onChange={onChangeResult}
          className={styles.selectInput}
        />
        <div id="error_message" className={styles.errorMessage}>
          {errorMessage.message}
        </div>
        <button id="saveButton" type="submit" className={styles.button}>
          Save
        </button>
      </form>
    </div>
  );
}
export default Form;
