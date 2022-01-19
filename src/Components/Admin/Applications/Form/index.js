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
import { getPositionById, updatePosition } from 'redux/positions/thunks';
import { getInterviews } from 'redux/interviews/thunks';
import { cleanError, cleanSelectedItem } from 'redux/applications/actions';

function ApplicationForm() {
  const [positionId, setPositionId] = useState(undefined);
  const [postulantId, setPostulantId] = useState('');
  const [date, setDate] = useState('');
  const [result, setResult] = useState('');
  const [deployedInterviews, setDeployedInterviews] = useState([]);
  const query = useQuery();
  const history = useHistory();
  const dispatch = useDispatch();
  const selectedItem = useSelector((store) => store.applications.selectedItem);
  const selectedPosition = useSelector((store) => store.positions.selectedItem);
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
    dispatch(getInterviews()).then((response) => {
      return setDeployedInterviews(
        response.filter((interview) => interview.application?._id === applicationId)
      );
    });
  }, []);

  useEffect(() => {
    const applicationId = query.get('_id');
    if (applicationId && positionId) {
      dispatch(getPositionById(positionId));
    }
  }, [positionId]);

  const addInterviewAction = (e) => {
    e.preventDefault();
    history.push('/admin/interviews/form');
  };

  const onSubmit = (formValues) => {
    const applicationId = query.get('_id');

    const applicationBody = {
      positions: positionId,
      postulants: postulantId,
      interview: date,
      result: formValues.result
    };

    const positionBody = {
      client: selectedPosition.client._id,
      jobDescription: selectedPosition.jobDescription,
      vacancy: selectedPosition.vacancy - 1,
      professionalProfile: selectedPosition.professionalProfile._id,
      isOpen: selectedPosition.isOpen
    };

    if (applicationId) {
      if (formValues.result === 'Hired') {
        dispatch(updatePosition(positionId, positionBody)).then((response) => {
          if (response) {
            dispatch(updateApplication(applicationId, applicationBody)).then((response) => {
              if (response) {
                history.push('/admin/applications/list');
              }
            });
          }
        });
      }
      dispatch(updateApplication(applicationId, applicationBody)).then((response) => {
        if (response) {
          history.push('/admin/applications/list');
        }
      });
    } else {
      dispatch(createApplication(applicationBody)).then((response) => {
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
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {deployedInterviews.length === 0 ? (
                    <tr>
                      <td>
                        <p>There is no data to show. Please create a new interview.</p>
                      </td>
                    </tr>
                  ) : (
                    deployedInterviews.map((interview) => {
                      return (
                        <tr
                          key={interview._id}
                          onClick={() =>
                            history.push(`/admin/interviews/form?_id=${interview._id}`)
                          }
                        >
                          <td>{interview.client?.name}</td>
                          <td>{interview.date?.slice(0, 10)}</td>
                          <td>{interview.status}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
              <Button
                label="Add Interview"
                disabled={selectedItem.result === 'Hired'}
                type="submit"
                onClick={(e) => {
                  addInterviewAction(e);
                }}
              />
            </div>
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
