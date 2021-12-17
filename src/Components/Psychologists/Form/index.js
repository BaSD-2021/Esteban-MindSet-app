import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useQuery from 'Components/Hooks/useQuery';
import styles from './form.module.css';
import Input from 'Components/Shared/Input';
import Button from 'Components/Shared/Button';
import Checkbox from 'Components/Shared/Checkbox';
import Modal from 'Components/Shared/Modal';
import { cleanError, cleanSelectedItem } from 'redux/psychologists/actions';
import { useDispatch, useSelector } from 'react-redux';
import {
  createPsychologist,
  getPsychologistById,
  updatePsychologist
} from 'redux/psychologists/thunks';

function Form() {
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
  const [sundayAvailability, setSundayAvailability] = useState(false);
  const [mondayFrom, setMondayFrom] = useState(1200);
  const [tuesdayFrom, setTuesdayFrom] = useState(1200);
  const [wednesdayFrom, setWednesdayFrom] = useState(1200);
  const [thursdayFrom, setThursdayFrom] = useState(1200);
  const [fridayFrom, setFridayFrom] = useState(1200);
  const [saturdayFrom, setSaturdayFrom] = useState(1200);
  const [sundayFrom, setSundayFrom] = useState(1200);
  const [mondayTo, setMondayTo] = useState(1200);
  const [tuesdayTo, setTuesdayTo] = useState(1200);
  const [wednesdayTo, setWednesdayTo] = useState(1200);
  const [thursdayTo, setThursdayTo] = useState(1200);
  const [fridayTo, setFridayTo] = useState(1200);
  const [saturdayTo, setSaturdayTo] = useState(1200);
  const [sundayTo, setSundayTo] = useState(1200);

  const query = useQuery();
  const history = useHistory();

  const error = useSelector((store) => store.psychologists.error);
  const isLoading = useSelector((store) => store.psychologists.isFetching);
  const selectedItem = useSelector((store) => store.psychologists.selectedItem);

  const dispatch = useDispatch();

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
      setSundayAvailability(selectedItem.availability.sunday.availability);
      setMondayFrom(selectedItem.availability.monday.from);
      setTuesdayFrom(selectedItem.availability.tuesday.from);
      setWednesdayFrom(selectedItem.availability.wednesday.from);
      setThursdayFrom(selectedItem.availability.thursday.from);
      setFridayFrom(selectedItem.availability.friday.from);
      setSaturdayFrom(selectedItem.availability.saturday.from);
      setSundayFrom(selectedItem.availability.sunday.from);
      setMondayTo(selectedItem.availability.monday.to);
      setTuesdayTo(selectedItem.availability.tuesday.to);
      setWednesdayTo(selectedItem.availability.wednesday.to);
      setThursdayTo(selectedItem.availability.thursday.to);
      setFridayTo(selectedItem.availability.friday.to);
      setSaturdayTo(selectedItem.availability.saturday.to);
      setSundayTo(selectedItem.availability.sunday.to);
    }
  }, [selectedItem]);

  useEffect(() => {
    return () => {
      dispatch(cleanSelectedItem());
    };
  }, []);

  const save = (e) => {
    e.preventDefault();

    const psychologistId = query.get('_id');

    if (psychologistId) {
      dispatch(
        updatePsychologist(psychologistId, {
          firstName,
          lastName,
          username,
          password,
          email,
          phone,
          address,
          availability: {
            monday: {
              availability: mondayAvailability,
              from: mondayFrom,
              to: mondayTo
            },
            tuesday: {
              availability: tuesdayAvailability,
              from: tuesdayFrom,
              to: tuesdayTo
            },
            wednesday: {
              availability: wednesdayAvailability,
              from: wednesdayFrom,
              to: wednesdayTo
            },
            thursday: {
              availability: thursdayAvailability,
              from: thursdayFrom,
              to: thursdayTo
            },
            friday: {
              availability: fridayAvailability,
              from: fridayFrom,
              to: fridayTo
            },
            saturday: {
              availability: saturdayAvailability,
              from: saturdayFrom,
              to: saturdayTo
            },
            sunday: {
              availability: sundayAvailability,
              from: sundayFrom,
              to: sundayTo
            }
          }
        })
      ).then((response) => {
        if (response) {
          history.push('/psychologists');
        }
      });
    } else {
      dispatch(
        createPsychologist({
          firstName,
          lastName,
          username,
          password,
          email,
          phone,
          address,
          availability: {
            monday: {
              availability: mondayAvailability,
              from: mondayFrom,
              to: mondayTo
            },
            tuesday: {
              availability: tuesdayAvailability,
              from: tuesdayFrom,
              to: tuesdayTo
            },
            wednesday: {
              availability: wednesdayAvailability,
              from: wednesdayFrom,
              to: wednesdayTo
            },
            thursday: {
              availability: thursdayAvailability,
              from: thursdayFrom,
              to: thursdayTo
            },
            friday: {
              availability: fridayAvailability,
              from: fridayFrom,
              to: fridayTo
            },
            saturday: {
              availability: saturdayAvailability,
              from: saturdayFrom,
              to: saturdayTo
            },
            sunday: {
              availability: sundayAvailability,
              from: sundayFrom,
              to: sundayTo
            }
          }
        })
      ).then((response) => {
        if (response) {
          history.push('/psychologists');
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
      <form onSubmit={save} className={styles.form}>
        <h2 className={styles.title}>Psychologist</h2>
        <Input
          title="First Name"
          id="firstName"
          name="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          disabled={isLoading}
          required
        />
        <Input
          title="Last Name"
          id="lastName"
          name="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          disabled={isLoading}
          required
        />
        <Input
          title="Password"
          id="password"
          name="password"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          required
        />
        <Input
          title="Phone"
          id="phone"
          name="phone"
          type="number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={isLoading}
          required
        />
        <Input
          title="Username"
          id="username"
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading}
          required
        />
        <Input
          title="Address"
          id="address"
          name="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          disabled={isLoading}
          required
        />
        <Input
          title="Email"
          id="email"
          name="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />

        <div>
          <h3 className={styles.availabilityTitle}>Availability</h3>
          <Checkbox
            label="Monday"
            selected={mondayAvailability}
            onChange={(e) => setMondayAvailability(!!e.target.checked)}
          />
          <Input
            id="mondayFrom"
            name="mondayFrom"
            placeholder="Select starting hour"
            type="number"
            value={mondayFrom}
            onChange={(e) => setMondayFrom(e.target.value)}
            disabled={isLoading}
          />
          <Input
            id="mondayTo"
            name="mondayTo"
            placeholder="Select finishing hour"
            type="number"
            value={mondayTo}
            onChange={(e) => setMondayTo(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div>
          <Checkbox
            label="Tuesday"
            selected={tuesdayAvailability}
            onChange={(e) => setTuesdayAvailability(!!e.target.checked)}
          />
          <Input
            id="tuesdayFrom"
            name="tuesdayFrom"
            placeholder="Select starting hour"
            type="number"
            value={tuesdayFrom}
            onChange={(e) => setTuesdayFrom(e.target.value)}
            disabled={isLoading}
          />
          <Input
            id="tuesdayTo"
            name="tuesdayTo"
            placeholder="Select finishing hour"
            type="number"
            value={tuesdayTo}
            onChange={(e) => setTuesdayTo(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div>
          <Checkbox
            label="Wednesday"
            selected={wednesdayAvailability}
            onChange={(e) => setWednesdayAvailability(!!e.target.checked)}
          />
          <Input
            id="wednesdayFrom"
            name="wednesdayFrom"
            placeholder="Select starting hour"
            type="number"
            value={wednesdayFrom}
            onChange={(e) => setWednesdayFrom(e.target.value)}
            disabled={isLoading}
          />
          <Input
            id="wednesdayTo"
            name="wednesdayTo"
            placeholder="Select finishing hour"
            type="number"
            value={wednesdayTo}
            onChange={(e) => setWednesdayTo(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div>
          <Checkbox
            label="Thursday"
            selected={thursdayAvailability}
            onChange={(e) => setThursdayAvailability(!!e.target.checked)}
          />
          <Input
            id="thursdayFrom"
            name="thursdayFrom"
            placeholder="Select starting hour"
            type="number"
            value={thursdayFrom}
            onChange={(e) => setTuesdayFrom(e.target.value)}
            disabled={isLoading}
          />
          <Input
            id="thursdayTo"
            name="thursdayTo"
            placeholder="Select finishing hour"
            type="number"
            value={thursdayTo}
            onChange={(e) => setTuesdayTo(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div>
          <Checkbox
            label="Friday"
            selected={fridayAvailability}
            onChange={(e) => setFridayAvailability(!!e.target.checked)}
          />
          <Input
            id="fridayFrom"
            name="fridayFrom"
            placeholder="Select starting hour"
            type="number"
            value={fridayFrom}
            onChange={(e) => setFridayFrom(e.target.value)}
            disabled={isLoading}
          />
          <Input
            id="fridayTo"
            name="fridayTo"
            placeholder="Select finishing hour"
            type="number"
            value={fridayTo}
            onChange={(e) => setFridayTo(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div>
          <Checkbox
            label="Saturday"
            selected={saturdayAvailability}
            onChange={(e) => setSaturdayAvailability(!!e.target.checked)}
          />
          <Input
            id="saturdayFrom"
            name="saturdayFrom"
            placeholder="Select starting hour"
            type="number"
            value={saturdayFrom}
            onChange={(e) => setSaturdayFrom(e.target.value)}
            disabled={isLoading}
          />
          <Input
            id="saturdayTo"
            name="saturdayTo"
            placeholder="Select finishing hour"
            type="number"
            value={saturdayTo}
            onChange={(e) => setSaturdayTo(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div>
          <Checkbox
            label="Sunday"
            selected={sundayAvailability}
            onChange={(e) => setSundayAvailability(!!e.target.checked)}
          />
          <Input
            id="sundayFrom"
            name="sundayFrom"
            placeholder="Select starting hour"
            type="number"
            value={sundayFrom}
            onChange={(e) => setSundayFrom(e.target.value)}
            disabled={isLoading}
          />
          <Input
            id="sundayTo"
            name="sundayTo"
            placeholder="Select finishing hour"
            type="number"
            value={sundayTo}
            onChange={(e) => setSundayTo(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className={styles.buttonContainer}>
          <Button label="SAVE" disabled={isLoading} type="submit"></Button>
        </div>
      </form>
    </div>
  );
}
export default Form;
