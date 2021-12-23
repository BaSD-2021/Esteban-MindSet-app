import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import useQuery from 'Hooks/useQuery';
import styles from './form.module.css';
import Input2 from 'Components/Shared/Input2';
import Modal from 'Components/Shared/Modal';
import Button from 'Components/Shared/Button';

import { useDispatch, useSelector } from 'react-redux';
import { createAdmin, getAdminById, updateAdmin } from 'redux/admins/thunks';
import { cleanError, cleanSelectedAdmin } from 'redux/admins/actions';

function AdminsForm() {
  const error = useSelector((store) => store.admins.error);
  const selectedItem = useSelector((store) => store.admins.selectedAdmin);

  const dispatch = useDispatch();

  const query = useQuery();
  const history = useHistory();

  useEffect(() => {
    const adminId = query.get('_id');
    if (adminId) {
      dispatch(getAdminById(adminId));
    }
  }, []);

  useEffect(() => {
    return () => {
      dispatch(cleanSelectedAdmin());
    };
  }, []);

  const onSubmit = (formValues) => {
    const adminId = query.get('_id');

    if (adminId) {
      dispatch(updateAdmin(adminId, formValues)).then((response) => {
        if (response) {
          history.push('/admin/admins/list');
        }
      });
    } else {
      dispatch(createAdmin(formValues)).then((response) => {
        if (response) {
          history.push('/admin/admins/list');
        }
      });
    }
  };

  const validate = (formValues) => {
    const errors = {};
    if (!formValues.name) {
      errors.name = 'Name is required';
    }
    if (formValues.name?.length < 3) {
      errors.name = 'Name must be at least 3 characters';
    }
    if (!formValues.username) {
      errors.username = 'Username is required';
    }
    if (formValues.username?.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    }
    if (!formValues.password) {
      errors.password = 'Password is required';
    }
    if (formValues.password?.search(/[0-9]/) < 0 || formValues.password?.search(/[a-zA-Z]/) < 0) {
      errors.password = 'Password must contain numbers and letters';
    } else if (formValues.password?.length < 6) {
      errors.password = 'Password must contain at least 6 characters';
    }
    return errors;
  };

  return (
    <>
      <Modal
        show={!!error || !!error.message}
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
        initialValues={selectedItem}
        render={(formProps) => (
          <form onSubmit={formProps.handleSubmit} className={styles.container}>
            <h2 className={styles.title}>Admin</h2>
            <Field
              name="name"
              label="Name"
              placeholder="Insert Name"
              disabled={formProps.submitting}
              component={Input2}
            />
            <Field
              name="username"
              label="Username"
              placeholder="Insert Username"
              disabled={formProps.submitting}
              component={Input2}
            />
            <Field
              name="password"
              label="Password"
              placeholder="Insert Password"
              type="password"
              disabled={formProps.submitting}
              component={Input2}
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
    </>
  );
}

export default AdminsForm;
