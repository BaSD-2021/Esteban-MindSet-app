/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useQuery from '../../../Hooks/useQuery';
import styles from './form.module.css';
import Input from '../../Shared/Input';
import Button from '../../Shared/Button';
import Select from '../../Shared/Select';

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
  const [arrayApplicationValue, setArrayApplicationValue] = useState([]);
  const [arrayClientsValue, setArrayClientsValue] = useState([]);
  const [arrayPostulantsValue, setArrayPostulantsValue] = useState([]);
  // const [arrayPostulantsName, setArrayPostulantsName] = useState([]);

  const query = useQuery();
  const history = useHistory();

  const selectApplicationId = (data) => {
    const array = [];
    data.map((generic) => {
      array.push(generic._id);
    });
    setArrayApplicationValue(array);
  };

  const selectClientsId = (data) => {
    const array = [];
    data.map((generic) => {
      array.push(generic._id);
    });
    setArrayClientsValue(array);
  };

  const selectPostulantsId = (data) => {
    const array = [];
    data.map((generic) => {
      array.push(generic._id);
    });
    setArrayPostulantsValue(array);
  };

  // const selectPostulantsName = (data) => {
  //   const array = [];
  //   data.map((generic) => {
  //     array.push(generic.firstName);
  //   });
  //   setArrayPostulantsName(array);
  //   console.log(setArrayPostulantsName);
  // };

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
      });
  };
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/postulants`)
      .then((response) => response.json())
      .then((res) => {
        selectPostulantsId(res.data);
        // selectPostulantsName(res.data);
        setPostulantsValue(res.data);
      })
      .catch((errorValue) => {
        setError(errorValue.toString());
      });

    fetch(`${process.env.REACT_APP_API}/clients`)
      .then((response) => response.json())
      .then((res) => {
        selectClientsId(res.data);
        setClientsValue(res.data);
      })
      .catch((errorValue) => {
        setError(errorValue.toString());
      });

    fetch(`${process.env.REACT_APP_API}/applications`)
      .then((response) => response.json())
      .then((res) => {
        selectApplicationId(res.data);
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
        <h2 className={styles.title}>Form</h2>
        <Select
          title="Postulant Name"
          id="postulantId"
          name="postulantId"
          type="text"
          required
          value={postulantIdValue}
          onChange={onChangePostulantId}
          arrayToMap={arrayPostulantsValue}
          // entityForShow={arrayPostulantsName}
        />
        <Select
          title="Client Name"
          id="clientId"
          name="clientId"
          required
          value={clientIdValue}
          onChange={onChangeClientId}
          arrayToMap={arrayClientsValue}
        />
        <Select
          title="Status"
          id="status"
          name="status"
          required
          value={statusValue}
          onChange={onChangeStatus}
          arrayToMap={['successful', 'failed', 'cancelled', 'assigned', 'confirmed']}
        />
        <Select
          title="Application ID"
          id="application"
          name="application"
          required
          value={applicationIdValue}
          onChange={onChangeApplication}
          arrayToMap={arrayApplicationValue}
        />
        <Input
          title="Date"
          id="date"
          name="date"
          type="datetime-local"
          value={dateValue}
          onChange={onChangeDate}
          required
        />
        <Input
          title="Notes"
          id="notes"
          name="notes"
          type="text"
          value={notesValue}
          onChange={onChangeNotes}
        />
        <Button name="saveButton" />
        <div className={styles.error}>{errorValue}</div>
      </form>
    </div>
  );
}

export default Form;
