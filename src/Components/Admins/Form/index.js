import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useQuery from 'Hooks/useQuery';
import styles from './form.module.css';
import Input from 'Components/Shared/Input';
import Modal from 'Components/Shared/Modal';
import Button from 'Components/Shared/Button';
import { useDispatch, useSelector } from 'react-redux';
import { createAdmin, getAdminById, updateAdmin } from 'redux/admins/thunks';
import { cleanError, cleanSelectedItem } from 'redux/admins/actions';

function Form() {
  // Keep using the React States to handle the input values
  const [nameValue, setNameValue] = useState('');
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  // get the Redux store values we need in the component
  const error = useSelector((store) => store.admins.error);
  const isLoading = useSelector((store) => store.admins.isFetching);
  const selectedItem = useSelector((store) => store.admins.selectedItem);

  // get the dispatcher to be able to dispatch Redux actions
  const dispatch = useDispatch();

  const query = useQuery();
  const history = useHistory();

  useEffect(() => {
    const adminId = query.get('_id');
    if (adminId) {
      // Dispatch (execute) the Redux action to get the admin by id
      dispatch(getAdminById(adminId));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(selectedItem).length) {
      setNameValue(selectedItem.name);
      setUsernameValue(selectedItem.username);
      setPasswordValue(selectedItem.password);
    }
  }, [selectedItem]);

  useEffect(() => {
    // return a function to dispatch "cleanSelectedItem" action when the component
    // is unmounted, cleaning the "selectedItem" in Redux
    return () => {
      dispatch(cleanSelectedItem());
    };
  }, []);

  const save = (e) => {
    e.preventDefault();

    const adminId = query.get('_id');

    if (adminId) {
      // Dispatch (execute) the Redux action to update an admin
      dispatch(
        updateAdmin(adminId, {
          name: nameValue,
          username: usernameValue,
          password: passwordValue
        })
      ).then((response) => {
        // Redirect to the admin list when the async action is ended
        // If exists a response means the request was ok
        if (response) {
          history.push('/admins');
        }
      });
    } else {
      // Dispatch (execute) the Redux action to create an admin
      dispatch(
        createAdmin({
          name: nameValue,
          username: usernameValue,
          password: passwordValue
        })
      ).then((response) => {
        // Redirect to the admin list when the async action is ended
        // If exists a response means the request was ok
        if (response) {
          history.push('/admins');
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
        <Button label="Save" disabled={isLoading} type="submit" />
      </div>
      <Modal
        // The Error Modal is shown when an error exist in Redux
        show={!!error}
        title="Error"
        message={error}
        cancel={{
          text: 'Close',
          // Dispatch (execute) the cleanError action to remove the error in Redux
          // and hide the modal
          callback: () => dispatch(cleanError())
        }}
      />
    </form>
  );
}

export default Form;
