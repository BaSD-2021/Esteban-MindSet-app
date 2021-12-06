/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useQuery from '../../../Hooks/useQuery';
import styles from './form.module.css';
import Input from '../../Shared/Input';
import Button from '../../Shared/Button';
import Select from '../../Shared/Select';

function Form() {
  const [positionId, setPositionId] = useState('');
  const [postulantId, setPostulantId] = useState('');
  const [date, setDate] = useState('');
  const [result, setResult] = useState('');
  const [positions, setPositions] = useState([]);
  const [postulants, setPostulants] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [arrayPositionsValue, setArrayPositionsValue] = useState([]);
  const [arrayPostulantsValue, setArrayPostulantsValue] = useState([]);
  const [arrayDateValue, setArrayDateValue] = useState([]);
  const query = useQuery();
  const history = useHistory();

  const applicationId = query.get('_id');
  let fetchMethod = 'POST';

  const selectPositionsId = (data) => {
    const array = [];
    data.map((generic) => {
      array.push(generic._id);
    });
    setArrayPositionsValue(array);
  };

  const selectPostulantsId = (data) => {
    const array = [];
    data.map((generic) => {
      array.push(generic._id);
    });
    setArrayPostulantsValue(array);
  };

  const selectDateId = (data) => {
    const array = [];
    data.map((generic) => {
      array.push(generic._id);
    });
    setArrayDateValue(array);
  };

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
        history.push('/applications');
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
        selectPositionsId(res.data);
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
        selectPostulantsId(res.data);
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
        selectDateId(res.data);
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
        <h2 className={styles.title}>Form</h2>
        <Select
          title="Position"
          id="positionId"
          name="positionId"
          value={positionId}
          onChange={onChangePositionId}
          arrayToMap={arrayPositionsValue}
          required
        />
        <Select
          title="Postulant"
          id="postulantId"
          name="postulantId"
          value={postulantId}
          onChange={onChangePostulantId}
          arrayToMap={arrayPostulantsValue}
          required
        />
        <Select
          title="Interview"
          id="interview"
          name="interview"
          value={date}
          onChange={onChangeDate}
          arrayToMap={arrayDateValue}
          required
        />
        <Input
          title="Result"
          id="result"
          name="result"
          type="text"
          required
          value={result}
          onChange={onChangeResult}
        />
        <div id="error_message" className={styles.errorMessage}>
          {errorMessage.message}
        </div>
        <Button name="saveButton" />
      </form>
    </div>
  );
}
export default Form;
