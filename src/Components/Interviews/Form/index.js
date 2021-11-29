import { useEffect, useState } from 'react';
import styles from './form.module.css';

function Form() {
  const [postulantIdValue, setPostulantIdValue] = useState('');
  const [clientIdValue, setClientIdValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [applicationIdValue, setApplicationValue] = useState('');
  const [notesValue, setNotesValue] = useState('');
  const [postulantsValue, setPostulantsValue] = useState([]);
  const [clientsValue, setClientsValue] = useState([]);
  let fetchMethod = 'POST';

  const onLoading = (dat) => {
    setPostulantIdValue(dat.data[0].postulant._id);
    setClientIdValue(dat.data[0].client._id);
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
    setApplicationValue(event.target.value);
  };

  const onChangeNotes = (event) => {
    setNotesValue(event.target.value);
  };

  const params = new URLSearchParams(window.location.search);
  const interviewId = params.get('_id');
  const url1 = `${process.env.REACT_APP_API}/interviews/${interviewId}`;

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
    console.log(url);

    fetch(url, options)
      .then((response) => {
        console.log('entre aca');
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        console.log('response', response);
        return response.json();
      })
      .then((res) => {
        console.log('res', res);
      })
      .catch((error) => {
        console.log('err', error);
      });
  };
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/postulants`)
      .then((response) => response.json())
      .then((res) => {
        setPostulantsValue(res.data);
        if (!interviewId) {
          setPostulantIdValue(res.data[0]._id);
        }
      });

    fetch(`${process.env.REACT_APP_API}/clients`)
      .then((response) => response.json())
      .then((res) => {
        setClientsValue(res.data);
        if (!interviewId) {
          setClientIdValue(res.data[0]._id);
        }
      });

    if (interviewId) {
      fetch(url1)
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
          <span>Postulant Id</span>
        </label>
        <select
          id="postulantId"
          name="postulantId"
          type="text"
          required
          value={postulantIdValue}
          onChange={onChangePostulantId}
        >
          {postulantsValue.map((postulant) => {
            return (
              <option value={postulant._id} key={postulant._id}>
                {postulant.firstName}
              </option>
            );
          })}
        </select>
        <label>
          <span>Client Id</span>
        </label>
        <select
          id="clientId"
          name="clientId"
          type="text"
          required
          value={clientIdValue}
          onChange={onChangeClientId}
        >
          {clientsValue.map((client) => {
            return (
              <option value={client._id} key={client._id}>
                {client.name}
              </option>
            );
          })}
          ;
        </select>
        <label>
          <span>Status</span>
        </label>
        <select
          id="status"
          name="status"
          type="text"
          required
          value={statusValue}
          onChange={onChangeStatus}
        >
          <option value="successful">Successful</option>
          <option value="failed">Failed</option>
          <option value="cancelled">Cancelled</option>
          <option value="assigned">Assigned</option>
          <option value="confirmed">Confirmed</option>
        </select>
        <label>
          <span>Date</span>
        </label>
        <input
          id="date"
          name="date"
          type="datetime-local"
          required
          value={dateValue}
          onChange={onChangeDate}
        />
        <label>
          <span>Application Id</span>
        </label>
        <input
          id="application"
          name="application"
          type="text"
          required
          value={applicationIdValue}
          onChange={onChangeApplication}
        />
        <label>
          <span>Notes</span>
        </label>
        <input
          id="notes"
          name="notes"
          type="text"
          required
          value={notesValue}
          onChange={onChangeNotes}
        />
        <button id="saveButton" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}

export default Form;
