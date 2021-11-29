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

  const params = new URLSearchParams(window.location.search);
  const applicationId = params.get('_id');
  let fetchMethod = 'POST';
  let disableButton = false;

  const onLoading = (data) => {
    setPostulantId(data.data[0].postulants ? data.data[0].postulants._id : '');
    setPositionId(data.data[0].positions ? data.data[0].positions._id : '');
    setDate(data.data[0].interview ? data.data[0].interview.date : '');
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
    disableButton = true;
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
        console.log('err', error);
      });
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/positions`)
      .then((response) => response.json())
      .then((res) => {
        setPositions(res.data);
      });
    fetch(`${process.env.REACT_APP_API}/postulants`)
      .then((response) => response.json())
      .then((res) => {
        setPostulants(res.data);
      });
    fetch(`${process.env.REACT_APP_API}/interviews`)
      .then((response) => response.json())
      .then((res) => {
        setInterviews(res.data);
      });
    if (applicationId) {
      fetch(`${process.env.REACT_APP_API}/applications?_id=${applicationId}`)
        .then((response) => response.json())
        .then((res) => {
          onLoading(res);
        });
    }
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit} className={styles.container}>
        <h2>Form</h2>
        <label>
          <span>Position</span>
        </label>
        <select
          id="positionId"
          name="positionId"
          type="text"
          required
          value={positionId}
          onChange={onChangePositionId}
        >
          {positions.map((position) => {
            return (
              <option value={position._id} key={position._id}>
                {position.jobDescription}
              </option>
            );
          })}
        </select>
        <label>
          <span>Postulant</span>
        </label>
        <select
          id="clientId"
          name="clientId"
          type="text"
          required
          value={postulantId}
          onChange={onChangePostulantId}
        >
          {postulants.map((postulant) => {
            return (
              <option value={postulant._id} key={postulant._id}>
                {postulant.firstName + ' ' + postulant.lastName}
              </option>
            );
          })}
        </select>
        <label>
          <span>Interview</span>
        </label>
        <select id="interview" name="interview" type="text" value={date} onChange={onChangeDate}>
          {interviews.map((interview) => {
            return (
              <option value={interview._id} key={interview._id}>
                {interview.date}
              </option>
            );
          })}
        </select>
        <label>
          <span>Result</span>
        </label>
        <input
          id="result"
          name="result"
          type="text"
          required
          value={result}
          onChange={onChangeResult}
        />
        <button id="saveButton" type="submit" disabled={disableButton}>
          Save
        </button>
      </form>
    </div>
  );
}
export default Form;
