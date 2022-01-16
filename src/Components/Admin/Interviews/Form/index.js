import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import useQuery from 'Hooks/useQuery';
import styles from './form.module.css';
import Input from 'Components/Shared/Input';
import Select from 'Components/Shared/Select';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { createInterview, getInterviewById, updateInterview } from 'redux/interviews/thunks';
import { getPostulants } from 'redux/postulants/thunks';
import { getClients } from 'redux/clients/thunks';
import { getApplications } from 'redux/applications/thunks';
import { cleanError, cleanSelectedItem } from 'redux/interviews/actions';

function InterviewForm() {
  const [postulantIdValue, setPostulantIdValue] = useState('');
  const [clientIdValue, setClientIdValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [applicationIdValue, setApplicationIdValue] = useState('');
  const [notesValue, setNotesValue] = useState('');
  const [selectPostulant, setSelectPostulant] = useState([]);
  const [selectClient, setSelectClient] = useState([]);
  const [selectApplication, setSelectApplication] = useState([]);

  const error = useSelector((store) => store.interviews.error);
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const selectedItem = useSelector((store) => store.interviews.selectedItem);

  useEffect(() => {
    const interviewId = query.get('_id');
    if (interviewId) {
      dispatch(getInterviewById(interviewId));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(selectedItem).length) {
      setPostulantIdValue(selectedItem.postulant?._id);
      setClientIdValue(selectedItem.client?._id);
      setApplicationIdValue(selectedItem.application?._id);
      setStatusValue(selectedItem.status);
      setDateValue(selectedItem.date);
      setNotesValue(selectedItem.notes);
    }
  }, [selectedItem]);

  useEffect(() => {
    return () => {
      dispatch(cleanSelectedItem());
    };
  }, []);

  useEffect(() => {
    dispatch(getPostulants()).then((response) => {
      setSelectPostulant(
        response.map((postulant) => ({
          value: postulant._id,
          label: `${postulant.firstName} ${postulant.lastName}`
        }))
      );
    });

    dispatch(getClients()).then((response) => {
      setSelectClient(
        response.map((client) => ({
          value: client._id,
          label: client.name
        }))
      );
    });

    dispatch(getApplications()).then((response) => {
      setSelectApplication(
        response.map((application) => ({
          value: application._id,
          label: application._id
        }))
      );
    });
  }, []);

  const onSubmit = (formValues) => {
    const interviewId = query.get('_id');
    const bodyToEdit = {
      postulant: formValues.postulant._id,
      client: formValues.client._id,
      application: formValues.application._id,
      status: formValues.status,
      date: formValues.date,
      notes: formValues.notes
    };
    const bodyToAdd = {
      postulant: formValues.postulant,
      client: formValues.client,
      application: formValues.application,
      status: 'assigned',
      date: formValues.date,
      notes: formValues.notes
    };

    if (interviewId) {
      return dispatch(updateInterview(interviewId, bodyToEdit)).then((response) => {
        if (response) {
          history.push('/admin/interviews/list');
        }
      });
    }
    return dispatch(createInterview(bodyToAdd)).then((response) => {
      if (response) {
        history.push('/admin/interviews/list');
      }
    });
  };

  const validate = (formValues) => {
    const errors = {};
    if (!formValues.postulant) {
      errors.postulant = 'Postulant is required';
    }
    if (!formValues.client) {
      errors.client = 'Client is required';
    }
    if (!formValues.application) {
      errors.application = 'Application is required';
    }
    if (!formValues.status) {
      errors.status = 'Status is required';
    }
    if (!formValues.date) {
      errors.date = 'Date is required';
    }
    if (formValues.notes) {
      if (formValues.notes?.indexOf(' ') === -1) {
        errors.notes = 'Notes must contain at least one space';
      }
      if (formValues.notes?.length < 3) {
        errors.notes = 'Notes must be at least 3 characters';
      }
    }
    return errors;
  };

  const required = (value) => {
    return value ? undefined : 'Required';
  };

  const validateDate = (value) => {
    if (query.get('_id')) {
      return undefined;
    }
    if (required(value)) {
      return 'Required';
    }
    let interviewDate = value.split('T');
    let dateValue = Math.round(new Date(interviewDate[0]).getTime() / 1000);

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
    const date = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();

    let nowValue = Math.round(new Date(`${year}-${month}-${date}`).getTime() / 1000);
    return dateValue >= nowValue ? undefined : 'Invalid date';
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
      <Form
        onSubmit={onSubmit}
        render={(formProps) => (
          <form onSubmit={formProps.handleSubmit} className={styles.container}>
            <h2 className={styles.title}>Interviews</h2>
            <Field
              name="postulant"
              title={'Select a Postulant'}
              component={Select}
              validate={required}
              disabled={formProps.submitting}
              arrayToMap={selectPostulant}
              initialValue={postulantIdValue}
              value={postulantIdValue}
            />
            <Field
              name="client"
              title={'Select a Client'}
              component={Select}
              validate={required}
              disabled={formProps.submitting}
              arrayToMap={selectClient}
              initialValue={clientIdValue}
              value={clientIdValue}
            />
            <Field
              name="application"
              title={'Select an Application'}
              component={Select}
              validate={required}
              disabled={formProps.submitting}
              arrayToMap={selectApplication}
              initialValue={applicationIdValue}
              value={applicationIdValue}
            />
            {query.get('_id') && (
              <Field
                name="status"
                title={'Select a Status'}
                component={Select}
                validate={required}
                disabled={formProps.submitting}
                arrayToMap={[
                  { value: 'successful', label: 'Successful' },
                  { value: 'failed', label: 'Failed' },
                  { value: 'cancelled', label: 'Cancelled' },
                  { value: 'assigned', label: 'Assigned' },
                  { value: 'confirmed', label: 'Confirmed' }
                ]}
                initialValue={statusValue}
                value={statusValue}
              />
            )}
            <Field
              name="date"
              title={'Select a Date'}
              component={Input}
              type="datetime-local"
              data-date-format="DD MMMM YYYY"
              validate={validateDate}
              disabled={formProps.submitting}
              initialValue={dateValue}
              value={dateValue}
            />
            <Field
              title="Notes"
              name="notes"
              label="Notes"
              type="text"
              placeholder="Insert Notes"
              disabled={formProps.submitting}
              component={Input}
              initialValue={notesValue}
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

export default InterviewForm;
