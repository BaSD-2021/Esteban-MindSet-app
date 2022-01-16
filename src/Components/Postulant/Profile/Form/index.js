import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import useQuery from 'Hooks/useQuery';
import styles from './form.module.css';
import Input from 'Components/Shared/Input';
import Checkbox from 'Components/Shared/Checkbox';
import Textarea from 'Components/Shared/Textarea';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import { cleanError } from 'redux/postulants/actions';
import { addPostulant, updatePostulant, getPostulantById } from 'redux/postulants/thunks';
import { useSelector, useDispatch } from 'react-redux';

function EditProfileForm() {
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
  const query = useQuery();
  const history = useHistory();
  const dispatch = useDispatch();
  const selectedItem = useSelector((store) => store.postulants.selectedPostulant);
  const error = useSelector((store) => store.sessions.error);

  const postulantId = query.get('_id');
  useEffect(() => {
    if (postulantId) {
      dispatch(getPostulantById(postulantId));
    }
  }, []);

  useEffect(() => {
    autoFill(selectedItem);
  }, [selectedItem]);

  const autoFill = (data) => {
    const fillData = data || {};
    let fillPrimStudy = { startDate: null, endDate: null };
    if (fillData.studies && fillData.studies.primaryStudies) {
      fillPrimStudy = fillData.studies.primaryStudies;
    }

    let fillSecStudy = { startDate: null, endDate: null };
    if (fillData.studies && fillData.studies.secondaryStudies) {
      fillSecStudy = fillData.studies.secondaryStudies;
    }

    let fillTerStudy = { startDate: null, endDate: null };
    if (fillData.studies && fillData.studies.tertiaryStudies) {
      fillTerStudy = fillData.studies.tertiaryStudies[0];
    }

    let fillUniStudies = { startDate: null, endDate: null };
    if (fillData.studies && fillData.studies.universityStudies) {
      fillUniStudies = fillData.studies.universityStudies[0];
    }

    let fillInfStudies = { startDate: null, endDate: null };
    if (fillData.studies && fillData.studies.informalStudies) {
      fillInfStudies = fillData.studies.informalStudies[0];
    }

    let fillWorkExp = { startDate: null, endDate: null };
    if (fillData.workExperience) {
      fillWorkExp = fillData.workExperience[0];
    }

    let contactFrom = { from: null, to: null };
    if (fillData.contactRange && fillData.contactRange.from) {
      contactFrom = fillData.contactRange.from;
    }

    let contactTo = { from: null, to: null };
    if (fillData.contactRange && fillData.contactRange.to) {
      contactTo = fillData.contactRange.to;
    }

    setFirstNameValue(fillData.firstName || '');
    setLastNameValue(fillData.lastName || '');
    setEmailValue(fillData.email || '');
    setPasswordValue(fillData.password || '');
    setContactFromValue(contactFrom || '');
    setContactToValue(contactTo || '');
    setAddressValue(fillData.address || '');
    setBirthdayValue(fillData.birthday == null ? '' : fillData.birthday.slice(0, 10));
    setAvailableValue(fillData.available ? true : false);
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

  const studiesBodyConstructor = (formValues) => {
    const primaryStudies = {
      startDate: formValues.primarySD,
      endDate: formValues.primaryED,
      school: formValues.primary
    };

    const secondaryStudies = {
      startDate: formValues.secondarySD,
      endDate: formValues.secondaryED,
      school: formValues.secondary
    };

    const tertiaryStudies = [
      {
        startDate: formValues.tertiarySD,
        endDate: formValues.tertiaryED,
        description: formValues.tertiaryDescription,
        institute: formValues.tertiary
      }
    ];

    const universityStudies = [
      {
        startDate: formValues.universitySD,
        endDate: formValues.universityED,
        description: formValues.universityDescription,
        institute: formValues.university
      }
    ];

    const informalStudies = [
      {
        startDate: formValues.informalSD,
        endDate: formValues.informalED,
        description: formValues.informalDescription,
        institute: formValues.informal
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

  const workExperienceBodyConstructor = (formValues) => {
    const workExperience = [
      {
        company: formValues.company,
        startDate: formValues.workExperienceSD,
        endDate: formValues.workExperienceED,
        description: formValues.workExperienceDescription
      }
    ];

    return workExperience;
  };

  const onSubmit = (formValues) => {
    const body = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password,
      address: formValues.address,
      birthday: formValues.birthday,
      available: formValues.available,
      phone: formValues.phone,
      profiles: formValues.undefined,
      contactRange: {
        from: formValues.contactFrom,
        to: formValues.contactTo
      },
      studies: studiesBodyConstructor(formValues),
      workExperience: workExperienceBodyConstructor(formValues)
    };

    if (postulantId) {
      dispatch(updatePostulant(postulantId, body)).then((response) => {
        if (response) {
          history.push('/postulant/profile');
        }
      });
    } else {
      dispatch(addPostulant(body)).then((response) => {
        if (response) {
          history.push('admin/postulants/list');
        }
      });
    }
  };

  const validate = (formValues) => {
    const errors = {};
    // First Name
    if (!formValues.firstName) {
      errors.firstName = 'First Name is required';
    }
    if (!formValues.firstName?.match(/^[a-zA-Z\u00C0-\u017F\s]+$/)) {
      errors.firstName = 'First name must contain only letters and spaces';
    }
    if (formValues.firstName?.length < 2) {
      errors.firstName = 'First name must be at least 2 letters';
    }
    // Last Name
    if (!formValues.lastName) {
      errors.lastName = 'Last Name is required';
    }
    if (!formValues.lastName?.match(/^[a-zA-Z\u00C0-\u017F\s]+$/)) {
      errors.lastName = 'Last name must contain only letters and spaces';
    }
    if (formValues.lastName?.length < 2) {
      errors.lastName = 'Last name must be at least 2 letters';
    }
    // Email
    if (!formValues.email?.match(/^[^@]+@[a-zA-Z]+\.[a-zA-Z]+$/)) {
      errors.email = 'Fill in a valid email format';
    }
    if (formValues.email?.match(/\s/g)) {
      errors.email = 'Email do not allow spaces';
    }
    if (!formValues.email) {
      errors.email = 'Email is required';
    }
    // Password
    if (!formValues.password) {
      errors.password = 'Password is required';
    }
    if (formValues.password?.search(/[0-9]/) < 0 || formValues.password?.search(/[a-zA-Z]/) < 0) {
      errors.password = 'Password must contain numbers and letters';
    } else if (formValues.password?.length < 6) {
      errors.password = 'Password must contain at least 6 characters';
    }
    // Address
    if (!formValues.address) {
      errors.address = 'Address is required';
    }
    if (
      !formValues.address?.search(/^[a-zA-Z\u00C0-\u017F/s]+$/) < 0 ||
      formValues.address?.search(/[0-9]/) < 0
    ) {
      errors.address = 'Address must contain letters and numbers';
    }
    if (!formValues.address?.match(/\s/g)) {
      errors.address = 'Address must contain at least one space';
    }
    if (formValues.address?.length < 6) {
      errors.address = 'Address must contain at least 6 characters';
    }
    // Birthday
    if (!formValues.birthday) {
      errors.birthday = 'Birthday is required';
    }
    if (!formValues.birthday?.match(/^\d{4}-\d{2}-\d{2}$/)) {
      errors.birthday = 'Birthday invalid format';
    }
    //  Phone
    if (!formValues.phone) {
      errors.phone = 'Phone is required';
    }
    if (!formValues.phone?.toString().match(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)) {
      errors.phone = 'Phone format not valid';
    }
    if (formValues.phone?.length < 6) {
      errors.phone = 'Phone must be at least 6 numbers';
    }
    // Primary Studies
    if (!formValues.primarySD) {
      errors.primarySD = 'Primary studies start date is required';
    }
    if (!formValues.primarySD?.match(/^\d{4}-\d{2}-\d{2}$/)) {
      errors.primarySD = 'Elementary start date invalid format';
    }
    if (!formValues.primaryED) {
      errors.primaryED = 'Primary studies end date is required';
    }
    if (!formValues.primarySD?.match(/^\d{4}-\d{2}-\d{2}$/)) {
      errors.primarySD = 'Elementary end date invalid format';
    }

    const elementarySD = new Date(formValues.primarySD).getTime() / 1000;
    const elementaryED = new Date(formValues.primaryED).getTime() / 1000;

    if (elementarySD > elementaryED) {
      errors.primaryED = 'Primary studies end date should be smaller than start date';
    }
    if (!formValues.primary) {
      errors.primary = 'Primary studies school is required';
    }
    if (formValues.primary?.indexOf(' ') === -1) {
      errors.primary = 'Elementary School Name must contain at least one space';
    }
    if (formValues.primary?.length < 3) {
      errors.primary = 'Elementary School Name must contain at least 3 characters';
    }
    //  High School
    if (formValues.secondarySD) {
      if (!formValues.secondarySD?.match(/^\d{4}-\d{2}-\d{2}$/)) {
        errors.secondarySD = 'High School start date invalid format';
      }
    }
    if (formValues.secondarySD) {
      if (!formValues.secondaryED?.match(/^\d{4}-\d{2}-\d{2}$/)) {
        errors.secondaryED = 'High School end date invalid format';
      }
    }
    const secondarySD = new Date(formValues.secondarySD).getTime() / 1000;
    const secondaryED = new Date(formValues.secondaryED).getTime() / 1000;

    if (secondarySD > secondaryED) {
      errors.secondaryED = 'High School end date should not be smaller than start date';
    }
    if (formValues.secondary) {
      if (formValues.secondary?.indexOf(' ') === -1) {
        errors.secondary = 'High School Name must contain at least one space';
      }
      if (formValues.secondary?.length < 3) {
        errors.secondary = 'High School Name must contain at least 3 characters';
      }
    }
    //  Superior Studies
    if (formValues.tertiarySD) {
      if (!formValues.tertiarySD?.match(/^\d{4}-\d{2}-\d{2}$/)) {
        errors.tertiarySD = 'Superior Studies start date invalid format';
      }
    }
    if (formValues.tertiarySD) {
      if (!formValues.tertiaryED?.match(/^\d{4}-\d{2}-\d{2}$/)) {
        errors.tertiaryED = 'Superior Studies end date invalid format';
      }
    }
    const tertiarySD = new Date(formValues.tertiarySD).getTime() / 1000;
    const tertiaryED = new Date(formValues.tertiaryED).getTime() / 1000;

    if (tertiarySD > tertiaryED) {
      errors.tertiaryED = 'Superior Studies end date should not be smaller than start date';
    }
    if (formValues.tertiaryDescription) {
      if (formValues.tertiaryDescription?.indexOf(' ') === -1) {
        errors.tertiaryDescription = 'Superior Studies description must contain at least one space';
      }
      if (formValues.tertiaryDescription?.length < 3) {
        errors.tertiaryDescription =
          'Superior Studies description must contain at least 3 characters';
      }
    }
    if (formValues.tertiary) {
      if (formValues.tertiary?.indexOf(' ') === -1) {
        errors.tertiary = 'Superior Studies Name must contain at least one space';
      }
      if (formValues.tertiary?.length < 3) {
        errors.tertiary = 'Superior Studies Name must contain at least 3 characters';
      }
    }

    //  university Studies
    if (formValues.universitySD) {
      if (!formValues.universitySD?.match(/^\d{4}-\d{2}-\d{2}$/)) {
        errors.universitySD = 'University Studies start date invalid format';
      }
    }
    if (formValues.universitySD) {
      if (!formValues.universityED?.match(/^\d{4}-\d{2}-\d{2}$/)) {
        errors.universityED = 'University Studies end date invalid format';
      }
    }
    const universitySD = new Date(formValues.universitySD).getTime() / 1000;
    const universityED = new Date(formValues.universityED).getTime() / 1000;

    if (universitySD > universityED) {
      errors.universityED = 'University Studies end date should not be smaller than start date';
    }
    if (formValues.universityDescription) {
      if (formValues.universityDescription?.indexOf(' ') === -1) {
        errors.universityDescription =
          'University Studies description must contain at least one space';
      }
      if (formValues.universityDescription?.length < 3) {
        errors.universityDescription =
          'University Studies description must contain at least 3 characters';
      }
    }
    if (formValues.university) {
      if (formValues.university?.indexOf(' ') === -1) {
        errors.university = 'University Studies Name must contain at least one space';
      }
      if (formValues.university?.length < 3) {
        errors.university = 'University Studies Name must contain at least 3 characters';
      }
    }
    //  Informal Studies
    if (formValues.informalSD) {
      if (!formValues.informalSD?.match(/^\d{4}-\d{2}-\d{2}$/)) {
        errors.informalSD = 'Informal Studies start date invalid format';
      }
    }
    if (formValues.informalSD) {
      if (!formValues.informalED?.match(/^\d{4}-\d{2}-\d{2}$/)) {
        errors.informalED = 'Informal Studies end date invalid format';
      }
    }
    const informalSD = new Date(formValues.informalSD).getTime() / 1000;
    const informalED = new Date(formValues.informalED).getTime() / 1000;

    if (informalSD > informalED) {
      errors.informalED = 'Informal Studies end date should not be smaller than start date';
    }
    if (formValues.informalDescription) {
      if (formValues.informalDescription?.indexOf(' ') === -1) {
        errors.informalDescription = 'Informal Studies description must contain at least one space';
      }
      if (formValues.informalDescription?.length < 3) {
        errors.informalDescription =
          'Informal Studies description must contain at least 3 characters';
      }
    }
    if (formValues.informal) {
      if (formValues.informal?.indexOf(' ') === -1) {
        errors.informal = 'Informal Studies Name must contain at least one space';
      }
      if (formValues.informal?.length < 3) {
        errors.informal = 'Informal Studies Name must contain at least 3 characters';
      }
    }
    //  Work Experience
    if (formValues.company) {
      if (formValues.company?.length < 3) {
        errors.company = 'Work Experience Name must contain at least 3 characters';
      }
    }
    if (formValues.workExperienceSD) {
      if (!formValues.workExperienceSD?.match(/^\d{4}-\d{2}-\d{2}$/)) {
        errors.workExperienceSD = 'Work Experience start date invalid format';
      }
    }
    if (formValues.workExperienceED) {
      if (!formValues.workExperienceED?.match(/^\d{4}-\d{2}-\d{2}$/)) {
        errors.workExperienceED = 'Work Experience end date invalid format';
      }
    }
    const workExperienceSD = new Date(formValues.workExperienceSD).getTime() / 1000;
    const workExperienceED = new Date(formValues.workExperienceED).getTime() / 1000;

    if (workExperienceSD > workExperienceED) {
      errors.workExperienceED = 'Work Experience end date should not be smaller than start date';
    }
    if (formValues.workExperienceDescription) {
      if (formValues.workExperienceDescription?.indexOf(' ') === -1) {
        errors.workExperienceDescription =
          'Work Experience description must contain at least one space';
      }
      if (formValues.workExperienceDescription?.length < 3) {
        errors.workExperienceDescription =
          'Work Experience description must contain at least 3 characters';
      }
    }

    return errors;
  };

  return (
    <div className={styles.container}>
      <Modal
        show={!!error || !!error.message}
        title="Error"
        message={error || error.message}
        cancel={{
          text: 'Close',
          callback: () => dispatch(cleanError())
        }}
      />
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={(formProps) => (
          <form onSubmit={formProps.handleSubmit} className={styles.container}>
            <h2 className={styles.title}>Postulant</h2>
            <Field
              name="firstName"
              title="First Name"
              placeholder="Boris"
              type="text"
              component={Input}
              disabled={formProps.submitting}
              initialValue={firstNameValue}
              value={firstNameValue}
            />
            <Field
              name="lastName"
              title="Last Name"
              placeholder="Johnson"
              type="text"
              component={Input}
              disabled={formProps.submitting}
              value={lastNameValue}
              initialValue={lastNameValue}
            />
            <Field
              title="E-Mail"
              name="email"
              placeholder="bjohnson@gmail.com"
              type="email"
              component={Input}
              disabled={formProps.submitting}
              initialValue={emailValue}
              value={emailValue}
            />
            <Field
              title="Password"
              name="password"
              placeholder="Your password"
              type="password"
              component={Input}
              disabled={formProps.submitting}
              initialValue={passwordValue}
              value={passwordValue}
            />
            <div>
              <Field
                title="Contact From"
                name="contactFrom"
                type="time"
                component={Input}
                disabled={formProps.submitting}
                initialValue={contactFromValue}
                value={contactFromValue}
                style={styles.doubleInputs}
              />
              <Field
                title="To"
                name="contactTo"
                placeholder="Contact To"
                type="time"
                component={Input}
                disabled={formProps.submitting}
                initialValue={contactToValue}
                value={contactToValue}
                style={styles.doubleInputs}
              />
            </div>
            <Field
              title="Address"
              name="address"
              placeholder="Fake Street 123"
              type="text"
              component={Input}
              disabled={formProps.submitting}
              initialValue={addressValue}
              value={addressValue}
            />
            <Field
              title="Birthday"
              name="birthday"
              type="date"
              component={Input}
              disabled={formProps.submitting}
              initialValue={birthdayValue}
              value={birthdayValue}
            />
            <Field
              label="Availability"
              name="available"
              component={Checkbox}
              type="checkbox"
              disabled={formProps.submitting}
              initialValue={availableValue}
            />
            <Field
              title="Phone"
              name="phone"
              placeholder="(123)-456-7899"
              type="number"
              component={Input}
              disabled={formProps.submitting}
              initialValue={phoneValue}
              value={phoneValue}
            />
            <h3>Elementary Studies</h3>
            <div>
              <Field
                title="Start Date"
                name="primarySD"
                placeholder="Start Date"
                type="date"
                component={Input}
                initialValue={primarySDValue}
                value={primarySDValue}
                disabled={formProps.submitting}
                style={styles.doubleInputs}
              />
              <Field
                title="Finish Date"
                name="primaryED"
                placeholder="End Date"
                type="date"
                component={Input}
                disabled={formProps.submitting}
                initialValue={primaryEDValue}
                value={primaryEDValue}
                style={styles.doubleInputs}
              />
            </div>
            <Field
              title="Elementary School Name"
              name="primary"
              placeholder="Coronel O'Higgins"
              type="text"
              component={Input}
              disabled={formProps.submitting}
              initialValue={primarySchoolValue}
              value={primarySchoolValue}
            />
            <h3>High School Studies</h3>
            <div>
              <Field
                title="Start Date"
                name="secondarySD"
                type="date"
                component={Input}
                disabled={formProps.submitting}
                initialValue={secondarySDValue}
                value={secondarySDValue}
                style={styles.doubleInputs}
              />
              <Field
                title="Finish Date"
                name="secondaryED"
                type="date"
                component={Input}
                disabled={formProps.submitting}
                initialValue={secondaryEDValue}
                value={secondaryEDValue}
                style={styles.doubleInputs}
              />
            </div>
            <Field
              title="High school Name"
              name="secondary"
              placeholder="Lake Forest High School"
              type="text"
              component={Input}
              disabled={formProps.submitting}
              initialValue={secondarySchoolValue}
              value={secondarySchoolValue}
            />
            <h3>Superior Studies</h3>
            <div>
              <Field
                title="Start Date"
                name="tertiarySD"
                type="date"
                component={Input}
                disabled={formProps.submitting}
                initialValue={tertiarySDValue}
                value={tertiarySDValue}
                style={styles.doubleInputs}
              />
              <Field
                title="Finish Date"
                name="tertiaryED"
                type="date"
                component={Input}
                disabled={formProps.submitting}
                initialValue={tertiaryEDValue}
                value={tertiaryEDValue}
                style={styles.doubleInputs}
              />
            </div>
            <Field
              title="Superior Studies Description"
              name="tertiaryDescription"
              placeholder="Your Superior Studies"
              rows="5"
              cols="33"
              component={Textarea}
              disabled={formProps.submitting}
              initialValue={tertiaryDescriptionValue}
              value={tertiaryDescriptionValue}
            />
            <Field
              title="Superior Studies Institute Name"
              name="tertiary"
              placeholder="Lake Smith Institute"
              type="text"
              component={Input}
              disabled={formProps.submitting}
              initialValue={tertiaryInstituteValue}
              value={tertiaryInstituteValue}
            />
            <h3>University Studies</h3>
            <div>
              <Field
                title="Start Date"
                name="universitySD"
                type="date"
                component={Input}
                disabled={formProps.submitting}
                initialValue={universitySDValue}
                value={universitySDValue}
                style={styles.doubleInputs}
              />
              <Field
                title="Finish Date"
                name="universityED"
                type="date"
                component={Input}
                disabled={formProps.submitting}
                initialValue={universityEDValue}
                value={universityEDValue}
                style={styles.doubleInputs}
              />
            </div>
            <Field
              title="University Studies Description"
              name="universityDescription"
              placeholder="Your University Studies"
              rows="5"
              cols="33"
              component={Textarea}
              disabled={formProps.submitting}
              initialValue={universityDescriptionValue}
              value={universityDescriptionValue}
            />
            <Field
              title="University Name"
              name="university"
              placeholder="Fake University"
              type="text"
              component={Input}
              disabled={formProps.submitting}
              initialValue={universityInstituteValue}
              value={universityInstituteValue}
            />
            <h3>Informal Studies</h3>
            <div>
              <Field
                title="Start Date"
                name="informalSD"
                type="date"
                component={Input}
                disabled={formProps.submitting}
                initialValue={informalSDValue}
                value={informalSDValue}
                style={styles.doubleInputs}
              />
              <Field
                title="End Date"
                name="informalED"
                type="date"
                component={Input}
                disabled={formProps.submitting}
                initialValue={informalEDValue}
                value={informalEDValue}
                style={styles.doubleInputs}
              />
            </div>
            <Field
              title="Informal Studies Description"
              name="informalDescription"
              placeholder="Informal Studies Description"
              rows="5"
              cols="33"
              component={Textarea}
              disabled={formProps.submitting}
              initialValue={informalDescriptionValue}
              value={informalDescriptionValue}
            />
            <Field
              title="Institute Name"
              name="informal"
              placeholder="Fake Institute"
              type="text"
              component={Input}
              disabled={formProps.submitting}
              initialValue={informalInstituteValue}
              value={informalInstituteValue}
            />
            <h3>Work Experience</h3>
            <Field
              title="Company Name"
              name="company"
              placeholder="Fake Company"
              type="text"
              component={Input}
              disabled={formProps.submitting}
              initialValue={workExperienceCompanyValue}
              value={workExperienceCompanyValue}
            />
            <div>
              <Field
                title="Start Date"
                name="workExperienceSD"
                type="date"
                component={Input}
                disabled={formProps.submitting}
                initialValue={workExperienceSDValue}
                value={workExperienceSDValue}
                style={styles.doubleInputs}
              />
              <Field
                title="End Date"
                name="workExperienceED"
                type="date"
                component={Input}
                disabled={formProps.submitting}
                initialValue={workExperienceEDValue}
                value={workExperienceEDValue}
                style={styles.doubleInputs}
              />
            </div>
            <Field
              title="Work Experience Description"
              name="workExperienceDescription"
              placeholder="Your Work Experience Description"
              rows="5"
              cols="33"
              component={Textarea}
              disabled={formProps.submitting}
              initialValue={workExperienceDescriptionValue}
              value={workExperienceDescriptionValue}
            />
            <div className={styles.buttonContainer}>
              <Button
                label="Save"
                disabled={formProps.submitting || formProps.pristine}
                type="submit"
              ></Button>
            </div>
          </form>
        )}
      />
    </div>
  );
}

export default EditProfileForm;
