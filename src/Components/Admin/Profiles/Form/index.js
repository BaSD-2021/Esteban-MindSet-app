import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useQuery from 'Hooks/useQuery';
import styles from './form.module.css';
import Input from 'Components/Shared/Input';
import Button from 'Components/Shared/Button';

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
          setLoading(false);
        })
        .catch((error) => {
          setError(error.toString());
        });
    }
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
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
        history.push('/profiles');
      })
      .catch((error) => {
        setError(error.toString());
      });
  };

  return (
    <div className={styles.container}>
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
