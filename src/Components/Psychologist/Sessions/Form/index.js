import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'Components/Shared/Button';
import styles from './form.module.css';
import Input from 'Components/Shared/Input';
import Select from 'Components/Shared/Select';
import Modal from 'Components/Shared/Modal';
import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { createSession } from 'redux/sessions/thunks';
import { cleanError, cleanSelectedItem } from 'redux/sessions/actions';
import { getPostulants } from 'redux/postulants/thunks';

function sessionsForm() {
  const [selectPostulant, setSelectPostulant] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const error = useSelector((store) => store.sessions.error);
  const psychologistId = useSelector((store) => store.auth.user?._id);

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
  }, []);

  const onSubmit = (formValues) => {
    const body = {
      psychologist: { _id: psychologistId },
      date: formValues.date,
      postulant: { _id: formValues.postulant },
      status: 'assigned',
      notes: formValues.notes
    };

    dispatch(createSession(body)).then((response) => {
      if (response) {
        history.push('/psychologist/sessions');
      }
    });
  };

  const required = (value) => {
    return value ? undefined : 'Required';
  };

  const validateDate = (value) => {
    if (required(value)) {
      return 'Required';
    }
    let sessionDate = value.split('T');
    let dateValue = Math.round(new Date(sessionDate[0]).getTime() / 1000);

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
          <form className={styles.container} onSubmit={formProps.handleSubmit}>
            <h2 className={styles.title}>Session</h2>
            <Field
              name="postulant"
              title="Postulant"
              disabled={formProps.submitting}
              component={Select}
              validate={required}
              arrayToMap={selectPostulant}
              value=""
            />
            <Field
              name="date"
              title="Date"
              type="datetime-local"
              disabled={formProps.submitting}
              placeholder="Select a date"
              component={Input}
              validate={validateDate}
              value=""
            />
            <Field
              name="notes"
              title="Notes"
              placeholder="Write here your notes"
              component={Input}
              value=""
            />
            <div className={styles.buttonContainer}>
              <Button
                label="SAVE"
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
export default sessionsForm;
