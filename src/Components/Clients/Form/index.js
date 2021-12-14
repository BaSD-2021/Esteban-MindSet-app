import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useQuery from '../../../Hooks/useQuery';
import styles from './form.module.css';
import Input from '../../Shared/Input';
import Button from '../../Shared/Button';
import Modal from '../../Shared/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getClientById, createClient, updateClient } from '../../../redux/clients/thunks';
import { cleanError, cleanSelectedItem } from '../../../redux/clients/actions';

function Form() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [logo, setLogo] = useState('');
  const [description, setDescription] = useState('');
  const query = useQuery();
  const history = useHistory();
  const dispatch = useDispatch();
  const selectedClient = useSelector((store) => store.clients.selectedItem);
  const error = useSelector((store) => store.clients.error);
  const isLoading = useSelector((store) => store.clients.isFetching);

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

  useEffect(() => {
    const clientId = query.get('_id');
    if (clientId) {
      dispatch(getClientById(clientId));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(selectedClient).length) {
      setName(selectedClient.name);
      setPhone(selectedClient.phone);
      setCountry(selectedClient.location.country);
      setState(selectedClient.location.state);
      setCity(selectedClient.location.city);
      setAddress(selectedClient.location.address);
      setLogo(selectedClient.logo);
      setDescription(selectedClient.description);
    }
  }, [selectedClient]);

  useEffect(() => {
    return () => {
      dispatch(cleanSelectedItem());
    };
  }, []);

  const onSubmit = (event) => {
    const clientId = query.get('_id');
    event.preventDefault();
    event.stopPropagation();
    const body = {
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
    };
    if (clientId) {
      dispatch(updateClient(clientId, body)).then((response) => {
        if (response) {
          history.push('/clients');
        }
      });
    } else {
      dispatch(createClient(body)).then((response) => {
        if (response) {
          history.push('/clients');
        }
      });
    }
  };

  return (
    <div>
      <Modal
        show={!!error}
        title="Error"
        message={error}
        cancel={{
          text: 'Close',
          callback: () => dispatch(cleanError())
        }}
      />
      <form onSubmit={onSubmit} className={styles.container}>
        <h2 className={styles.title}>Client</h2>
        <Input
          title="Name"
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={onChangeName}
          disabled={isLoading}
          required
        />
        <Input
          title="Phone"
          id="phone"
          name="phone"
          type="number"
          value={phone}
          onChange={onChangePhone}
          disabled={isLoading}
          required
        />
        <Input
          title="Country"
          id="country"
          name="country"
          type="text"
          value={country}
          onChange={onChangeCountry}
          disabled={isLoading}
          required
        />
        <Input
          title="State"
          id="state"
          name="state"
          type="text"
          value={state}
          onChange={onChangeState}
          disabled={isLoading}
          required
        />
        <Input
          title="City"
          id="city"
          name="city"
          type="text"
          value={city}
          onChange={onChangeCity}
          disabled={isLoading}
          required
        />
        <Input
          title="Address"
          id="address"
          name="address"
          type="text"
          value={address}
          onChange={onChangeAddress}
          disabled={isLoading}
          required
        />
        <Input
          title="Logo"
          id="logo"
          name="logo"
          type="text"
          value={logo}
          onChange={onChangeLogo}
          disabled={isLoading}
        />
        <Input
          title="Description"
          id="description"
          name="description"
          type="text"
          value={description}
          onChange={onChangeDescription}
          disabled={isLoading}
        />
        <div className={styles.buttonContainer}>
          <Button label="SAVE" disabled={isLoading} type="submit"></Button>
        </div>
      </form>
    </div>
  );
}
export default Form;
