import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useQuery from '../../../Hooks/useQuery';
import styles from './form.module.css';
import Input from '../../Shared/Input';
import Button from '../../Shared/Button';

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
        <Input
          title="Name"
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={onChangeName}
          required
        />
        <Input
          title="Phone"
          id="phone"
          name="phone"
          type="number"
          value={phone}
          onChange={onChangePhone}
          required
        />
        <Input
          title="Country"
          id="country"
          name="country"
          type="text"
          value={country}
          onChange={onChangeCountry}
          required
        />
        <Input
          title="State"
          id="state"
          name="state"
          type="text"
          value={state}
          onChange={onChangeState}
          required
        />
        <Input
          title="City"
          id="city"
          name="city"
          type="text"
          value={city}
          onChange={onChangeCity}
          required
        />
        <Input
          title="Adress"
          id="address"
          name="address"
          type="text"
          value={address}
          onChange={onChangeAddress}
          required
        />
        <Input
          title="Logo"
          id="logo"
          name="logo"
          type="text"
          value={logo}
          onChange={onChangeLogo}
        />
        <Input
          title="Description"
          id="description"
          name="description"
          type="text"
          value={description}
          onChange={onChangeDescription}
        />
        <Button name="saveButton" />
      </form>
      <div id="error_message" className={styles.errorMessage}>
        {errorMessage.message}
      </div>
    </div>
  );
}
export default Form;
