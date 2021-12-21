import { Form, Field } from 'react-final-form';
import styles from './login.module.css';
import Input from 'Components/Shared/Input';
import Modal from 'Components/Shared/Modal';
import Button from 'Components/Shared/Button';
import { /* useDispatch */ useSelector } from 'react-redux';

function AdminsForm() {
  const error = useSelector((store) => store.admins.error);
  const selectedItem = useSelector((store) => store.admins.selectedItem);

  // const dispatch = useDispatch();

  const onSubmit = (formValues) => {
    console.log('formValues', formValues);
  };

  const required = (value) => (value ? undefined : 'Required');

  return (
    <>
      <Modal
        show={!!error}
        title="Error"
        message={error.message || error}
        cancel={{
          text: 'Close'
          // callback: () => dispatch(cleanError())
        }}
      />
      <Form
        onSubmit={onSubmit}
        initialValues={selectedItem}
        render={(formProps) => (
          <form onSubmit={formProps.handleSubmit} className={styles.container}>
            <h2 className={styles.title}>Login</h2>
            <Field
              name="email"
              label="Email"
              placeholder="Insert Email"
              disabled={formProps.submitting}
              component={Input}
              validate={required}
            />
            <Field
              name="password"
              label="Password"
              placeholder="Insert Password"
              type="password"
              disabled={formProps.submitting}
              component={Input}
              validate={required}
            />
            <div className={styles.buttonContainer}>
              <Button
                label="Login"
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
