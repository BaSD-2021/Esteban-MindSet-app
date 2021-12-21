import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import useQuery from 'Hooks/useQuery';
import styles from './form.module.css';
import Input2 from 'Components/Shared/Input2';
import Checkbox2 from 'Components/Shared/Checkbox2';
import Textarea2 from 'Components/Shared/Textarea2';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import { cleanError } from 'redux/postulants/actions';
import { addPostulant, updatePostulant, getPostulantById } from 'redux/postulants/thunks';
import { useSelector, useDispatch } from 'react-redux';

const hoursRegEx = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

function PostulantForm() {
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
        from: contactFromValue.match(hoursRegEx)
          ? contactFromValue
          : setShowError('Hours must have HH:MM format'),
        to: contactToValue.match(hoursRegEx)
          ? contactToValue
          : setShowError('Hours must have HH:MM format')
      },
      studies: studiesBodyConstructor(formValues),
      workExperience: workExperienceBodyConstructor(formValues)
    };

    if (postulantId) {
      dispatch(updatePostulant(postulantId, body)).then((response) => {
        if (response) {
          history.push('/admin/postulants/list');
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
  // validations

  const validate = (formValues) => {
    const errors = {};
    if (!formValues.firstName) {
      errors.firstName = 'First Name is required';
    }
    if (!formValues.lastName) {
      errors.lastName = 'Last Name is required';
    }
    if (!formValues.email) {
      errors.email = 'Email is required';
    }
    if (!formValues.password) {
      errors.password = 'Password is required';
    }
    if (!formValues.address) {
      errors.address = 'Address is required';
    }
    if (!formValues.birthday) {
      errors.birthday = 'Birthday is required';
    }
    if (!formValues.phone) {
      errors.phone = 'Phone is required';
    }
    if (!formValues.primarySD) {
      errors.primarySD = 'Primary studies start date is required';
    }
    if (!formValues.primaryED) {
      errors.primaryED = 'Primary studies end date is required';
    }
    if (!formValues.primary) {
      errors.primary = 'Primary studies school is required';
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
              component={Input2}
              disabled={formProps.submitting}
              initialValue={firstNameValue}
              value={firstNameValue}
            />
            <Field
              name="lastName"
              title="Last Name"
              placeholder="Johnson"
              type="text"
              component={Input2}
              disabled={formProps.submitting}
              value={lastNameValue}
              initialValue={lastNameValue}
            />
            <Field
              title="E-Mail"
              name="email"
              placeholder="bjohnson@gmail.com"
              type="email"
              component={Input2}
              disabled={formProps.submitting}
              initialValue={emailValue}
              value={emailValue}
            />
            <Field
              title="Password"
              name="password"
              placeholder="Your password"
              type="password"
              component={Input2}
              disabled={formProps.submitting}
              initialValue={passwordValue}
              value={passwordValue}
            />
            <div>
              <Field
                title="Contact From"
                name="contactFrom"
                type="time"
                component={Input2}
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
                component={Input2}
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
              component={Input2}
              disabled={formProps.submitting}
              initialValue={addressValue}
              value={addressValue}
            />
            <Field
              title="Birthday"
              name="birthday"
              type="date"
              component={Input2}
              disabled={formProps.submitting}
              initialValue={birthdayValue}
              value={birthdayValue}
            />
            <Field
              label="Availability"
              name="available"
              component={Checkbox2}
              type="checkbox"
              disabled={formProps.submitting}
              initialValue={availableValue}
            />
            <Field
              title="Phone"
              name="phone"
              placeholder="123456789"
              type="tel"
              component={Input2}
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
                component={Input2}
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
                component={Input2}
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
              component={Input2}
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
                component={Input2}
                disabled={formProps.submitting}
                initialValue={secondarySDValue}
                value={secondarySDValue}
                style={styles.doubleInputs}
              />
              <Field
                title="Finish Date"
                name="secondaryED"
                type="date"
                component={Input2}
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
              component={Input2}
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
                component={Input2}
                disabled={formProps.submitting}
                initialValue={tertiarySDValue}
                value={tertiarySDValue}
                style={styles.doubleInputs}
              />
              <Field
                title="Finish Date"
                name="tertiaryED"
                type="date"
                component={Input2}
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
              component={Textarea2}
              disabled={formProps.submitting}
              initialValue={tertiaryDescriptionValue}
              value={tertiaryDescriptionValue}
            />
            <Field
              title="Superior Studies Institute Name"
              name="tertiary"
              placeholder="Lake Smith Institute"
              type="text"
              component={Input2}
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
                component={Input2}
                disabled={formProps.submitting}
                initialValue={universitySDValue}
                value={universitySDValue}
                style={styles.doubleInputs}
              />
              <Field
                title="Finish Date"
                name="universityED"
                type="date"
                component={Input2}
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
              component={Textarea2}
              disabled={formProps.submitting}
              initialValue={universityDescriptionValue}
              value={universityDescriptionValue}
            />
            <Field
              title="University Name"
              name="university"
              placeholder="Fake University"
              type="text"
              component={Input2}
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
                component={Input2}
                disabled={formProps.submitting}
                initialValue={informalSDValue}
                value={informalSDValue}
                style={styles.doubleInputs}
              />
              <Field
                title="End Date"
                name="informalED"
                type="date"
                component={Input2}
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
              component={Textarea2}
              disabled={formProps.submitting}
              initialValue={informalDescriptionValue}
              value={informalDescriptionValue}
            />
            <Field
              title="Institute Name"
              name="informal"
              placeholder="Fake Institute"
              type="text"
              component={Input2}
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
              component={Input2}
              disabled={formProps.submitting}
              initialValue={workExperienceCompanyValue}
              value={workExperienceCompanyValue}
            />
            <div>
              <Field
                title="Start Date"
                name="workExperienceSD"
                type="date"
                component={Input2}
                disabled={formProps.submitting}
                initialValue={workExperienceSDValue}
                value={workExperienceSDValue}
                style={styles.doubleInputs}
              />
              <Field
                title="End Date"
                name="workExperienceED"
                type="date"
                component={Input2}
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
              component={Textarea2}
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

export default PostulantForm;
