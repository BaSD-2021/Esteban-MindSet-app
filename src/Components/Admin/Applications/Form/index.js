import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Field } from 'react-final-form';
import useQuery from 'Hooks/useQuery';
import styles from './form.module.css';
import Button from 'Components/Shared/Button';
import Select from 'Components/Shared/Select';
import Modal from 'Components/Shared/Modal';
import {
  getApplicationById,
  createApplication,
  updateApplication
} from 'redux/applications/thunks';
import { cleanError, cleanSelectedItem } from 'redux/applications/actions';

function ApplicationForm() {
  const [positionId, setPositionId] = useState(undefined);
  const [postulantId, setPostulantId] = useState('');
  const [date, setDate] = useState('');
  const [result, setResult] = useState('');
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
  }, []);

  const onSubmit = (formValues) => {
    const applicationId = query.get('_id');

    const body = {
      positions: positionId,
      postulants: postulantId,
      interview: date,
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
        render={(formProps) => (
          <form onSubmit={formProps.handleSubmit} className={styles.container}>
            <h2 className={styles.title}>Application</h2>
            <Field
              title={'Select a Result'}
              name="result"
              disabled={formProps.submitting}
              component={Select}
              initialValue={result}
              value={result}
              arrayToMap={[
                { value: 'Hired', label: 'Hired' },
                { value: 'Pending', label: 'Pending' },
                { value: 'Not selected', label: 'Not Selected' }
              ]}
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
