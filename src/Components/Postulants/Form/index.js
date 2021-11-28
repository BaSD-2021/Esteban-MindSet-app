import { useState } from 'react';
import styles from './form.module.css';

function PostulantsForm() {
  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const onChangeFirstNameInput = (event) => {
    setFirstNameValue(event.target.value);
  };

  const onChangeLastNameInput = (event) => {
    setLastNameValue(event.target.value);
  };

  const onChangeEmailInput = (event) => {
    setEmailValue(event.target.value);
  };

  const onChangePasswordInput = (event) => {
    setPasswordValue(event.target.value);
  };

  // const onChangeLastNameInput = (event) => {
  //   setLastNameValue(event.target.value);
  // };

  // const onChangeLastNameInput = (event) => {
  //   setLastNameValue(event.target.value);
  // };

  // const onChangeLastNameInput = (event) => {
  //   setLastNameValue(event.target.value);
  // };

  // const onChangeLastNameInput = (event) => {
  //   setLastNameValue(event.target.value);
  // };

  // const onChangeLastNameInput = (event) => {
  //   setLastNameValue(event.target.value);
  // };

  // const onChangeLastNameInput = (event) => {
  //   setLastNameValue(event.target.value);
  // };

  const onSubmit = (event) => {
    event.preventDefault();

    const params = new URLSearchParams(window.location.search);
    const postulantId = params.get('_id');
    // saveButton.disables = !!params.get('id');

    let url = '';

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: firstNameValue,
        lastName: lastNameValue,
        email: emailValue,
        password: passwordValue
        // contactRange: contactRangeValue
        // address: bodyReq.address,
        // birthday: bodyReq.birthday,
        // available: bodyReq.available,
        // phone: bodyReq.phone,
        // profiles: bodyReq.profiles,
        // 'studies.primaryStudies': bodyReq.studies.primaryStudies,
        // 'studies.secondaryStudies': bodyReq.studies.secondaryStudies,
        // 'studies.tertiaryStudies': bodyReq.studies.tertiaryStudies,
        // 'studies.universityStudies': bodyReq.studies.universityStudies,
        // 'studies.informalStudies': bodyReq.studies.informalStudies,
        // workExperience: bodyReq.workExperience,
      })
    };
    // if (params.get('_id')) {
    //   options.method = 'PUT';
    url = `${process.env.REACT_APP_API}/postulants/${postulantId}`;
    // } else {
    //   options.method = 'POST';
    //   url = `${process.env.REACT_APP_API}/postulants`;
    // }
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
        window.location.href = `${window.location.origin}/postulants`;
      });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <h2>Form</h2>
        <input
          className={styles.input}
          id="firstName"
          name="firstName"
          placeholder="First Name"
          value={firstNameValue}
          onChange={onChangeFirstNameInput}
          required
        />
        <input
          className={styles.input}
          id="lastName"
          name="lastName"
          placeholder="Last Name"
          value={lastNameValue}
          onChange={onChangeLastNameInput}
          required
        />
        <input
          className={styles.input}
          id="email"
          name="email"
          placeholder="email"
          value={emailValue}
          onChange={onChangeEmailInput}
          required
        />
        <input
          className={styles.input}
          id="password"
          name="password"
          placeholder="password"
          value={passwordValue}
          onChange={onChangePasswordInput}
          required
        />
        <button type="submit" id="saveButton">
          Save
        </button>
      </form>
    </div>
  );
}

export default PostulantsForm;
