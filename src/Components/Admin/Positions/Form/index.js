import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useQuery from 'Hooks/useQuery';
import styles from './form.module.css';
import Input from 'Components/Shared/InputV2';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import Select from 'Components/Shared/SelectV2';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { getPositionById, createPosition, updatePosition } from 'redux/positions/thunks';
import { getProfiles } from 'redux/profiles/thunks';
import { getClients } from 'redux/clients/thunks';
import { cleanError, cleanSelectedItem } from 'redux/positions/actions';

function PositionForm() {
  const [professionalProfileIdValue, setProfessionalProfileIdValue] = useState('');
  const [clientIdValue, setClientIdValue] = useState('');
  const [isOpenValue, setIsOpenValue] = useState('');
  const [selectClient, setSelectClient] = useState([]);
  const [selectProfessionalProfile, setSelectProfessionalProfile] = useState([]);

  const query = useQuery();
  const history = useHistory();
  const dispatch = useDispatch();
  const selectedPosition = useSelector((store) => store.positions.selectedItem);
  const error = useSelector((store) => store.positions.error);

  useEffect(() => {
    const positionId = query.get('_id');
    if (positionId) {
      dispatch(getPositionById(positionId));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(selectedPosition).length) {
      setClientIdValue(selectedPosition.client?._id);
      setProfessionalProfileIdValue(selectedPosition.professionalProfile?._id);
      setIsOpenValue(selectedPosition.isOpen);
    }
  }, [selectedPosition]);

  useEffect(() => {
    return () => {
      dispatch(cleanSelectedItem());
    };
  }, []);

  useEffect(() => {
    dispatch(getProfiles()).then((response) => {
      setSelectProfessionalProfile(
        response.map((professionalProfile) => ({
          value: professionalProfile._id,
          label: professionalProfile.name
        }))
      );
    });

    dispatch(getClients())
      .then((response) => {
        setSelectClient(
          response.map((client) => ({
            value: client._id,
            label: client.name
          }))
        );
      })
      .catch((error) => {
        return error.toString();
      });
  }, []);

  const onSubmit = (formValues) => {
    const positionId = query.get('_id');

    if (positionId) {
      dispatch(updatePosition(positionId, formValues)).then((response) => {
        if (response) {
          history.push('/admin/positions/list');
        }
      });
    } else {
      dispatch(createPosition(formValues)).then((response) => {
        if (response) {
          history.push('/admin/positions/list');
        }
      });
    }
  };

  const validate = (formValues) => {
    const errors = {};
    if (!formValues.client) {
      errors.client = 'Client Name is required';
    }
    if (!formValues.jobDescription) {
      errors.jobDescription = 'Job Description is required';
    }
    if (!formValues.jobDescription) {
      errors.jobDescription = 'Job Description is required';
    }
    if (!formValues.vacancy) {
      errors.vacancy = 'Vacancy is required';
    }
    if (!formValues.professionalProfile) {
      errors.professionalProfile = 'Professional profile is required';
    }
    if (!formValues.isOpen && formValues.isOpen !== false) {
      errors.isOpen = 'Open status is required';
    }
    return errors;
  };

  const required = (value) => {
    return value ? undefined : 'Required';
  };

  return (
    <div>
      <Modal
        show={!!error || !!error.message}
        title="Error"
        message={!!error || !!error.message}
        cancel={{
          text: 'Close',
          callback: () => dispatch(cleanError())
        }}
      />
      <Form
        onSubmit={onSubmit}
        validate={validate}
        initialValues={selectedPosition}
        render={(formProps) => (
          <form onSubmit={formProps.handleSubmit} className={styles.container}>
            <h2 className={styles.title}>Position</h2>
            <Field
              name="client"
              title="Select a Client Name"
              disabled={formProps.submitting}
              component={Select}
              validate={required}
              arrayToMap={selectClient}
              initialValue={clientIdValue}
              value={clientIdValue}
            />
            <Field
              name="jobDescription"
              label="Job Description"
              placeholder="Insert Job Description"
              disabled={formProps.submitting}
              component={Input}
              validate={required}
            />
            <Field
              name="vacancy"
              label="Vacancy"
              placeholder="Insert number of vacancies"
              disabled={formProps.submitting}
              component={Input}
              validate={required}
            />
            <Field
              name="professionalProfile"
              title="Professional Profile"
              disabled={formProps.submitting}
              component={Select}
              validate={required}
              arrayToMap={selectProfessionalProfile}
              initialValue={professionalProfileIdValue}
            />
            <Field
              name="isOpen"
              title="Is Open?"
              disabled={formProps.submitting}
              component={Select}
              arrayToMap={[
                { value: 'true', label: 'Yes' },
                { value: 'false', label: 'No' }
              ]}
              initialValue={isOpenValue}
            />
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

export default PositionForm;
