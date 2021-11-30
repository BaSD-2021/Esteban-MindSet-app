import { useEffect, useState } from 'react';
import styles from './form.module.css';

function Form() {
  const [postulantIdValue, setPostulantIdValue] = useState('');
  const [clientIdValue, setClientIdValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [applicationIdValue, setApplicationIdValue] = useState('');
  const [notesValue, setNotesValue] = useState('');
  const [postulantsValue, setPostulantsValue] = useState([]);
  const [clientsValue, setClientsValue] = useState([]);
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

  const params = new URLSearchParams(window.location.search);
  const interviewId = params.get('_id');
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
        window.location.href = `${window.location.origin}/interviews`;
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
      })
      .catch((error) => {
        console.log('err', error);
      });

    fetch(`${process.env.REACT_APP_API}/clients`)
      .then((response) => response.json())
      .then((res) => {
        setClientsValue(res.data);
      })
      .catch((error) => {
        console.log('err', error);
      });

    if (interviewId) {
      fetch(url1)
        .then((response) => response.json())
        .then((res) => {
          onLoading(res);
        })
        .catch((error) => {
          console.log('err', error);
        });
    }
  }, []);
  return (
    <div>
      <form onSubmit={onSubmit} className={styles.container}>
        <h2>Interview</h2>
        <label className={styles.label}>
          <span className={styles.span}>Postulant Name</span>
        </label>
        <select
          id="postulantId"
          name="postulantId"
          type="text"
          required
          value={postulantIdValue}
          onChange={onChangePostulantId}
          className={styles.input}
        >
          <option value={''} disabled>
            {'Select one'}
          </option>
          {postulantsValue.map((postulant) => {
            return (
              <option value={postulant._id} key={postulant._id}>
                {`${postulant.firstName} + ' ' + ${postulant.lastName}`}
              </option>
            );
          })}
        </select>
        <label className={styles.label}>
          <span className={styles.span}>Client Name</span>
        </label>
        <select
          id="clientId"
          name="clientId"
          type="text"
          required
          value={clientIdValue}
          onChange={onChangeClientId}
          className={styles.input}
        >
          <option value={''} disabled>
            {'Select one'}
          </option>
          {clientsValue.map((client) => {
            return (
              <option value={client._id} key={client._id}>
                {client.name}
              </option>
            );
          })}
          ;
        </select>
        <label className={styles.label}>
          <span className={styles.span}>Status</span>
        </label>
        <select
          id="status"
          name="status"
          type="text"
          required
          value={statusValue}
          onChange={onChangeStatus}
          className={styles.input}
        >
          <option value={''} disabled>
            {'Select one'}
          </option>
          <option value="successful">Successful</option>
          <option value="failed">Failed</option>
          <option value="cancelled">Cancelled</option>
          <option value="assigned">Assigned</option>
          <option value="confirmed">Confirmed</option>
        </select>
        <label className={styles.label}>
          <span className={styles.span}>Date</span>
        </label>
        <input
          id="date"
          name="date"
          type="datetime-local"
          required
          value={dateValue}
          onChange={onChangeDate}
          className={styles.input}
        />
        <label className={styles.label}>
          <span className={styles.span}>Application Id</span>
        </label>
        <input
          id="application"
          name="application"
          type="text"
          required
          value={applicationIdValue}
          onChange={onChangeApplication}
          className={styles.input}
        />
        <label className={styles.label}>
          <span className={styles.span}>Notes</span>
        </label>
        <input
          id="notes"
          name="notes"
          type="text"
          required
          value={notesValue}
          onChange={onChangeNotes}
          className={styles.input}
        />
        <button id="saveButton" type="submit" className={styles.button}>
          Save
        </button>
      </form>
    </div>
  );
}

export default Form;
