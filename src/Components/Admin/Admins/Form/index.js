import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import useQuery from 'Hooks/useQuery';
import styles from './form.module.css';
import Input2 from 'Components/Shared/Input';
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
      return dispatch(updateAdmin(adminId, formValues)).then((response) => {
        if (response) {
          history.push('/admin/admins/list');
        }
      });
    }

    return dispatch(createAdmin(formValues)).then((response) => {
      if (response) {
        history.push('/admin/admins/list');
      }
    });
  };

  const validate = (formValues) => {
    const errors = {};
    if (!formValues.name?.match(/^[a-zA-Z\u00C0-\u017F\s]+$/)) {
      errors.name = 'Name allows only letters and spaces';
    }
    if (formValues.name?.length < 3) {
      errors.name = 'Name must be at least 3 characters';
    }
    if (!formValues.name) {
      errors.name = 'Name is required';
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
    if (formValues.password?.search(/[0-9]/) < 0 || formValues.password?.search(/[a-zA-Z]/) < 0) {
      errors.password = 'Password must contain numbers and letters';
    } else if (formValues.password?.length < 6) {
      errors.password = 'Password must contain at least 6 characters';
    }
    if (!formValues.password) {
      errors.password = 'Password is required';
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
              name="email"
              label="Email"
              placeholder="Insert Email"
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
