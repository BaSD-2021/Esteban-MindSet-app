import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useQuery from '../../../Hooks/useQuery';
import styles from './form.module.css';
import Input from '../../Shared/Input';
import Button from '../../Shared/Button';
import Checkbox from '../../Shared/Checkbox';

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

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const query = useQuery();
  const history = useHistory();

  const psychologistId = query.get('_id');
  let fetchMethod = 'POST';

  const fulfillData = (data) => {
    setFirstName(data.data[0].firstName ? data.data[0].firstName : '');
    setLastName(data.data[0].lastName ? data.data[0].lastName : '');
    setPassword(data.data[0].password ? data.data[0].password : '');
    setPhone(data.data[0].phone ? data.data[0].phone : '');
    setUsername(data.data[0].username ? data.data[0].username : '');
    setEmail(data.data[0].email ? data.data[0].email : '');
    setAddress(data.data[0].address ? data.data[0].address : '');

    setMondayAvailability(
      data.data[0].availability.monday.availability
        ? data.data[0].availability.monday.availability
        : false
    );
    setTuesdayAvailability(
      data.data[0].availability.tuesday.availability
        ? data.data[0].availability.tuesday.availability
        : false
    );
    setWednesdayAvailability(
      data.data[0].availability.wednesday.availability
        ? data.data[0].availability.wednesday.availability
        : false
    );
    setThursdayAvailability(
      data.data[0].availability.thursday.availability
        ? data.data[0].availability.thursday.availability
        : false
    );
    setFridayAvailability(
      data.data[0].availability.friday.availability
        ? data.data[0].availability.friday.availability
        : false
    );
    setSaturdayAvailability(
      data.data[0].availability.saturday.availability
        ? data.data[0].availability.saturday.availability
        : false
    );
    setSundayAvailability(
      data.data[0].availability.sunday.availability
        ? data.data[0].availability.sunday.availability
        : false
    );

    setMondayFrom(
      data.data[0].availability.monday.from ? data.data[0].availability.monday.from : 1200
    );
    setTuesdayFrom(
      data.data[0].availability.tuesday.from ? data.data[0].availability.tuesday.from : 1200
    );
    setWednesdayFrom(
      data.data[0].availability.wednesday.from ? data.data[0].availability.wednesday.from : 1200
    );
    setThursdayFrom(
      data.data[0].availability.thursday.from ? data.data[0].availability.thursday.from : 1200
    );
    setFridayFrom(
      data.data[0].availability.friday.from ? data.data[0].availability.friday.from : 1200
    );
    setSaturdayFrom(
      data.data[0].availability.saturday.from ? data.data[0].availability.saturday.from : 1200
    );
    setSundayFrom(
      data.data[0].availability.sunday.from ? data.data[0].availability.sunday.from : 1200
    );

    setMondayTo(data.data[0].availability.monday.to ? data.data[0].availability.monday.to : 1200);
    setTuesdayTo(
      data.data[0].availability.tuesday.to ? data.data[0].availability.tuesday.to : 1200
    );
    setWednesdayTo(
      data.data[0].availability.wednesday.to ? data.data[0].availability.wednesday.to : 1200
    );
    setThursdayTo(
      data.data[0].availability.thursday.to ? data.data[0].availability.thursday.to : 1200
    );
    setFridayTo(data.data[0].availability.friday.to ? data.data[0].availability.friday.to : 1200);
    setSaturdayTo(
      data.data[0].availability.saturday.to ? data.data[0].availability.saturday.to : 1200
    );
    setSundayTo(data.data[0].availability.sunday.to ? data.data[0].availability.sunday.to : 1200);
  };

  const onChangeFirstName = (event) => {
    setFirstName(event.target.value);
  };
  const onChangeLastName = (event) => {
    setLastName(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const onChangePhone = (event) => {
    setPhone(event.target.value);
  };
  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangeAddress = (event) => {
    setAddress(event.target.value);
  };

  const onChangeMondayAvailability = (event) => {
    setMondayAvailability(event.target.value);
  };
  const onChangeTuesdayAvailability = (event) => {
    setTuesdayAvailability(event.target.value);
  };
  const onChangeWednesdayAvailability = (event) => {
    setWednesdayAvailability(event.target.value);
  };
  const onChangeThursdayAvailability = (event) => {
    setThursdayAvailability(event.target.value);
  };
  const onChangeFridayAvailability = (event) => {
    setFridayAvailability(event.target.value);
  };
  const onChangeSaturdayAvailability = (event) => {
    setSaturdayAvailability(event.target.value);
  };
  const onChangeSundayAvailability = (event) => {
    setSundayAvailability(event.target.value);
  };

  const onChangeMondayFrom = (event) => {
    setMondayFrom(event.target.value);
  };
  const onChangeTuesdayFrom = (event) => {
    setTuesdayFrom(event.target.value);
  };
  const onChangeWednesdayFrom = (event) => {
    setWednesdayFrom(event.target.value);
  };
  const onChangeThursdayFrom = (event) => {
    setThursdayFrom(event.target.value);
  };
  const onChangeFridayFrom = (event) => {
    setFridayFrom(event.target.value);
  };
  const onChangeSaturdayFrom = (event) => {
    setSaturdayFrom(event.target.value);
  };
  const onChangeSundayFrom = (event) => {
    setSundayFrom(event.target.value);
  };

  const onChangeMondayTo = (event) => {
    setMondayTo(event.target.value);
  };
  const onChangeTuesdayTo = (event) => {
    setTuesdayTo(event.target.value);
  };
  const onChangeWednesdayTo = (event) => {
    setWednesdayTo(event.target.value);
  };
  const onChangeThursdayTo = (event) => {
    setThursdayTo(event.target.value);
  };
  const onChangeFridayTo = (event) => {
    setFridayTo(event.target.value);
  };
  const onChangeSaturdayTo = (event) => {
    setSaturdayTo(event.target.value);
  };
  const onChangeSundayTo = (event) => {
    setSundayTo(event.target.value);
  };

  if (psychologistId) {
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
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
        email: email,
        phone: parseInt(phone),
        address: address,
        availability: {
          monday: {
            availability: !!mondayAvailability,
            from: parseInt(mondayFrom),
            to: parseInt(mondayTo)
          },
          tuesday: {
            availability: !!tuesdayAvailability,
            from: parseInt(tuesdayFrom),
            to: parseInt(tuesdayTo)
          },
          wednesday: {
            availability: !!wednesdayAvailability,
            from: parseInt(wednesdayFrom),
            to: parseInt(wednesdayTo)
          },
          thursday: {
            availability: !!thursdayAvailability,
            from: parseInt(thursdayFrom),
            to: parseInt(thursdayTo)
          },
          friday: {
            availability: !!fridayAvailability,
            from: parseInt(fridayFrom),
            to: parseInt(fridayTo)
          },
          saturday: {
            availability: !!saturdayAvailability,
            from: parseInt(saturdayFrom),
            to: parseInt(saturdayTo)
          },
          sunday: {
            availability: !!sundayAvailability,
            from: parseInt(sundayFrom),
            to: parseInt(sundayTo)
          }
        }
      })
    };
    const url = psychologistId
      ? `${process.env.REACT_APP_API}/psychologists/${psychologistId}`
      : `${process.env.REACT_APP_API}/psychologists/`;

    setIsLoading(true);

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
        history.push('/Psychologists');
      })
      .catch((err) => {
        setErrorMessage(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (psychologistId) {
      fetch(`${process.env.REACT_APP_API}/psychologists?_id=${psychologistId}`)
        .then((response) => {
          if (response.status !== 200) {
            return response.json().then(({ message }) => {
              throw new Error(message);
            });
          }
          return response.json();
        })
        .then((res) => {
          fulfillData(res);
        })
        .catch((err) => {
          setErrorMessage(err);
        });
    }
  }, []);

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit} className={styles.form}>
        <h2 className={styles.title}>Psychologist</h2>
        <Input
          title="First Name"
          id="firstName"
          name="firstName"
          type="text"
          value={firstName}
          onChange={onChangeFirstName}
          disabled={isLoading}
          required
        />
        <Input
          title="Last Name"
          id="lastName"
          name="lastName"
          type="text"
          value={lastName}
          onChange={onChangeLastName}
          disabled={isLoading}
          required
        />
        <Input
          title="Password"
          id="password"
          name="password"
          type="text"
          value={password}
          onChange={onChangePassword}
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
          title="Username"
          id="username"
          name="username"
          type="text"
          value={username}
          onChange={onChangeUsername}
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
          title="Email"
          id="email"
          name="email"
          type="text"
          value={email}
          onChange={onChangeEmail}
          disabled={isLoading}
        />

        <div>
          <h3 className={styles.availabilityTitle}>Availability</h3>
          <Checkbox
            label="Monday"
            name={mondayAvailability}
            selected={mondayAvailability}
            onChange={onChangeMondayAvailability}
          />
          <Input
            id="mondayFrom"
            name="mondayFrom"
            placeholder="Select starting hour"
            type="number"
            value={mondayFrom}
            onChange={onChangeMondayFrom}
            disabled={isLoading}
          />
          <Input
            id="mondayTo"
            name="mondayTo"
            placeholder="Select finishing hour"
            type="number"
            value={mondayTo}
            onChange={onChangeMondayTo}
            disabled={isLoading}
          />
        </div>

        <div>
          <Checkbox
            label="Tuesday"
            name={tuesdayAvailability}
            selected={tuesdayAvailability}
            onChange={onChangeTuesdayAvailability}
          />
          <Input
            id="tuesdayFrom"
            name="tuesdayFrom"
            placeholder="Select starting hour"
            type="number"
            value={tuesdayFrom}
            onChange={onChangeTuesdayFrom}
            disabled={isLoading}
          />
          <Input
            id="tuesdayTo"
            name="tuesdayTo"
            placeholder="Select finishing hour"
            type="number"
            value={tuesdayTo}
            onChange={onChangeTuesdayTo}
            disabled={isLoading}
          />
        </div>

        <div>
          <Checkbox
            label="Wednesday"
            name={wednesdayAvailability}
            selected={wednesdayAvailability}
            onChange={onChangeWednesdayAvailability}
          />
          <Input
            id="wednesdayFrom"
            name="wednesdayFrom"
            placeholder="Select starting hour"
            type="number"
            value={wednesdayFrom}
            onChange={onChangeWednesdayFrom}
            disabled={isLoading}
          />
          <Input
            id="wednesdayTo"
            name="wednesdayTo"
            placeholder="Select finishing hour"
            type="number"
            value={wednesdayTo}
            onChange={onChangeWednesdayTo}
            disabled={isLoading}
          />
        </div>

        <div>
          <Checkbox
            label="Thursday"
            name={thursdayAvailability}
            selected={thursdayAvailability}
            onChange={onChangeThursdayAvailability}
          />
          <Input
            id="thursdayFrom"
            name="thursdayFrom"
            placeholder="Select starting hour"
            type="number"
            value={thursdayFrom}
            onChange={onChangeThursdayFrom}
            disabled={isLoading}
          />
          <Input
            id="thursdayTo"
            name="thursdayTo"
            placeholder="Select finishing hour"
            type="number"
            value={thursdayTo}
            onChange={onChangeThursdayTo}
            disabled={isLoading}
          />
        </div>

        <div>
          <Checkbox
            label="Friday"
            name={fridayAvailability}
            selected={fridayAvailability}
            onChange={onChangeFridayAvailability}
          />
          <Input
            id="fridayFrom"
            name="fridayFrom"
            placeholder="Select starting hour"
            type="number"
            value={fridayFrom}
            onChange={onChangeFridayFrom}
            disabled={isLoading}
          />
          <Input
            id="fridayTo"
            name="fridayTo"
            placeholder="Select finishing hour"
            type="number"
            value={fridayTo}
            onChange={onChangeFridayTo}
            disabled={isLoading}
          />
        </div>

        <div>
          <Checkbox
            label="Saturday"
            name={saturdayAvailability}
            selected={saturdayAvailability}
            onChange={onChangeSaturdayAvailability}
          />
          <Input
            id="saturdayFrom"
            name="saturdayFrom"
            placeholder="Select starting hour"
            type="number"
            value={saturdayFrom}
            onChange={onChangeSaturdayFrom}
            disabled={isLoading}
          />
          <Input
            id="saturdayTo"
            name="saturdayTo"
            placeholder="Select finishing hour"
            type="number"
            value={saturdayTo}
            onChange={onChangeSaturdayTo}
            disabled={isLoading}
          />
        </div>

        <div>
          <Checkbox
            label="Sunday"
            name={sundayAvailability}
            selected={sundayAvailability}
            onChange={onChangeSundayAvailability}
          />
          <Input
            id="sundayFrom"
            name="sundayFrom"
            placeholder="Select starting hour"
            type="number"
            value={sundayFrom}
            onChange={onChangeSundayFrom}
            disabled={isLoading}
          />
          <Input
            id="sundayTo"
            name="sundayTo"
            placeholder="Select finishing hour"
            type="number"
            value={sundayTo}
            onChange={onChangeSundayTo}
            disabled={isLoading}
          />
        </div>

        <div className={styles.buttonContainer}>
          <Button label="SAVE" disabled={isLoading} type="submit"></Button>
        </div>
      </form>
      <div id="error_message" className={styles.errorMessage}>
        {errorMessage.message}
      </div>
    </div>
  );
}
export default Form;
