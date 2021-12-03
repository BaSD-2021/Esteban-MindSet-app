import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useQuery from '../../../Hooks/useQuery';
import styles from './form.module.css';

function Form() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [logo, setLogo] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const query = useQuery();
  const history = useHistory();

  const clientId = query.get('_id');
  let fetchMethod = 'POST';

  const onLoading = (data) => {
    setName(data.data[0].name ? data.data[0].name : '');
    setPhone(data.data[0].phone ? data.data[0].phone : '');
    setCountry(data.data[0].location ? data.data[0].location.country : '');
    setState(data.data[0].location ? data.data[0].location.state : '');
    setCity(data.data[0].location ? data.data[0].location.city : '');
    setAddress(data.data[0].location ? data.data[0].location.address : '');
    setLogo(data.data[0].logo ? data.data[0].logo : '');
    setDescription(data.data[0].description ? data.data[0].description : '');
  };
  const onChangeName = (event) => {
    setName(event.target.value);
  };
  const onChangePhone = (event) => {
    setPhone(event.target.value);
  };
  const onChangeCountry = (event) => {
    setCountry(event.target.value);
  };
  const onChangeState = (event) => {
    setState(event.target.value);
  };
  const onChangeCity = (event) => {
    setCity(event.target.value);
  };
  const onChangeAddress = (event) => {
    setAddress(event.target.value);
  };
  const onChangeLogo = (event) => {
    setLogo(event.target.value);
  };
  const onChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  if (clientId) {
    fetchMethod = 'PUT';
  }

  const onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // const params = new URLSearchParams(window.location.search);
    // const clientId = params.get('_id');
    const options = {
      method: fetchMethod,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        phone: parseInt(phone),
        location: {
          country: country,
          state: state,
          city: city,
          address: address
        },
        logo: logo,
        description: description
      })
    };
    const url = clientId
      ? `${process.env.REACT_APP_API}/clients/${clientId}`
      : `${process.env.REACT_APP_API}/clients/`;
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
        history.push('/clients');
      })
      .catch((err) => {
        setErrorMessage(err);
      });
  };

  useEffect(() => {
    if (clientId) {
      fetch(`${process.env.REACT_APP_API}/clients?_id=${clientId}`)
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
        <h2 className={styles.subtitle}>Form</h2>
        <label className={styles.label}>
          <span>Name</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={name}
          onChange={onChangeName}
          className={styles.inputStyle}
        />
        <label className={styles.label}>
          <span>Phone</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="number"
          required
          value={phone}
          onChange={onChangePhone}
          className={styles.inputStyle}
        />
        <label className={styles.label}>
          <span>Country</span>
        </label>
        <input
          id="country"
          name="country"
          type="text"
          required
          value={country}
          onChange={onChangeCountry}
          className={styles.inputStyle}
        />
        <label className={styles.label}>
          <span>State</span>
        </label>
        <input
          id="state"
          name="state"
          type="text"
          required
          value={state}
          onChange={onChangeState}
          className={styles.inputStyle}
        />
        <label className={styles.label}>
          <span>City</span>
        </label>
        <input
          id="city"
          name="city"
          required
          type="text"
          value={city}
          onChange={onChangeCity}
          className={styles.inputStyle}
        />
        <label className={styles.label}>
          <span>Address</span>
        </label>
        <input
          id="address"
          name="address"
          required
          type="text"
          value={address}
          onChange={onChangeAddress}
          className={styles.inputStyle}
        />
        <label className={styles.label}>
          <span>Logo</span>
        </label>
        <input
          id="logo"
          name="logo"
          type="text"
          value={logo}
          onChange={onChangeLogo}
          className={styles.inputStyle}
        />
        <label className={styles.label}>
          <span>Description</span>
        </label>
        <input
          id="description"
          name="description"
          type="text"
          value={description}
          onChange={onChangeDescription}
          className={styles.inputStyle}
        />
        <button id="saveButton" type="submit" className={styles.button}>
          Save
        </button>
      </form>
      <div id="error_message" className={styles.errorMessage}>
        {errorMessage.message}
      </div>
    </div>
  );
}
export default Form;
