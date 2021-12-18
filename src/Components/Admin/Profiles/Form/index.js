import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useQuery from 'Hooks/useQuery';
import styles from './form.module.css';
import Input from 'Components/Shared/Input';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileById, createProfile, updateProfile } from 'redux/profiles/thunks';
import { cleanError, cleanSelectedItem } from 'redux/profiles/actions';

function profilesForm() {
  const [nameValue, setNameValue] = useState('');
  const query = useQuery();
  const history = useHistory();
  const dispatch = useDispatch();
  const selectedProfile = useSelector((store) => store.profiles.selectedItem);
  const error = useSelector((store) => store.profiles.error);
  const isLoading = useSelector((store) => store.admins.isFetching);

  const onChangeProfileInput = (event) => {
    setNameValue(event.target.value);
  };

  useEffect(() => {
    const profileId = query.get('_id');
    if (profileId) {
      dispatch(getProfileById(profileId));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(selectedProfile).length) {
      setNameValue(selectedProfile.name);
    }
  }, [selectedProfile]);

  useEffect(() => {
    return () => {
      dispatch(cleanSelectedItem());
    };
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    const profileId = query.get('_id');

    const body = {
      name: nameValue
    };
    if (profileId) {
      dispatch(updateProfile(profileId, body)).then((response) => {
        if (response) {
          history.push('/admin/profiles/list');
        }
      });
    } else {
      dispatch(createProfile(body)).then((response) => {
        if (response) {
          history.push('/admin/profiles/list');
        }
      });
    }
  };

  return (
    <div className={styles.container}>
      <Modal
        show={!!error}
        title="Error"
        message={error}
        cancel={{
          text: 'Close',
          callback: () => dispatch(cleanError())
        }}
      />
      <form className={styles.form} onSubmit={onSubmit}>
        <div>
          <h2 className={styles.title}>Profile</h2>
          <Input
            title="Profile"
            name="profile"
            value={nameValue}
            onChange={onChangeProfileInput}
            type="text"
            disabled={isLoading}
            required
          />
        </div>
        <div className={styles.buttonContainer}>
          <Button label="SAVE" disabled={isLoading} type="submit"></Button>
        </div>
        <div className={styles.error}>{error}</div>
      </form>
    </div>
  );
}

export default profilesForm;
