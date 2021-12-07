import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useQuery from '../../../Hooks/useQuery';
import styles from './form.module.css';
import Modal from '../modal/modal.js';
import Button from '../../Shared/Button';

let fetchMethod = 'POST';

function Form() {
  const [nameValue, setNameValue] = useState('');
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const query = useQuery();
  const history = useHistory();

  const getAdminById = () => {
    fetch(`${process.env.REACT_APP_API}/admins?_id=${query.get('_id')}`)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        const { name, username, password } = response.data[0];
        setNameValue(name);
        setUsernameValue(username);
        setPasswordValue(password);
      })
      .catch((err) => {
        setError(err.toString());
      });
  };

  let url;
  useEffect(() => {
    if (query.get('_id')) {
      url = `${process.env.REACT_APP_API}/admins?_id=${query.get('_id')}`;
      fetchMethod = 'PUT';
      getAdminById();
    }
  }, []);

  const save = (e) => {
    e.preventDefault();

    const options = {
      method: fetchMethod,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nameValue,
        username: usernameValue,
        password: passwordValue
      })
    };

    if (query.get('_id')) {
      fetchMethod = 'PUT';
      url = `${process.env.REACT_APP_API}/admins/${query.get('_id')}`;
      getAdminById();
    } else {
      fetchMethod = 'POST';
      url = `${process.env.REACT_APP_API}/admins`;
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
        history.push('/admins');
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <form className={styles.container} onSubmit={save}>
      <h2 className={styles.title}>Form</h2>
      <div className={styles.inputCnt}>
        <label className={styles.labelTitle}>Name</label>
        <input
          className={styles.inputBox}
          disabled={isLoading}
          type="text"
          name="name"
          placeholder="Paul"
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
          required
        ></input>
      </div>
      <div className={styles.inputCnt}>
        <label className={styles.labelTitle}>User Name</label>
        <input
          className={styles.inputBox}
          disabled={isLoading}
          type="text"
          name="username"
          placeholder="Paul.Walker"
          value={usernameValue}
          onChange={(e) => setUsernameValue(e.target.value)}
          required
        ></input>
      </div>
      <div className={styles.inputCnt}>
        <label className={styles.labelTitle}>Password</label>
        <input
          className={styles.inputBox}
          disabled={isLoading}
          type="password"
          name="name"
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
          required
        ></input>
      </div>
      <Button name="saveButton" disabled={isLoading}></Button>
      {error && (
        <Modal>
          {`${error}`}
          <button className={styles.button} onClick={() => setError(false)}>
            Close
          </button>
        </Modal>
      )}
    </form>
  );
}

export default Form;
