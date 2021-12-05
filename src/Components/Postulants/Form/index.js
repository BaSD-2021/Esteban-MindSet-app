import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useQuery from '../../../Hooks/useQuery';
import styles from './form.module.css';
import Button from '../../Shared/Button';

const hoursRegEx = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

function PostulantsForm() {
  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [contactFromValue, setContactFromValue] = useState('');
  const [contactToValue, setContactToValue] = useState('');
  const [addressValue, setAddressValue] = useState('');
  const [birthdayValue, setBirthdayValue] = useState('');
  const [availableValue, setAvailableValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [primarySDValue, setPrimarySDValue] = useState('');
  const [primaryEDValue, setPrimaryEDValue] = useState('');
  const [primarySchoolValue, setPrimarySchoolValue] = useState('');
  const [secondarySDValue, setSecondarySDValue] = useState('');
  const [secondaryEDValue, setSecondaryEDValue] = useState('');
  const [secondarySchoolValue, setSecondarySchoolValue] = useState('');
  const [tertiarySDValue, setTertiarySDValue] = useState('');
  const [tertiaryEDValue, setTertiaryEDValue] = useState('');
  const [tertiaryDescriptionValue, setTertiaryDescriptionValue] = useState('');
  const [tertiaryInstituteValue, setTertiaryInstituteValue] = useState('');
  const [universitySDValue, setUniversitySDValue] = useState('');
  const [universityEDValue, setUniversityEDValue] = useState('');
  const [universityDescriptionValue, setUniversityDescriptionValue] = useState('');
  const [universityInstituteValue, setUniversityInstituteValue] = useState('');
  const [informalSDValue, setInformalSDValue] = useState('');
  const [informalEDValue, setInformalEDValue] = useState('');
  const [informalDescriptionValue, setInformalDescriptionValue] = useState('');
  const [informalInstituteValue, setInformalInstituteValue] = useState('');
  const [workExperienceCompanyValue, setWorkExperienceCompanyValue] = useState('');
  const [workExperienceSDValue, setWorkExperienceSDValue] = useState('');
  const [workExperienceEDValue, setWorkExperienceEDValue] = useState('');
  const [workExperienceDescriptionValue, setWorkExperienceDescriptionValue] = useState('');
  const [showError, setShowError] = useState('');
  const query = useQuery();
  const history = useHistory();

  const postulantId = query.get('_id');
  if (postulantId) {
    useEffect(() => {
      fetch(`${process.env.REACT_APP_API}/postulants?_id=${postulantId}`)
        .then((response) => response.json())
        .then((response) => {
          autoFill(response);
        })
        .catch((err) => {
          setShowError(err);
        });
    }, []);
  }

  const autoFill = (data) => {
    const fillData = data.data[0];
    const fillPrimStudy = fillData.studies.primaryStudies;
    const fillSecStudy = fillData.studies.secondaryStudies;
    const fillTerStudy = fillData.studies.tertiaryStudies[0];
    const fillUniStudies = fillData.studies.universityStudies[0];
    const fillInfStudies = fillData.studies.informalStudies[0];
    const fillWorkExp = fillData.workExperience[0];
    const contactFrom = fillData.contactRange.from;
    const contactTo = fillData.contactRange.to;

    setFirstNameValue(fillData.firstName || '');
    setLastNameValue(fillData.lastName || '');
    setEmailValue(fillData.email || '');
    setPasswordValue(fillData.password || '');
    setContactFromValue(contactFrom || '');
    setContactToValue(contactTo || '');
    setAddressValue(fillData.address || '');
    setBirthdayValue(fillData.birthday == null ? '' : fillData.birthday.slice(0, 10));
    setAvailableValue(fillData.available || '');
    setPhoneValue(fillData.phone || '');

    setPrimarySDValue(fillPrimStudy.startDate == null ? '' : fillPrimStudy.startDate.slice(0, 10));
    setPrimaryEDValue(fillPrimStudy.endDate == null ? '' : fillPrimStudy.endDate.slice(0, 10));
    setPrimarySchoolValue(fillPrimStudy.school || '');

    setSecondarySDValue(fillSecStudy.startDate == null ? '' : fillSecStudy.startDate.slice(0, 10));
    setSecondaryEDValue(fillSecStudy.endDate == null ? '' : fillSecStudy.endDate.slice(0, 10));
    setSecondarySchoolValue(fillSecStudy.school || '');

    setTertiarySDValue(fillTerStudy.startDate == null ? '' : fillTerStudy.startDate.slice(0, 10));
    setTertiaryEDValue(fillTerStudy.endDate == null ? '' : fillTerStudy.endDate.slice(0, 10));
    setTertiaryDescriptionValue(fillTerStudy.description || '');
    setTertiaryInstituteValue(fillTerStudy.institute || '');

    // eslint-disable-next-line prettier/prettier
    setUniversitySDValue(fillUniStudies.startDate == null ? '' : fillUniStudies.startDate.slice(0, 10));
    setUniversityEDValue(fillUniStudies.endDate == null ? '' : fillUniStudies.endDate.slice(0, 10));
    setUniversityDescriptionValue(fillUniStudies.description || '');
    setUniversityInstituteValue(fillUniStudies.institute || '');

    // eslint-disable-next-line prettier/prettier
    setInformalSDValue(fillInfStudies.startDate == null ? '' : fillInfStudies.startDate.slice(0, 10));
    setInformalEDValue(fillInfStudies.endDate == null ? '' : fillInfStudies.endDate.slice(0, 10));
    setInformalDescriptionValue(fillInfStudies.description || '');
    setInformalInstituteValue(fillInfStudies.institute || '');

    setWorkExperienceCompanyValue(fillWorkExp.company || '');
    // eslint-disable-next-line prettier/prettier
    setWorkExperienceSDValue(fillWorkExp.startDate == null ? '' : fillWorkExp.startDate.slice(0, 10));
    // eslint-disable-next-line prettier/prettier
    setWorkExperienceEDValue(fillWorkExp.endDate == null ? '' : fillWorkExp.endDate.slice(0, 10));
    setWorkExperienceDescriptionValue(fillWorkExp.description || '');
  };

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

  const onChangeContactFromValue = (event) => {
    setContactFromValue(event.target.value);
  };

  const onChangeContactToValue = (event) => {
    setContactToValue(event.target.value);
  };

  const onChangeAddressInput = (event) => {
    setAddressValue(event.target.value);
  };

  const onChangeBirthdayInput = (event) => {
    setBirthdayValue(event.target.value);
  };

  const onChangeAvailableInput = (event) => {
    setAvailableValue(event.target.checked);
  };

  const onChangePhoneInput = (event) => {
    setPhoneValue(event.target.value);
  };

  const onChangePrimarySDValue = (event) => {
    setPrimarySDValue(event.target.value);
  };

  const onChangePrimaryEDValue = (event) => {
    setPrimaryEDValue(event.target.value);
  };

  const onChangePrimarySchoolValueInput = (event) => {
    setPrimarySchoolValue(event.target.value);
  };

  const onChangeSecondarySDValue = (event) => {
    setSecondarySDValue(event.target.value);
  };

  const onChangeSecondaryEDValue = (event) => {
    setSecondaryEDValue(event.target.value);
  };

  const onChangeSecondarySchoolValueInput = (event) => {
    setSecondarySchoolValue(event.target.value);
  };

  const onChangeTertiarySDValue = (event) => {
    setTertiarySDValue(event.target.value);
  };

  const onChangeTertiaryEDValue = (event) => {
    setTertiaryEDValue(event.target.value);
  };

  const onChangeTertiaryDescriptionValueInput = (event) => {
    setTertiaryDescriptionValue(event.target.value);
  };

  const onChangeTertiaryInstituteValueInput = (event) => {
    setTertiaryInstituteValue(event.target.value);
  };

  const onChangeUniversitySDValue = (event) => {
    setUniversitySDValue(event.target.value);
  };

  const onChangeUniversityEDValue = (event) => {
    setUniversityEDValue(event.target.value);
  };

  const onChangeUniversityDescriptionValueInput = (event) => {
    setUniversityDescriptionValue(event.target.value);
  };

  const onChangeUniversityInstituteValueInput = (event) => {
    setUniversityInstituteValue(event.target.value);
  };

  const onChangeInformalSDValue = (event) => {
    setInformalSDValue(event.target.value);
  };

  const onChangeInformalEDValue = (event) => {
    setInformalEDValue(event.target.value);
  };

  const onChangeInformalDescriptionValueInput = (event) => {
    setInformalDescriptionValue(event.target.value);
  };

  const onChangeInformalInstituteValueInput = (event) => {
    setInformalInstituteValue(event.target.value);
  };

  const onChangeWorkExperienceCompanyValueInput = (event) => {
    setWorkExperienceCompanyValue(event.target.value);
  };

  const onChangeWorkExperienceSDValue = (event) => {
    setWorkExperienceSDValue(event.target.value);
  };

  const onChangeWorkExperienceEDValue = (event) => {
    setWorkExperienceEDValue(event.target.value);
  };

  const onChangeWorkExperienceDescriptionValueInput = (event) => {
    setWorkExperienceDescriptionValue(event.target.value);
  };

  const studiesBodyConstructor = () => {
    const primaryStudies = {
      startDate: primarySDValue,
      endDate: primaryEDValue,
      school: primarySchoolValue
    };

    const secondaryStudies = {
      startDate: secondarySDValue,
      endDate: secondaryEDValue,
      school: secondarySchoolValue
    };

    const tertiaryStudies = [
      {
        startDate: tertiarySDValue,
        endDate: tertiaryEDValue,
        description: tertiaryDescriptionValue,
        institute: tertiaryInstituteValue
      }
    ];

    const universityStudies = [
      {
        startDate: universitySDValue,
        endDate: universityEDValue,
        description: universityDescriptionValue,
        institute: universityInstituteValue
      }
    ];

    const informalStudies = [
      {
        startDate: informalSDValue,
        endDate: informalEDValue,
        description: informalDescriptionValue,
        institute: informalInstituteValue
      }
    ];

    return {
      primaryStudies,
      secondaryStudies,
      tertiaryStudies,
      universityStudies,
      informalStudies
    };
  };

  const workExperienceBodyConstructor = () => {
    const workExperience = [
      {
        company: workExperienceCompanyValue,
        startDate: workExperienceSDValue,
        endDate: workExperienceEDValue,
        description: workExperienceDescriptionValue
      }
    ];

    return workExperience;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    // saveButton.disables = !!params.get('id');

    let url = '';

    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: firstNameValue,
        lastName: lastNameValue,
        email: emailValue,
        password: passwordValue,
        address: addressValue,
        birthday: birthdayValue,
        available: availableValue,
        phone: phoneValue,
        profiles: undefined /* profilesBodyContructor() */,
        contactRange: {
          from: contactFromValue.match(hoursRegEx)
            ? contactFromValue
            : setShowError('Hours must have HH:MM format'),
          to: contactToValue.match(hoursRegEx)
            ? contactToValue
            : setShowError('Hours must have HH:MM format')
        },
        studies: studiesBodyConstructor(),
        workExperience: workExperienceBodyConstructor()
      }),
      method: 'POST'
    };

    options.method = 'POST';
    url = `${process.env.REACT_APP_API}/postulants`;

    if (postulantId) {
      options.method = 'PUT';
      url = `${process.env.REACT_APP_API}/postulants/${postulantId}`;
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
        history.push(`/postulants`);
      })
      .catch((err) => {
        setShowError(err);
      });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <h2 className={styles.title}>Form</h2>
        <div>
          <h3>Full name</h3>
          <input
            value={firstNameValue}
            className={styles.input}
            id="firstName"
            name="firstName"
            placeholder="First Name"
            onChange={onChangeFirstNameInput}
            type="text"
            required
          />
          <input
            className={styles.input}
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            value={lastNameValue}
            onChange={onChangeLastNameInput}
            type="text"
            required
          />
        </div>
        <div>
          <h3>Email</h3>
          <input
            className={styles.input}
            id="email"
            name="email"
            placeholder="Email"
            value={emailValue}
            onChange={onChangeEmailInput}
            type="email"
            required
          />
        </div>
        <div>
          <h3>Password</h3>
          <input
            className={styles.input}
            id="password"
            name="password"
            placeholder="Password"
            value={passwordValue}
            onChange={onChangePasswordInput}
            type="password"
            required
          />
        </div>
        <div>
          <h3>Contact Range</h3>
          <input
            className={styles.input}
            id="contactFrom"
            name="contactFrom"
            placeholder="Contact from"
            value={contactFromValue}
            onChange={onChangeContactFromValue}
            type="time"
            required
          />
          <input
            className={styles.input}
            id="contactTo"
            name="contactTo"
            placeholder="Contact To"
            value={contactToValue}
            onChange={onChangeContactToValue}
            type="time"
            required
          />
        </div>
        <div>
          <h3>Address</h3>
          <input
            className={styles.input}
            id="address"
            name="address"
            placeholder="Address"
            value={addressValue}
            onChange={onChangeAddressInput}
            type="text"
            required
          />
        </div>
        <div>
          <h3>Birthday</h3>
          <input
            className={styles.input}
            id="birthday"
            name="birthday"
            placeholder="birthday"
            value={birthdayValue}
            onChange={onChangeBirthdayInput}
            type="date"
            required
          />
        </div>
        <div>
          <h3>Availability</h3>
          <input
            className={styles.input}
            id="available"
            name="available"
            checked={availableValue}
            onChange={onChangeAvailableInput}
            type="checkbox"
            required
          />
        </div>
        <div>
          <h3>Phone</h3>
          <input
            className={styles.input}
            id="phone"
            name="phone"
            placeholder="Phone"
            value={phoneValue}
            onChange={onChangePhoneInput}
            type="tel"
            required
          />
        </div>
        <h3>Primary Studies</h3>
        <div>
          <input
            className={styles.input}
            id="primarySD"
            name="primarySD"
            placeholder="Start Date"
            value={primarySDValue}
            onChange={onChangePrimarySDValue}
            type="date"
            required
          />
          <input
            className={styles.input}
            id="primaryED"
            name="primaryED"
            placeholder="End Date"
            value={primaryEDValue}
            onChange={onChangePrimaryEDValue}
            type="date"
            required
          />
          <input
            className={styles.input}
            id="primary"
            name="primary"
            placeholder="Primary School Name"
            value={primarySchoolValue}
            onChange={onChangePrimarySchoolValueInput}
            type="text"
            required
          />
        </div>
        <h3>Secondary Studies</h3>
        <div>
          <input
            className={styles.input}
            id="secondarySD"
            name="secondarySD"
            placeholder="Start Date"
            value={secondarySDValue}
            onChange={onChangeSecondarySDValue}
            type="date"
            required
          />
          <input
            className={styles.input}
            id="secondaryED"
            name="secondaryED"
            placeholder="End Date"
            value={secondaryEDValue}
            onChange={onChangeSecondaryEDValue}
            type="date"
            required
          />
          <input
            className={styles.input}
            id="secondary"
            name="secondary"
            placeholder="Secondary School Name"
            value={secondarySchoolValue}
            onChange={onChangeSecondarySchoolValueInput}
            type="text"
            required
          />
        </div>
        <h3>Tertiary Studies</h3>
        <div>
          <input
            className={styles.input}
            id="tertiarySD"
            name="tertiarySD"
            placeholder="Start Date"
            value={tertiarySDValue}
            onChange={onChangeTertiarySDValue}
            type="date"
          />
          <input
            className={styles.input}
            id="tertiaryED"
            name="tertiaryED"
            placeholder="End Date"
            value={tertiaryEDValue}
            onChange={onChangeTertiaryEDValue}
            type="date"
          />
          <textarea
            className={styles.input}
            id="tertiaryDescription"
            name="tertiaryDescription"
            placeholder="Tertiary Description"
            value={tertiaryDescriptionValue}
            onChange={onChangeTertiaryDescriptionValueInput}
            rows="5"
            cols="33"
          />
          <input
            className={styles.input}
            id="tertiary"
            name="tertiary"
            placeholder="Tertiary Institute Name"
            value={tertiaryInstituteValue}
            onChange={onChangeTertiaryInstituteValueInput}
            type="text"
          />
        </div>
        <h3>University Studies</h3>
        <div>
          <input
            className={styles.input}
            id="universitySD"
            name="universitySD"
            placeholder="Start Date"
            value={universitySDValue}
            onChange={onChangeUniversitySDValue}
            type="date"
          />
          <input
            className={styles.input}
            id="universityED"
            name="universityED"
            placeholder="End Date"
            value={universityEDValue}
            onChange={onChangeUniversityEDValue}
            type="date"
          />
          <textarea
            className={styles.input}
            id="universityDescription"
            name="universityDescription"
            placeholder="University Description"
            value={universityDescriptionValue}
            onChange={onChangeUniversityDescriptionValueInput}
            rows="5"
            cols="33"
          />
          <input
            className={styles.input}
            id="university"
            name="university"
            placeholder="University Name"
            value={universityInstituteValue}
            onChange={onChangeUniversityInstituteValueInput}
            type="text"
          />
        </div>
        <h3>Informal Studies</h3>
        <div>
          <input
            className={styles.input}
            id="informalSD"
            name="informalSD"
            placeholder="Start Date"
            value={informalSDValue}
            onChange={onChangeInformalSDValue}
            type="date"
          />
          <input
            className={styles.input}
            id="informalED"
            name="informalED"
            placeholder="End Date"
            value={informalEDValue}
            onChange={onChangeInformalEDValue}
            type="date"
          />
          <textarea
            className={styles.input}
            id="informalDescription"
            name="informalDescription"
            placeholder="Informal Studies Description"
            value={informalDescriptionValue}
            onChange={onChangeInformalDescriptionValueInput}
            rows="5"
            cols="33"
          />
          <input
            className={styles.input}
            id="informal"
            name="informal"
            placeholder="Institute Name"
            value={informalInstituteValue}
            onChange={onChangeInformalInstituteValueInput}
            type="text"
          />
        </div>
        <h3>Work Experience</h3>
        <div>
          <input
            className={styles.input}
            id="company"
            name="company"
            placeholder="Company Name"
            value={workExperienceCompanyValue}
            onChange={onChangeWorkExperienceCompanyValueInput}
            type="text"
          />
          <input
            className={styles.input}
            id="workExperienceSD"
            name="workExperienceSD"
            placeholder="Start Date"
            value={workExperienceSDValue}
            onChange={onChangeWorkExperienceSDValue}
            type="date"
          />
          <input
            className={styles.input}
            id="workExperienceED"
            name="workExperienceED"
            placeholder="End Date"
            value={workExperienceEDValue}
            onChange={onChangeWorkExperienceEDValue}
            type="date"
          />
          <textarea
            className={styles.input}
            id="workExperienceDescription"
            name="workExperienceDescription"
            placeholder="Work Experience Description"
            value={workExperienceDescriptionValue}
            onChange={onChangeWorkExperienceDescriptionValueInput}
            rows="5"
            cols="33"
          />
        </div>
        <Button name="saveButton" entity="POSTULANT" />
      </form>
      <div className={styles.showError}>{showError.message}</div>
    </div>
  );
}

export default PostulantsForm;
