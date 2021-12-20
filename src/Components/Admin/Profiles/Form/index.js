import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useQuery from 'Hooks/useQuery';
import styles from './form.module.css';
import Input from 'Components/Shared/Input2';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { getProfileById, createProfile, updateProfile } from 'redux/profiles/thunks';
import { cleanError, cleanSelectedItem } from 'redux/profiles/actions';

function profilesForm() {
  const query = useQuery();
  const history = useHistory();
  const dispatch = useDispatch();
  const selectedProfile = useSelector((store) => store.profiles.selectedItem);
  const error = useSelector((store) => store.profiles.error);

  useEffect(() => {
    const profileId = query.get('_id');
    if (profileId) {
      dispatch(getProfileById(profileId));
    }
  }, []);

  useEffect(() => {
    return () => {
      dispatch(cleanSelectedItem());
    };
  }, []);

  const onSubmit = (formValues) => {
    const profileId = query.get('_id');

    if (profileId) {
      dispatch(updateProfile(profileId, formValues)).then((response) => {
        if (response) {
          history.push('/admin/profiles/list');
        }
      });
    } else {
      dispatch(createProfile(formValues)).then((response) => {
        if (response) {
          history.push('/admin/profiles/list');
        }
      });
    }
  };

  const validate = (formValues) => {
    const errors = {};
    if (!formValues.name) {
      errors.name = 'Profile Name is required';
    }
    if (formValues.name?.length < 3) {
      errors.name = 'Profile Name must be at least 3 characters';
    }
    return errors;
  };

  return (
    <div className={styles.container}>
      <Modal
        show={!!error}
        title="Error"
        message={error.message || error}
        cancel={{
          text: 'Close',
          callback: () => dispatch(cleanError())
        }}
      />
      <Form
        onSubmit={onSubmit}
        validate={validate}
        initialValues={selectedProfile}
        render={(formProps) => (
          <form onSubmit={formProps.handleSubmit} className={styles.container}>
            <h2 className={styles.title}>Profile</h2>
            <Field
              name="name"
              label="Name"
              placeholder="Insert Name"
              disabled={formProps.submitting}
              component={Input}
              validate={(value) => (value ? undefined : 'Required')}
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

export default profilesForm;
