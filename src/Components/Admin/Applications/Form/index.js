import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Field } from 'react-final-form';
import useQuery from 'Hooks/useQuery';
import styles from './form.module.css';
import Input2 from 'Components/Shared/Input';
import Button from 'Components/Shared/Button';
import Select2 from 'Components/Shared/Select';
import Modal from 'Components/Shared/Modal';
import {
  getApplicationById,
  createApplication,
  updateApplication
} from 'redux/applications/thunks';
import { getPositions } from 'redux/positions/thunks';
import { getInterviews } from 'redux/interviews/thunks';
import { getPostulants } from 'redux/postulants/thunks';
import { cleanError, cleanSelectedItem } from 'redux/applications/actions';

function ApplicationForm() {
  const [positionId, setPositionId] = useState(undefined);
  const [postulantId, setPostulantId] = useState('');
  const [date, setDate] = useState('');
  const [result, setResult] = useState('');
  const [processedPositions, setProcessedPositions] = useState([]);
  const [processedPostulants, setProcessedPostulants] = useState([]);
  const [processedInterviews, setProcessedInterviews] = useState([]);
  const query = useQuery();
  const history = useHistory();
  const dispatch = useDispatch();
  const selectedItem = useSelector((store) => store.applications.selectedItem);
  const error = useSelector((store) => store.applications.error);

  useEffect(() => {
    if (Object.keys(selectedItem).length) {
      setPositionId(selectedItem.positions?._id);
      setPostulantId(selectedItem.postulants?._id);
      setDate(selectedItem.interview?._id);
      setResult(selectedItem.result);
    }
  }, [selectedItem]);

  useEffect(() => {
    return () => {
      dispatch(cleanSelectedItem());
    };
  }, []);

  useEffect(() => {
    const applicationId = query.get('_id');
    if (applicationId) {
      dispatch(getApplicationById(applicationId));
    }

    dispatch(getPositions()).then((response) => {
      return setProcessedPositions(
        response.map((position) => {
          return {
            value: position._id,
            label: position.jobDescription
          };
        })
      );
    });

    dispatch(getPostulants()).then((response) => {
      return setProcessedPostulants(
        response.map((postulant) => {
          return {
            value: postulant._id,
            label: `${postulant.firstName} ${postulant.lastName}`
          };
        })
      );
    });

    dispatch(getInterviews()).then((response) => {
      return setProcessedInterviews(
        response.map((interview) => {
          return {
            value: interview._id,
            label: interview.date
          };
        })
      );
    });
  }, []);

  const onSubmit = (formValues) => {
    const applicationId = query.get('_id');

    const body = {
      positions: formValues.position,
      postulants: formValues.postulant,
      interview: formValues.interview,
      result: formValues.result
    };

    if (applicationId) {
      dispatch(updateApplication(applicationId, body)).then((response) => {
        if (response) {
          history.push('/admin/applications/list');
        }
      });
    } else {
      dispatch(createApplication(body)).then((response) => {
        if (response) {
          history.push('/admin/applications/list');
        }
      });
    }
  };

  const validate = (formValues) => {
    const errors = {};
    if (!formValues.position) {
      errors.position = 'Position is required';
    }
    if (!formValues.postulant) {
      errors.postulant = 'Postulant is required';
    }
    if (!formValues.interview) {
      errors.interview = 'Interview is required';
    }
    if (formValues.result) {
      if (formValues.result?.indexOf(' ') === -1) {
        errors.workExperienceDescription = 'Result must contain at least one space';
      }
      if (formValues.result?.length < 3) {
        errors.result = 'Result must be at least 3 characters';
      }
    }
    return errors;
  };

  const required = (value) => {
    return value ? undefined : 'Required';
  };

  return (
    <div className={styles.container}>
      <Modal
        show={!!error || !!error.message}
        title="Error"
        message={error || error.message}
        cancel={{
          text: 'Close',
          callback: () => {
            dispatch(cleanError());
          }
        }}
      />
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={(formProps) => (
          <form onSubmit={formProps.handleSubmit} className={styles.container}>
            <h2 className={styles.title}>Applications</h2>
            <Field
              name="position"
              title={'Select a Position'}
              component={Select2}
              disabled={formProps.submitting}
              validate={required}
              arrayToMap={processedPositions}
              initialValue={positionId}
              value={positionId}
            />
            <Field
              name="postulant"
              title={'Select a Postulant'}
              component={Select2}
              disabled={formProps.submitting}
              validate={required}
              arrayToMap={processedPostulants}
              initialValue={postulantId}
              value={postulantId}
            />
            <Field
              name="interview"
              title={'Select an Interview'}
              component={Select2}
              disabled={formProps.submitting}
              validate={required}
              arrayToMap={processedInterviews}
              initialValue={date}
              value={date}
            />
            <Field
              title="Result"
              name="result"
              label="Result"
              type="text"
              placeholder="Insert Result"
              disabled={formProps.submitting}
              component={Input2}
              validate={(value) => (value ? undefined : 'Required')}
              initialValue={result}
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
export default ApplicationForm;
