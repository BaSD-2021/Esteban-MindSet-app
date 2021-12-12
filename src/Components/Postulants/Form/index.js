import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useQuery from '../../../Hooks/useQuery';
import styles from './form.module.css';
import Input from '../../Shared/Input';
import Textarea from '../../Shared/Textarea';
import Button from '../../Shared/Button';
import Checkbox from '../../Shared/Checkbox';

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
  const [isLoading, setIsLoading] = useState('');
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
    setAvailableValue(fillData.available || false);
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
        profiles: undefined,
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
        history.push(`/postulants`);
      })
      .catch((err) => {
        setShowError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <h2 className={styles.title}>Postulant</h2>
        <Input
          title="First Name"
          value={firstNameValue}
          id="firstName"
          name="firstName"
          placeholder="Boris"
          onChange={onChangeFirstNameInput}
          type="text"
          disabled={isLoading}
          required
        />
        <Input
          title="Last Name"
          id="lastName"
          name="lastName"
          placeholder="Johnson"
          value={lastNameValue}
          onChange={onChangeLastNameInput}
          type="text"
          disabled={isLoading}
          required
        />
        <Input
          title="E-Mail"
          id="email"
          name="email"
          placeholder="bjohnson@gmail.com"
          value={emailValue}
          onChange={onChangeEmailInput}
          type="email"
          disabled={isLoading}
          required
        />
        <Input
          title="Password"
          id="password"
          name="password"
          placeholder="Your password"
          value={passwordValue}
          onChange={onChangePasswordInput}
          type="password"
          disabled={isLoading}
          required
        />
        <div className={styles.doubleInputsContainer}>
          <Input
            title="Contact From"
            id="contactFrom"
            name="contactFrom"
            value={contactFromValue}
            onChange={onChangeContactFromValue}
            type="time"
            style={styles.doubleInputs}
            disabled={isLoading}
            required
          />
          <Input
            title="To"
            id="contactTo"
            name="contactTo"
            placeholder="Contact To"
            value={contactToValue}
            onChange={onChangeContactToValue}
            type="time"
            style={styles.doubleInputs}
            disabled={isLoading}
            required
          />
        </div>
        <Input
          title="Address"
          id="address"
          name="address"
          placeholder="Fake Street 123"
          value={addressValue}
          onChange={onChangeAddressInput}
          type="text"
          disabled={isLoading}
          required
        />
        <Input
          title="Birthday"
          id="birthday"
          name="birthday"
          value={birthdayValue}
          onChange={onChangeBirthdayInput}
          type="date"
          disabled={isLoading}
          required
        />
        <Checkbox
          label="Availability"
          id="available"
          name="available"
          selected={availableValue}
          onChange={onChangeAvailableInput}
        />
        <Input
          title="Phone"
          id="phone"
          name="phone"
          placeholder="123456789"
          value={phoneValue}
          onChange={onChangePhoneInput}
          type="tel"
          disabled={isLoading}
          required
        />
        <h3>Elementary Studies</h3>
        <div className={styles.doubleInputsContainer}>
          <Input
            title="Start Date"
            id="primarySD"
            name="primarySD"
            placeholder="Start Date"
            value={primarySDValue}
            onChange={onChangePrimarySDValue}
            type="date"
            style={styles.doubleInputs}
            disabled={isLoading}
            required
          />
          <Input
            title="Finish Date"
            id="primaryED"
            name="primaryED"
            placeholder="End Date"
            value={primaryEDValue}
            onChange={onChangePrimaryEDValue}
            type="date"
            style={styles.doubleInputs}
            disabled={isLoading}
            required
          />
        </div>
        <Input
          title="Elementary School Name"
          id="primary"
          name="primary"
          placeholder="Fake Elementary School"
          value={primarySchoolValue}
          onChange={onChangePrimarySchoolValueInput}
          type="text"
          disabled={isLoading}
          required
        />
        <h3>High School Studies</h3>
        <div className={styles.doubleInputsContainer}>
          <Input
            title="Start Date"
            id="secondarySD"
            name="secondarySD"
            value={secondarySDValue}
            onChange={onChangeSecondarySDValue}
            type="date"
            style={styles.doubleInputs}
            disabled={isLoading}
            required
          />
          <Input
            title="Finish Date"
            id="secondaryED"
            name="secondaryED"
            value={secondaryEDValue}
            onChange={onChangeSecondaryEDValue}
            type="date"
            style={styles.doubleInputs}
            disabled={isLoading}
            required
          />
        </div>
        <Input
          title="High school Name"
          id="secondary"
          name="secondary"
          placeholder="Fake High School"
          value={secondarySchoolValue}
          onChange={onChangeSecondarySchoolValueInput}
          type="text"
          disabled={isLoading}
          required
        />
        <h3>Superior Studies</h3>
        <div className={styles.doubleInputsContainer}>
          <Input
            title="Start Date"
            id="tertiarySD"
            name="tertiarySD"
            value={tertiarySDValue}
            onChange={onChangeTertiarySDValue}
            type="date"
            style={styles.doubleInputs}
            disabled={isLoading}
          />
          <Input
            title="Finish Date"
            id="tertiaryED"
            name="tertiaryED"
            value={tertiaryEDValue}
            onChange={onChangeTertiaryEDValue}
            type="date"
            style={styles.doubleInputs}
            disabled={isLoading}
          />
        </div>
        <Textarea
          title="Superior Studies Description"
          id="tertiaryDescription"
          name="tertiaryDescription"
          placeholder="Your Superior Studies"
          value={tertiaryDescriptionValue}
          onChange={onChangeTertiaryDescriptionValueInput}
          rows="5"
          cols="33"
          disabled={isLoading}
        />
        <Input
          title="Superior Studies Institute Name"
          id="tertiary"
          name="tertiary"
          placeholder="Fake Institute"
          value={tertiaryInstituteValue}
          onChange={onChangeTertiaryInstituteValueInput}
          type="text"
          disabled={isLoading}
        />
        <h3>University Studies</h3>
        <div className={styles.doubleInputsContainer}>
          <Input
            title="Start Date"
            id="universitySD"
            name="universitySD"
            value={universitySDValue}
            onChange={onChangeUniversitySDValue}
            type="date"
            style={styles.doubleInputs}
            disabled={isLoading}
          />
          <Input
            title="Finish Date"
            id="universityED"
            name="universityED"
            value={universityEDValue}
            onChange={onChangeUniversityEDValue}
            type="date"
            style={styles.doubleInputs}
            disabled={isLoading}
          />
        </div>
        <Textarea
          title="University Studies Description"
          id="universityDescription"
          name="universityDescription"
          placeholder="Your University Studies"
          value={universityDescriptionValue}
          onChange={onChangeUniversityDescriptionValueInput}
          rows="5"
          cols="33"
          disabled={isLoading}
        />
        <Input
          title="University Name"
          id="university"
          name="university"
          placeholder="Fake University"
          value={universityInstituteValue}
          onChange={onChangeUniversityInstituteValueInput}
          type="text"
          disabled={isLoading}
        />
        <h3>Informal Studies</h3>
        <div className={styles.doubleInputsContainer}>
          <Input
            title="Start Date"
            id="informalSD"
            name="informalSD"
            value={informalSDValue}
            onChange={onChangeInformalSDValue}
            type="date"
            style={styles.doubleInputs}
            disabled={isLoading}
          />
          <Input
            title="End Date"
            id="informalED"
            name="informalED"
            value={informalEDValue}
            onChange={onChangeInformalEDValue}
            type="date"
            style={styles.doubleInputs}
            disabled={isLoading}
          />
        </div>
        <Textarea
          title="Informal Studies Description"
          id="informalDescription"
          name="informalDescription"
          placeholder="Informal Studies Description"
          value={informalDescriptionValue}
          onChange={onChangeInformalDescriptionValueInput}
          rows="5"
          cols="33"
          disabled={isLoading}
        />
        <Input
          title="Institute Name"
          id="informal"
          name="informal"
          placeholder="Fake Institute"
          value={informalInstituteValue}
          onChange={onChangeInformalInstituteValueInput}
          type="text"
          disabled={isLoading}
        />
        <h3>Work Experience</h3>
        <Input
          title="Company Name"
          id="company"
          name="company"
          placeholder="Fake Company"
          value={workExperienceCompanyValue}
          onChange={onChangeWorkExperienceCompanyValueInput}
          type="text"
          disabled={isLoading}
        />
        <div className={styles.doubleInputsContainer}>
          <Input
            title="Start Date"
            id="workExperienceSD"
            name="workExperienceSD"
            value={workExperienceSDValue}
            onChange={onChangeWorkExperienceSDValue}
            type="date"
            style={styles.doubleInputs}
            disabled={isLoading}
          />
          <Input
            title="End Date"
            id="workExperienceED"
            name="workExperienceED"
            value={workExperienceEDValue}
            onChange={onChangeWorkExperienceEDValue}
            type="date"
            style={styles.doubleInputs}
            disabled={isLoading}
          />
        </div>
        <Textarea
          title="Work Experience Description"
          id="workExperienceDescription"
          name="workExperienceDescription"
          placeholder="Your Work Experience Description"
          value={workExperienceDescriptionValue}
          onChange={onChangeWorkExperienceDescriptionValueInput}
          rows="5"
          cols="33"
          disabled={isLoading}
        />
        <div className={styles.buttonContainer}>
          <Button label="SAVE" disabled={isLoading} type="submit"></Button>
        </div>
      </form>
      <div className={styles.showError}>{showError.message}</div>
    </div>
  );
}

export default PostulantsForm;
