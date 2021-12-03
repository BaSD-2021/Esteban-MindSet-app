import { useState, useEffect } from 'react';
import styles from './form.module.css';
import Modal from '../modal/modal';

const params = new URLSearchParams(window.location.search);
const adminId = params.get('_id');
let fetchMethod = 'POST';

function Form() {
  const [nameValue, setNameValue] = useState('');
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const getAdminById = () => {
    fetch(`${process.env.REACT_APP_API}/admins?_id=${adminId}`)
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
    if (adminId) {
      url = `${process.env.REACT_APP_API}/admins?_id=${adminId}`;
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

    if (adminId) {
      fetchMethod = 'PUT';
      url = `${process.env.REACT_APP_API}/admins/${adminId}`;
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
        window.location.href = '/admins';
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form className={styles.container} onSubmit={save}>
      <h2>Form</h2>
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
      <button type="submit" disabled={isLoading} className={styles.button}>
        Register
      </button>
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
