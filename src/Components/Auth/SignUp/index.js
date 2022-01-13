import { useHistory } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import styles from './signUp.module.css';
import Input2 from 'Components/Shared/Input';
import Checkbox2 from 'Components/Shared/Checkbox';
import Textarea2 from 'Components/Shared/Textarea';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import { cleanError } from 'redux/postulants/actions';
import { addPostulant } from 'redux/postulants/thunks';
import { useSelector, useDispatch } from 'react-redux';

const hoursRegEx = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

function SignUp() {
  const history = useHistory();
  const dispatch = useDispatch();
  const error = useSelector((store) => store.sessions.error);

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

    return dispatch(addPostulant(body)).then((response) => {
      if (response) {
        history.push('/');
      }
    });
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
    // ContactFrom
    if (!formValues.contactFrom?.toString().match(hoursRegEx)) {
      errors.contactFrom = 'Hours must have HH:MM format';
    }
    //ContactTo
    if (!formValues.contactTo?.toString().match(hoursRegEx)) {
      errors.contactTo = 'Hours must have HH:MM format';
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
      errors.primarySD = 'Elementary studies start date is required';
    }
    if (!formValues.primarySD?.match(/^\d{4}-\d{2}-\d{2}$/)) {
      errors.primarySD = 'Elementary start date invalid format';
    }
    if (!formValues.primaryED) {
      errors.primaryED = 'Elementary studies end date is required';
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
      errors.primary = 'Elementary studies school is required';
    }
    if (formValues.primary?.indexOf(' ') === -1) {
      errors.primary = 'Elementary School Name must contain at least one space';
    }
    if (formValues.primary?.length < 3) {
      errors.primary = 'Elementary School Name must contain at least 3 characters';
    }
    //  High School
    if (!formValues.secondarySD) {
      errors.secondarySD = 'High School start date is required';
    }
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

    if (!formValues.secondarySD) {
      errors.secondarySD = 'High School start date is required';
    }
    if (!formValues.secondarySD) {
      errors.secondaryED = 'High School end date is required';
    }
    if (secondarySD > secondaryED) {
      errors.secondaryED = 'High School end date should not be smaller than start date';
    }
    if (!formValues.secondary) {
      errors.secondary = 'High School studies is required';
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
            <h2 className={styles.title}>Sign up</h2>
            <Field
              name="firstName"
              title="First Name *"
              placeholder="Boris"
              type="text"
              component={Input2}
              disabled={formProps.submitting}
            />
            <Field
              name="lastName"
              title="Last Name *"
              placeholder="Johnson"
              type="text"
              component={Input2}
              disabled={formProps.submitting}
            />
            <Field
              title="E-Mail *"
              name="email"
              placeholder="bjohnson@gmail.com"
              type="email"
              component={Input2}
              disabled={formProps.submitting}
            />
            <Field
              title="Password *"
              name="password"
              placeholder="Your password"
              type="password"
              component={Input2}
              disabled={formProps.submitting}
            />
            <div>
              <Field
                title="Contact From *"
                name="contactFrom"
                type="time"
                component={Input2}
                disabled={formProps.submitting}
                style={styles.doubleInputs}
              />
              <Field
                title="To *"
                name="contactTo"
                placeholder="Contact To"
                type="time"
                component={Input2}
                disabled={formProps.submitting}
                style={styles.doubleInputs}
              />
            </div>
            <Field
              title="Address *"
              name="address"
              placeholder="Fake Street 123"
              type="text"
              component={Input2}
              disabled={formProps.submitting}
            />
            <Field
              title="Birthday *"
              name="birthday"
              type="date"
              component={Input2}
              disabled={formProps.submitting}
            />
            <Field
              label="Availability"
              name="available"
              component={Checkbox2}
              type="checkbox"
              disabled={formProps.submitting}
            />
            <Field
              title="Phone *"
              name="phone"
              placeholder="(123)-456-7899"
              type="number"
              component={Input2}
              disabled={formProps.submitting}
            />
            <h3>Elementary Studies</h3>
            <div>
              <Field
                title="Start Date *"
                name="primarySD"
                placeholder="Start Date"
                type="date"
                component={Input2}
                disabled={formProps.submitting}
                style={styles.doubleInputs}
              />
              <Field
                title="Finish Date *"
                name="primaryED"
                placeholder="End Date"
                type="date"
                component={Input2}
                disabled={formProps.submitting}
                style={styles.doubleInputs}
              />
            </div>
            <Field
              title="Elementary School Name *"
              name="primary"
              placeholder="Coronel O'Higgins"
              type="text"
              component={Input2}
              disabled={formProps.submitting}
            />
            <h3>High School Studies</h3>
            <div>
              <Field
                title="Start Date *"
                name="secondarySD"
                type="date"
                component={Input2}
                disabled={formProps.submitting}
                style={styles.doubleInputs}
              />
              <Field
                title="Finish Date *"
                name="secondaryED"
                type="date"
                component={Input2}
                disabled={formProps.submitting}
                style={styles.doubleInputs}
              />
            </div>
            <Field
              title="High school Name *"
              name="secondary"
              placeholder="Lake Forest High School"
              type="text"
              component={Input2}
              disabled={formProps.submitting}
            />
            <h3>Superior Studies</h3>
            <div>
              <Field
                title="Start Date"
                name="tertiarySD"
                type="date"
                component={Input2}
                disabled={formProps.submitting}
                style={styles.doubleInputs}
              />
              <Field
                title="Finish Date"
                name="tertiaryED"
                type="date"
                component={Input2}
                disabled={formProps.submitting}
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
            />
            <Field
              title="Superior Studies Institute Name"
              name="tertiary"
              placeholder="Lake Smith Institute"
              type="text"
              component={Input2}
              disabled={formProps.submitting}
            />
            <h3>University Studies</h3>
            <div>
              <Field
                title="Start Date"
                name="universitySD"
                type="date"
                component={Input2}
                disabled={formProps.submitting}
                style={styles.doubleInputs}
              />
              <Field
                title="Finish Date"
                name="universityED"
                type="date"
                component={Input2}
                disabled={formProps.submitting}
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
            />
            <Field
              title="University Name"
              name="university"
              placeholder="Fake University"
              type="text"
              component={Input2}
              disabled={formProps.submitting}
            />
            <h3>Informal Studies</h3>
            <div>
              <Field
                title="Start Date"
                name="informalSD"
                type="date"
                component={Input2}
                disabled={formProps.submitting}
                style={styles.doubleInputs}
              />
              <Field
                title="End Date"
                name="informalED"
                type="date"
                component={Input2}
                disabled={formProps.submitting}
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
            />
            <Field
              title="Institute Name"
              name="informal"
              placeholder="Fake Institute"
              type="text"
              component={Input2}
              disabled={formProps.submitting}
            />
            <h3>Work Experience</h3>
            <Field
              title="Company Name"
              name="company"
              placeholder="Fake Company"
              type="text"
              component={Input2}
              disabled={formProps.submitting}
            />
            <div>
              <Field
                title="Start Date"
                name="workExperienceSD"
                type="date"
                component={Input2}
                disabled={formProps.submitting}
                style={styles.doubleInputs}
              />
              <Field
                title="End Date"
                name="workExperienceED"
                type="date"
                component={Input2}
                disabled={formProps.submitting}
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

export default SignUp;
