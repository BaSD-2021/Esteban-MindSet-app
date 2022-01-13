import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useQuery from 'Hooks/useQuery';
import styles from './form.module.css';
import Input from 'Components/Shared/Input';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { getClientById, createClient, updateClient } from 'redux/clients/thunks';
import { cleanError, cleanSelectedItem } from 'redux/clients/actions';

function clientForm() {
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const query = useQuery();
  const history = useHistory();
  const dispatch = useDispatch();
  const selectedClient = useSelector((store) => store.clients.selectedItem);
  const error = useSelector((store) => store.clients.error);

  useEffect(() => {
    const clientId = query.get('_id');
    if (clientId) {
      dispatch(getClientById(clientId));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(selectedClient).length) {
      setCountry(selectedClient.location.country);
      setState(selectedClient.location.state);
      setCity(selectedClient.location.city);
      setAddress(selectedClient.location.address);
    }
  }, [selectedClient]);

  useEffect(() => {
    return () => {
      dispatch(cleanSelectedItem());
    };
  }, []);

  const onSubmit = (formValues) => {
    const clientId = query.get('_id');
    const body = {
      name: formValues.name,
      phone: parseInt(formValues.phone),
      location: {
        country: formValues.country,
        state: formValues.state,
        city: formValues.city,
        address: formValues.address
      },
      logo: formValues.logo,
      description: formValues.description
    };
    if (clientId) {
      dispatch(updateClient(clientId, body)).then((response) => {
        if (response) {
          history.push('/admin/clients/list');
        }
      });
    } else {
      dispatch(createClient(body)).then((response) => {
        if (response) {
          history.push('/admin/clients/list');
        }
      });
    }
  };

  const validate = (formValues) => {
    const errors = {};
    if (!formValues.name) {
      errors.name = 'Name is required';
    }
    if (formValues.name?.search(/[0-9%$#"!&/()=?¡]/) > 0) {
      errors.name = 'Name must contain only letters and a space between';
    }
    if (!formValues.phone) {
      errors.phone = 'Phone number is required';
    }
    if (`${formValues.phone}`.length < 8) {
      errors.phone = 'Phone number must have more than 7 digits';
    }
    if (!formValues.address) {
      errors.address = 'Address is required';
    }
    if (formValues.address?.search(/[0-9]/) < 0 || formValues.address?.search(/[a-zA-Z]/) < 0) {
      errors.address = 'Address must contain numbers and letters';
    } else if (formValues.address?.length < 6) {
      errors.address = 'Address must contain at least 6 characters';
    }
    return errors;
  };

  const validateLocation = (value) => {
    if (!value) {
      return 'Field is required';
    }
    if (value.search(/[0-9%$#"!&/()=?¡]/) > 0) {
      return 'Must contain only letters';
    }
    return undefined;
  };

  return (
    <div>
      <Modal
        show={!!error || !!error.message}
        title="Error"
        message={error || !!error.message}
        cancel={{
          text: 'Close',
          callback: () => dispatch(cleanError())
        }}
      />
      <Form
        onSubmit={onSubmit}
        validate={validate}
        initialValues={selectedClient}
        render={(formProps) => (
          <form onSubmit={formProps.handleSubmit} className={styles.container}>
            <h2 className={styles.title}>Client</h2>
            <Field
              name="name"
              label="Name"
              placeholder="Insert client name"
              disabled={formProps.submitting}
              component={Input}
            />
            <Field
              name="phone"
              label="Phone"
              type="number"
              placeholder="Insert client phone number"
              disabled={formProps.submitting}
              component={Input}
            />
            <Field
              name="country"
              label="Country"
              type="text"
              placeholder="Insert country"
              disabled={formProps.submitting}
              component={Input}
              validate={validateLocation}
              initialValue={country}
            />
            <Field
              name="state"
              label="State"
              type="text"
              placeholder="Insert state"
              disabled={formProps.submitting}
              component={Input}
              validate={validateLocation}
              initialValue={state}
            />
            <Field
              name="city"
              label="City"
              type="text"
              placeholder="Insert city"
              disabled={formProps.submitting}
              component={Input}
              validate={validateLocation}
              initialValue={city}
            />
            <Field
              name="address"
              label="Address"
              placeholder="Insert address"
              disabled={formProps.submitting}
              component={Input}
              initialValue={address}
            />
            <Field
              name="logo"
              label="Logo"
              placeholder="Insert logo"
              disabled={formProps.submitting}
              component={Input}
            />
            <Field
              name="description"
              label="Description"
              placeholder="Insert description"
              disabled={formProps.submitting}
              component={Input}
            />
            <div className={styles.buttonContainer}>
              <Button
                label="Save"
                disabled={formProps.submitting || formProps.pristine}
                type="submit"
              />
            </div>
          </form>
        )}
      />
    </div>
  );
}
export default clientForm;
