import { useState, useEffect } from 'react';
import styles from './form.module.css';

const params = new URLSearchParams(window.location.search);
const adminId = params.get('_id');
let fetchMethod = 'POST';
let url = `${process.env.REACT_APP_API}/admins`;

function Form() {
  const [nameValue, setNameValue] = useState('');
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const getAdminById = () => {
    fetch(`${process.env.REACT_APP_API}/admins/${adminId}`)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        const { name, username, password } = response.data;
        setNameValue(name);
        setUsernameValue(username);
        setPasswordValue(password);
      })
      .catch((error) => {
        console.log('err', error);
      });
  };

  useEffect(() => {
    if (adminId) {
      url += `/${adminId}`;
      fetchMethod = 'PUT';
      getAdminById();
    }
  }, []);

  const save = (e) => {
    e.preventDefault();
    fetch(url, {
      method: fetchMethod,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nameValue,
        username: usernameValue,
        password: passwordValue
      })
    })
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        window.location.href = '/admins';
      })
      .catch((error) => {
        console.log('err', error);
      });
  };

  return (
    <form className={styles.container} onSubmit={save}>
      <h2>Form</h2>
      <div className={styles.inputCnt}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Paul"
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
          required
        ></input>
      </div>
      <div className={styles.inputCnt}>
        <label>User Name</label>
        <input
          type="text"
          name="username"
          placeholder="Paul.Walker"
          value={usernameValue}
          onChange={(e) => setUsernameValue(e.target.value)}
          required
        ></input>
      </div>
      <div className={styles.inputCnt}>
        <label>Password</label>
        <input
          type="text"
          name="name"
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
          required
        ></input>
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export default Form;
