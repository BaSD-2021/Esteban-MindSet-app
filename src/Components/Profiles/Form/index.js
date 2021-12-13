import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useQuery from '../../../Hooks/useQuery';
import styles from './form.module.css';
import Input from '../../Shared/Input';
import Button from '../../Shared/Button';
import Modal from '../../Shared/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileById, createProfile, updateProfile } from '../../../redux/profiles/thunks';
import { cleanError } from '../../../redux/profiles/actions';

function profilesForm() {
  const [profileValue, setProfileValue] = useState('');
  const [isLoading, setLoading] = useState(false);
  const query = useQuery();
  const history = useHistory();
  const dispatch = useDispatch();
  const selectedProfile = useSelector((store) => store.selectedItem);
  const error = useSelector((store) => store.profiles.error);

  const onChangeProfileInput = (event) => {
    setProfileValue(event.target.value);
  };

  useEffect(() => {
    const profileId = query.get('_id');
    if (profileId) {
      dispatch(getProfileById(profileId)).then((response) => {
        setProfileValue(response.name);
      });
    }
  }, [selectedProfile]);

  const onSubmit = (event) => {
    event.preventDefault();
    const profileId = query.get('_id');

    const body = {
      name: profileValue
    };
    if (profileId) {
      dispatch(updateProfile(profileId, body));
    } else {
      dispatch(createProfile(body));
    }
    history.replace('/profiles');

    setLoading(true);
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
            value={profileValue}
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
