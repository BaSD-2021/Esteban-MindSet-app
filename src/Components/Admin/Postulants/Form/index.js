import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import useQuery from 'Hooks/useQuery';
import styles from './form.module.css';
import Checkbox2 from 'Components/Shared/Checkbox2';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import { cleanError } from 'redux/postulants/actions';
import { addPostulant, updatePostulant, getPostulantById } from 'redux/postulants/thunks';
import { useSelector, useDispatch } from 'react-redux';

function PostulantForm() {
  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
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
      <h2 className={styles.title}>Postulant</h2>
      <div className={styles.informationContainer}>
        <p className={styles.subtitle}>Personal Data</p>
        <p className={styles.p}>First Name: {firstNameValue}</p>
        <p className={styles.p}>Last Name: {lastNameValue}</p>
        <p className={styles.p}>Email: {emailValue}</p>
        <p className={styles.subtitle}>Contact Range</p>
        <div className={styles.contactRange}>
          <p className={styles.p}>From: {contactFromValue}</p>
          <p className={styles.p}>To: {contactToValue}</p>
        </div>
        <p className={styles.p}>Address: {addressValue}</p>
        <p className={styles.p}>Birthday: {birthdayValue}</p>
        <p className={styles.p}>Phone: {phoneValue}</p>
        <p className={styles.subtitle}>Elementary studies</p>
        <p className={styles.p}>Start Date: {primaryEDValue}</p>
        <p className={styles.p}>End Date: {primarySDValue}</p>
        <p className={styles.p}>School: {primarySchoolValue}</p>
        <p className={styles.subtitle}>High School</p>
        <p className={styles.p}>Start Date: {secondarySDValue}</p>
        <p className={styles.p}>End Date: {secondaryEDValue}</p>
        <p className={styles.p}>High School: {secondarySchoolValue}</p>
        <p className={styles.subtitle}>Superior Studies</p>
        <p className={styles.p}>Start Date: {tertiarySDValue}</p>
        <p className={styles.p}>End Date: {tertiaryEDValue}</p>
        <p className={styles.p}>Description: {tertiaryDescriptionValue}</p>
        <p className={styles.p}>Institute: {tertiaryInstituteValue}</p>
        <p className={styles.subtitle}>University Studies </p>
        <p className={styles.p}>Start Date: {universitySDValue}</p>
        <p className={styles.p}>End Date: {universityEDValue}</p>
        <p className={styles.p}>Description: {universityDescriptionValue}</p>
        <p className={styles.p}>Institute: {universityInstituteValue}</p>
        <p className={styles.subtitle}>Informal Studies </p>
        <p className={styles.p}>Start Date: {informalSDValue}</p>
        <p className={styles.p}>End Date: {informalEDValue}</p>
        <p className={styles.p}>Description: {informalDescriptionValue}</p>
        <p className={styles.p}>Institute: {informalInstituteValue}</p>
        <p className={styles.subtitle}>Work Experience </p>
        <p className={styles.p}>Company: {workExperienceCompanyValue}</p>
        <p className={styles.p}>Start Date: {workExperienceSDValue}</p>
        <p className={styles.p}>End Date: {workExperienceEDValue}</p>
        <p className={styles.p}>Description: {workExperienceDescriptionValue}</p>
      </div>
      <Form
        onSubmit={onSubmit}
        render={(formProps) => (
          <form onSubmit={formProps.handleSubmit} className={styles.container}>
            <Field
              label="Available"
              name="available"
              component={Checkbox2}
              type="checkbox"
              disabled={formProps.submitting}
              initialValue={availableValue}
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
