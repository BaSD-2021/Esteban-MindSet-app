import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useQuery from 'Hooks/useQuery';
import styles from './form.module.css';
import Input from 'Components/Shared/Input';
import Modal from 'Components/Shared/Modal';
import Button from 'Components/Shared/Button';

import { useDispatch, useSelector } from 'react-redux';
import { createAdmin, getAdminById, updateAdmin } from 'redux/admins/thunks';
import { cleanError, cleanSelectedAdmin } from 'redux/admins/actions';

function Form() {
  const [nameValue, setNameValue] = useState('');
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const error = useSelector((store) => store.admins.error);
  const isLoading = useSelector((store) => store.admins.isFetching);
  const selectedAdmin = useSelector((store) => store.admins.selectedAdmin);

  const dispatch = useDispatch();

  const query = useQuery();
  const history = useHistory();

  useEffect(() => {
    const adminId = query.get('_id');
    if (adminId) {
      dispatch(getAdminById(adminId));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(selectedAdmin).length) {
      setNameValue(selectedAdmin.name);
      setUsernameValue(selectedAdmin.username);
      setPasswordValue(selectedAdmin.password);
    }
  }, [selectedAdmin]);

  useEffect(() => {
    return () => {
      dispatch(cleanSelectedAdmin());
    };
  }, []);

  const save = (e) => {
    e.preventDefault();

    const adminId = query.get('_id');

    if (adminId) {
      dispatch(
        updateAdmin(adminId, {
          name: nameValue,
          username: usernameValue,
          password: passwordValue
        })
      ).then((response) => {
        if (response) {
          history.push('/admin/admins/list');
        }
      });
    } else {
      dispatch(
        createAdmin({
          name: nameValue,
          username: usernameValue,
          password: passwordValue
        })
      ).then((response) => {
        if (response) {
          history.push('/admin/admins/list');
        }
      });
    }
  };

  return (
    <form className={styles.container} onSubmit={save}>
      <h2 className={styles.title}>Admin</h2>
      <Input
        title="Name"
        disabled={isLoading}
        type="text"
        name="name"
        placeholder="Paul Walker"
        value={nameValue}
        onChange={(e) => setNameValue(e.target.value)}
        required
      />
      <Input
        title="User Name"
        disabled={isLoading}
        type="text"
        name="username"
        placeholder="paul.walker"
        value={usernameValue}
        onChange={(e) => setUsernameValue(e.target.value)}
        required
      />
      <Input
        title="Password"
        disabled={isLoading}
        type="password"
        name="name"
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
        required
      />
      <div className={styles.buttonContainer}>
        <Button label="Save" disabled={isLoading} type="submit"></Button>
      </div>
      <Modal
        show={!!error}
        title="Error"
        message={error}
        cancel={{
          text: 'Close',
          callback: () => dispatch(cleanError())
        }}
      />
    </form>
  );
}

export default Form;
