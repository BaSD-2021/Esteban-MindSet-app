import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useQuery from 'Hooks/useQuery';
import styles from './form.module.css';
import Input from 'Components/Shared/Input';
import Button from 'Components/Shared/Button';
import Checkbox from 'Components/Shared/Checkbox';
import Select from 'Components/Shared/Select';
import Modal from 'Components/Shared/Modal';
import { cleanError, cleanSelectedItem } from 'redux/psychologists/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Field } from 'react-final-form';
import {
  createPsychologist,
  getPsychologistById,
  updatePsychologist
} from 'redux/psychologists/thunks';

function PsychologistForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [mondayAvailability, setMondayAvailability] = useState(false);
  const [tuesdayAvailability, setTuesdayAvailability] = useState(false);
  const [wednesdayAvailability, setWednesdayAvailability] = useState(false);
  const [thursdayAvailability, setThursdayAvailability] = useState(false);
  const [fridayAvailability, setFridayAvailability] = useState(false);
  const [saturdayAvailability, setSaturdayAvailability] = useState(false);
  const [mondayFrom, setMondayFrom] = useState(1200);
  const [tuesdayFrom, setTuesdayFrom] = useState(1200);
  const [wednesdayFrom, setWednesdayFrom] = useState(1200);
  const [thursdayFrom, setThursdayFrom] = useState(1200);
  const [fridayFrom, setFridayFrom] = useState(1200);
  const [saturdayFrom, setSaturdayFrom] = useState(1200);
  const [mondayTo, setMondayTo] = useState(1200);
  const [tuesdayTo, setTuesdayTo] = useState(1200);
  const [wednesdayTo, setWednesdayTo] = useState(1200);
  const [thursdayTo, setThursdayTo] = useState(1200);
  const [fridayTo, setFridayTo] = useState(1200);
  const [saturdayTo, setSaturdayTo] = useState(1200);

  const query = useQuery();
  const history = useHistory();

  const error = useSelector((store) => store.psychologists.error);
  const selectedItem = useSelector((store) => store.psychologists.selectedItem);

  const dispatch = useDispatch();

  const schedule = [
    { value: 800, label: '08:00' },
    { value: 900, label: '09:00' },
    { value: 1000, label: '10:00' },
    { value: 1100, label: '11:00' },
    { value: 1200, label: '12:00' },
    { value: 1300, label: '13:00' },
    { value: 1400, label: '14:00' },
    { value: 1500, label: '15:00' },
    { value: 1600, label: '16:00' },
    { value: 1700, label: '17:00' },
    { value: 1800, label: '18:00' },
    { value: 1900, label: '19:00' },
    { value: 2000, label: '20:00' }
  ];

  useEffect(() => {
    const psychologistId = query.get('_id');
    if (psychologistId) {
      dispatch(getPsychologistById(psychologistId));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(selectedItem).length) {
      setFirstName(selectedItem.firstName);
      setLastName(selectedItem.lastName);
      setPassword(selectedItem.password);
      setPhone(selectedItem.phone);
      setEmail(selectedItem.email);
      setUsername(selectedItem.username);
      setAddress(selectedItem.address);
      setMondayAvailability(selectedItem.availability.monday.availability);
      setTuesdayAvailability(selectedItem.availability.tuesday.availability);
      setWednesdayAvailability(selectedItem.availability.wednesday.availability);
      setThursdayAvailability(selectedItem.availability.thursday.availability);
      setFridayAvailability(selectedItem.availability.friday.availability);
      setSaturdayAvailability(selectedItem.availability.saturday.availability);
      setMondayFrom(selectedItem.availability.monday.from);
      setTuesdayFrom(selectedItem.availability.tuesday.from);
      setWednesdayFrom(selectedItem.availability.wednesday.from);
      setThursdayFrom(selectedItem.availability.thursday.from);
      setFridayFrom(selectedItem.availability.friday.from);
      setSaturdayFrom(selectedItem.availability.saturday.from);
      setMondayTo(selectedItem.availability.monday.to);
      setTuesdayTo(selectedItem.availability.tuesday.to);
      setWednesdayTo(selectedItem.availability.wednesday.to);
      setThursdayTo(selectedItem.availability.thursday.to);
      setFridayTo(selectedItem.availability.friday.to);
      setSaturdayTo(selectedItem.availability.saturday.to);
    }
  }, [selectedItem]);

  useEffect(() => {
    return () => {
      dispatch(cleanSelectedItem());
    };
  }, []);

  const onSubmit = (formValues) => {
    const psychologistId = query.get('_id');

    const body = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      username: formValues.username,
      password: formValues.password,
      email: formValues.email,
      phone: parseInt(formValues.phone),
      address: formValues.address,
      availability: {
        monday: {
          availability: formValues.monday,
          from: parseInt(formValues.mondayFrom),
          to: parseInt(formValues.mondayTo)
        },
        tuesday: {
          availability: formValues.tuesday,
          from: parseInt(formValues.tuesdayFrom),
          to: parseInt(formValues.tuesdayTo)
        },
        wednesday: {
          availability: formValues.wednesday,
          from: parseInt(formValues.wednesdayFrom),
          to: parseInt(formValues.wednesdayTo)
        },
        thursday: {
          availability: formValues.thursday,
          from: parseInt(formValues.thursdayFrom),
          to: parseInt(formValues.thursdayTo)
        },
        friday: {
          availability: formValues.friday,
          from: parseInt(formValues.fridayFrom),
          to: parseInt(formValues.fridayTo)
        },
        saturday: {
          availability: formValues.saturday,
          from: parseInt(formValues.saturdayFrom),
          to: parseInt(formValues.saturdayTo)
        }
      }
    };

    if (psychologistId) {
      dispatch(updatePsychologist(psychologistId, body)).then((response) => {
        if (response) {
          history.push('/admin/psychologists/list');
        }
      });
    } else {
      dispatch(createPsychologist(body)).then((response) => {
        if (response) {
          history.push('/admin/psychologists/list');
        }
      });
    }
  };

  const validate = (formValues) => {
    const errors = {};
    if (!formValues.firstName) {
      errors.firstName = 'First Name is required';
    }
    if (!formValues.firstName?.match(/^[a-zA-Z]+$/)) {
      errors.firstName = 'First name must contain only letters';
    }
    if (formValues.firstName?.length < 3) {
      errors.firstName = 'First name must be at least 3 letters';
    }
    if (!formValues.lastName) {
      errors.lastName = 'Last Name is required';
    }
    if (!formValues.lastName?.match(/^[a-zA-Z]+$/)) {
      errors.lastName = 'Last name must contain only letters';
    }
    if (formValues.lastName?.length < 2) {
      errors.lastName = 'Last name must be at least 2 letters';
    }
    if (!formValues.password) {
      errors.password = 'Password is required';
    }
    if (formValues.password?.search(/[0-9]/) < 0 || formValues.password?.search(/[a-zA-Z]/) < 0) {
      errors.password = 'Password must contain numbers and letters';
    } else if (formValues.password?.length < 6) {
      errors.password = 'Password must contain at least 6 characters';
    }
    if (!formValues.phone) {
      errors.phone = 'Phone number is required';
    }
    if (!formValues.email) {
      errors.email = 'Email is required';
    }
    if (!formValues.email?.match(/^[^@]+@[a-zA-Z]+\.[a-zA-Z]+$/)) {
      errors.email = 'Fill in a valid email format';
    }
    if (formValues.address?.search(/[0-9]/) < 0 || formValues.address?.search(/[a-zA-Z]/) < 0) {
      errors.address = 'Address must contain numbers and letters';
    } else if (formValues.address?.length < 6) {
      errors.address = 'Address must contain at least 6 characters';
    }
    return errors;
  };

  const validateIsBigger = (value, all, previous) => {
    return parseInt(value) > parseInt(all[previous]) ? undefined : 'Invalid Range';
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
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={(formProps) => (
          <form onSubmit={formProps.handleSubmit} className={styles.form}>
            <h2 className={styles.title}>Psychologist</h2>
            <Field
              name="firstName"
              label="First Name"
              type="text"
              placeholder="Insert your First Name"
              disabled={formProps.submitting}
              component={Input}
              initialValue={firstName}
            />
            <Field
              name="lastName"
              label="Last Name"
              type="text"
              placeholder="Insert your last name"
              disabled={formProps.submitting}
              component={Input}
              initialValue={lastName}
            />
            <Field
              name="password"
              label="Password"
              type="text"
              placeholder="Insert your password"
              disabled={formProps.submitting}
              component={Input}
              initialValue={password}
            />
            <Field
              name="phone"
              label="Phone Number"
              type="number"
              placeholder="Insert phone number"
              disabled={formProps.submitting}
              component={Input}
              initialValue={phone}
            />
            <Field
              name="username"
              label="Username"
              placeholder="Insert Username"
              disabled={formProps.submitting}
              component={Input}
              initialValue={username}
            />
            <Field
              name="address"
              label="Address"
              placeholder="Insert Address"
              disabled={formProps.submitting}
              component={Input}
              initialValue={address}
            />
            <Field
              name="email"
              label="Email"
              placeholder="Insert Email"
              disabled={formProps.submitting}
              component={Input}
              initialValue={email}
            />
            <div>
              <h3 className={styles.availabilityTitle}>Availability</h3>
              <Field
                name="monday"
                label="Monday"
                disabled={formProps.submitting}
                component={Checkbox}
                type="checkbox"
                initialValue={mondayAvailability}
              />
              <Field
                component={Select}
                disabled={formProps.submitting}
                title="From"
                name="mondayFrom"
                arrayToMap={schedule}
                style={styles.selector}
                value={mondayFrom}
                initialValue={mondayFrom}
              />
              <Field
                component={Select}
                disabled={formProps.submitting}
                title="To"
                name="mondayTo"
                arrayToMap={schedule}
                style={styles.selector}
                value={mondayTo}
                initialValue={mondayTo}
                validate={(value, all) => {
                  return validateIsBigger(value, all, 'mondayFrom');
                }}
              />
            </div>
            <div>
              <Field
                name="tuesday"
                label="Tuesday"
                disabled={formProps.submitting}
                component={Checkbox}
                type="checkbox"
                initialValue={tuesdayAvailability}
              />
              <Field
                component={Select}
                disabled={formProps.submitting}
                title="From"
                name="tuesdayFrom"
                arrayToMap={schedule}
                style={styles.selector}
                value={tuesdayFrom}
                initialValue={tuesdayFrom}
              />
              <Field
                component={Select}
                disabled={formProps.submitting}
                title="To"
                name="tuesdayTo"
                arrayToMap={schedule}
                style={styles.selector}
                value={tuesdayTo}
                initialValue={tuesdayTo}
                validate={(value, all) => {
                  return validateIsBigger(value, all, 'tuesdayFrom');
                }}
              />
            </div>
            <div>
              <Field
                name="wednesday"
                label="Wednesday"
                disabled={formProps.submitting}
                component={Checkbox}
                type="checkbox"
                initialValue={wednesdayAvailability}
              />
              <Field
                component={Select}
                disabled={formProps.submitting}
                title="From"
                name="wednesdayFrom"
                arrayToMap={schedule}
                style={styles.selector}
                value={wednesdayFrom}
                initialValue={wednesdayFrom}
              />
              <Field
                component={Select}
                disabled={formProps.submitting}
                title="To"
                name="wednesdayTo"
                arrayToMap={schedule}
                style={styles.selector}
                value={wednesdayTo}
                initialValue={wednesdayTo}
                validate={(value, all) => {
                  return validateIsBigger(value, all, 'wednesdayFrom');
                }}
              />
            </div>
            <div>
              <Field
                name="thursday"
                label="Thursday"
                disabled={formProps.submitting}
                component={Checkbox}
                type="checkbox"
                initialValue={thursdayAvailability}
              />
              <Field
                component={Select}
                disabled={formProps.submitting}
                title="From"
                name="thursdayFrom"
                arrayToMap={schedule}
                style={styles.selector}
                value={thursdayFrom}
                initialValue={thursdayFrom}
              />
              <Field
                component={Select}
                disabled={formProps.submitting}
                title="To"
                name="thursdayTo"
                arrayToMap={schedule}
                style={styles.selector}
                value={thursdayTo}
                initialValue={thursdayTo}
                validate={(value, all) => {
                  return validateIsBigger(value, all, 'thursdayFrom');
                }}
              />
            </div>
            <div>
              <Field
                name="friday"
                label="Friday"
                disabled={formProps.submitting}
                component={Checkbox}
                type="checkbox"
                initialValue={fridayAvailability}
              />
              <Field
                component={Select}
                disabled={formProps.submitting}
                title="From"
                name="fridayFrom"
                arrayToMap={schedule}
                style={styles.selector}
                value={fridayFrom}
                initialValue={fridayFrom}
              />
              <Field
                component={Select}
                disabled={formProps.submitting}
                title="To"
                name="fridayTo"
                arrayToMap={schedule}
                style={styles.selector}
                value={fridayTo}
                initialValue={fridayTo}
                validate={(value, all) => {
                  return validateIsBigger(value, all, 'fridayFrom');
                }}
              />
            </div>
            <div>
              <Field
                name="saturday"
                label="Saturday"
                disabled={formProps.submitting}
                component={Checkbox}
                type="checkbox"
                initialValue={saturdayAvailability}
              />
              <Field
                component={Select}
                disabled={formProps.submitting}
                title="From"
                name="saturdayFrom"
                arrayToMap={schedule}
                style={styles.selector}
                value={saturdayFrom}
                initialValue={saturdayFrom}
              />
              <Field
                component={Select}
                disabled={formProps.submitting}
                title="To"
                name="saturdayTo"
                arrayToMap={schedule}
                style={styles.selector}
                value={saturdayTo}
                initialValue={fridayTo}
                validate={(value, all) => {
                  return validateIsBigger(value, all, 'saturdayFrom');
                }}
              />
            </div>
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
export default PsychologistForm;
