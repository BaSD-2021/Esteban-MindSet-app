import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import useQuery from '../../../Hooks/useQuery';
import styles from './form.module.css';
import Input from '../../Shared/Input';
import Modal from '../../Shared/Modal';
import Button from '../../Shared/Button';
import { useDispatch, useSelector } from 'react-redux';
import { createAdmin, getAdminById, updateAdmin } from '../../../redux/admins/thunks';
import { cleanError, cleanSelectedItem } from '../../../redux/admins/actions';

function AdminsForm() {
  // get the Redux store values we need in the component
  const error = useSelector((store) => store.admins.error);
  const selectedItem = useSelector((store) => store.admins.selectedItem);

  // get the dispatcher to be able to dispatch Redux actions
  const dispatch = useDispatch();

  const query = useQuery();
  const history = useHistory();

  useEffect(() => {
    const adminId = query.get('_id');
    if (adminId) {
      // Dispatch (execute) the Redux action to get the admin by id
      dispatch(getAdminById(adminId));
    }
  }, []);

  useEffect(() => {
    // return a function to dispatch "cleanSelectedItem" action when the component
    // is unmounted, cleaning the "selectedItem" in Redux
    return () => {
      dispatch(cleanSelectedItem());
    };
  }, []);

  const onSubmit = (formValues) => {
    const adminId = query.get('_id');
    if (adminId) {
      // Dispatch (execute) the Redux action to update an admin
      return dispatch(updateAdmin(adminId, formValues)).then((response) => {
        // Redirect to the admin list when the async action is ended
        // If exists a response means the request was ok
        if (response) {
          history.push('/admins');
        }
      });
    }
    // Dispatch (execute) the Redux action to create an admin
    return dispatch(createAdmin(formValues)).then((response) => {
      // Redirect to the admin list when the async action is ended
      // If exists a response means the request was ok
      if (response) {
        history.push('/admins');
      }
    });
  };

  // Form-level validations
  // Here we can set all the validations for the form in one place.
  // Form-level and Field-level validations can work together
  const validate = (formValues) => {
    const errors = {};
    if (!formValues.username) {
      errors.username = 'Username is required';
    }
    if (formValues.name?.length < 3) {
      errors.name = 'Name must be at least 3 characters';
    }
    return errors;
  };

  // we can create validator functions to be reused through fields
  const required = (value) => (value ? undefined : 'Required');

  return (
    <>
      <Modal
        // The Error Modal is shown when an error exist in Redux
        show={!!error}
        title="Error"
        message={error.message || error}
        cancel={{
          text: 'Close',
          // Dispatch (execute) the cleanError action to remove the error in Redux
          // and hide the modal
          callback: () => dispatch(cleanError())
        }}
      />
      <Form
        onSubmit={onSubmit}
        validate={validate} // Form-level validations
        // As the "SelectedItem" has the same keys we are using as Field Names
        // we just pass it as initial values.
        initialValues={selectedItem}
        // Example of initialValues. It should be an object where each key is a Field Name.
        // initialValues={{
        //   name: 'Damian Alvarez',
        //   username: 'dami.a',
        //   password: 'test123'
        // }}
        render={(formProps) => (
          // In order for the "submitting" prop to work, we must return a promise on the onSubmit callback.
          // "pristine" props indicate the form values were not changed
          <form onSubmit={formProps.handleSubmit} className={styles.container}>
            <h2 className={styles.title}>Admin</h2>
            <Field
              name="name"
              label="Name"
              placeholder="Insert Name"
              disabled={formProps.submitting}
              component={Input} // Pass the rendered component
              validate={(value) => (value ? undefined : 'Required')} // Field-level validation
            />
            <Field
              name="username"
              label="Username"
              placeholder="Insert Username"
              disabled={formProps.submitting}
              component={Input}
            />
            <Field
              name="password"
              label="Password"
              placeholder="Insert Password"
              type="password"
              disabled={formProps.submitting}
              component={Input}
              validate={required} // Field-level validation
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
