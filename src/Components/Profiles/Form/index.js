import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useQuery from '../../../Hooks/useQuery';
import Input from '../Input';
import styles from './form.module.css';

function profilesForm() {
  const [profileValue, setProfileValue] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const query = useQuery();
  const history = useHistory();

  const onChangeProfileInput = (event) => {
    setProfileValue(event.target.value);
  };

  useEffect(() => {
    setLoading(true);
    const profileId = query.get('_id');
    if (profileId) {
      fetch(`${process.env.REACT_APP_API}/profiles?_id=${profileId}`)
        .then((response) => {
          if (response.status !== 200) {
            return response.json().then(({ message }) => {
              throw new Error(message);
            });
          }
          return response.json();
        })
        .then((response) => {
          setProfileValue(response.data[0].name);
        })
        .catch((error) => {
          setError(error.toString());
        })
        .finally(() => setLoading(false));
    }
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const profileId = query.get('_id');

    let url;
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: profileValue
      })
    };

    if (profileId) {
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API}/profiles/${profileId}`;
    } else {
      options.method = 'POST';
      url = `${process.env.REACT_APP_API}/profiles`;
    }

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
        history.push('/profiles');
      })
      .catch((error) => {
        setError(error.toString());
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <div>
          <h2>Profile Form</h2>
          <Input
            name="profile"
            value={profileValue}
            onChange={onChangeProfileInput}
            type="text"
            disabled={isLoading}
            required
          />
        </div>
        <button type="submit" className={styles.button}>
          Save
        </button>
        <div className={styles.error}>{error}</div>
      </form>
    </div>
  );
}

export default profilesForm;
