import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import Select from 'Components/Shared/Select';
import React, { useEffect, useState } from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { getPsychologistById, updatePsychologist } from 'redux/psychologists/thunks';
import styles from './profile.module.css';

const Profile = () => {
  const isLoading = useSelector((store) => store.psychologists.isFetching);
  const selectedPsychologist = useSelector((store) => store.psychologists.selectedItem);
  const dispatch = useDispatch();
  const psychologistId = useSelector((store) => store.auth.user._id);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getPsychologistById(psychologistId));
  }, []);

  const schedule = [
    { value: 800, label: '08:00' },
    { value: 900, label: '09:00' },
    { value: 1000, label: '10:00' },
    { value: 1100, label: '11:00' },
    { value: 1200, label: '12:00' },
    { value: 1300, label: '13:00' },
    { value: 1400, label: '14:00' },
    { value: 1500, label: '15:00' },
    { value: 1600, label: '16:00' },
    { value: 1700, label: '17:00' },
    { value: 1800, label: '18:00' },
    { value: 1900, label: '19:00' },
    { value: 2000, label: '20:00' }
  ];

  const updateAvailability = (formValues) => {
    dispatch(
      updatePsychologist(selectedPsychologist._id, {
        ...selectedPsychologist,
        availability: {
          monday: {
            from: parseInt(formValues.mondayFrom),
            to: parseInt(formValues.mondayTo)
          },
          tuesday: {
            from: parseInt(formValues.tuesdayFrom),
            to: parseInt(formValues.tuesdayTo)
          },
          wednesday: {
            from: parseInt(formValues.wednesdayFrom),
            to: parseInt(formValues.wednesdayTo)
          },
          thursday: {
            from: parseInt(formValues.thursdayFrom),
            to: parseInt(formValues.thursdayTo)
          },
          friday: {
            from: parseInt(formValues.fridayFrom),
            to: parseInt(formValues.fridayTo)
          },
          saturday: {
            from: parseInt(formValues.saturdayFrom),
            to: parseInt(formValues.saturdayTo)
          }
        }
      })
    );
  };

  const validateIsBigger = (value, all, previous) => {
    return parseInt(value) > parseInt(all[previous]) ? undefined : 'Invalid Range';
  };

  return (
    <section className={styles.container}>
      {isLoading ? (
        <p className={styles.loading}>On Loading ...</p>
      ) : (
        <Form
          onSubmit={updateAvailability}
          render={(formProps) => (
            <form onSubmit={formProps.handleSubmit} className={styles.container}>
              <div className={styles.flexContainer}>
                <div className={styles.infoContainer}>
                  <h2 className={styles.title}>Profile</h2>
                  <div className={styles.dataContainer}>
                    <p className={styles.label}>First Name</p>
                    <p className={styles.info}>{selectedPsychologist?.firstName}</p>
                  </div>
                  <div className={styles.dataContainer}>
                    <p className={styles.label}>Last Name</p>
                    <p className={styles.info}>{selectedPsychologist?.lastName}</p>
                  </div>
                  <div className={styles.dataContainer}>
                    <p className={styles.label}>Username</p>
                    <p className={styles.info}>{selectedPsychologist?.username}</p>
                  </div>
                  <div className={styles.dataContainer}>
                    <p className={styles.label}>Password</p>
                    <p className={styles.info}>{selectedPsychologist?.password}</p>
                  </div>
                  <div className={styles.dataContainer}>
                    <p className={styles.label}>Address</p>
                    <p className={styles.info}>{selectedPsychologist?.address}</p>
                  </div>
                  <div className={styles.dataContainer}>
                    <p className={styles.label}>Email</p>
                    <p className={styles.info}>{selectedPsychologist?.email}</p>
                  </div>
                  <div className={styles.dataContainer}>
                    <p className={styles.label}>Phone</p>
                    <p className={styles.info}>{selectedPsychologist?.phone}</p>
                  </div>
                </div>
                <div className={styles.infoContainer}>
                  <h2 className={styles.title}>Availability</h2>
                  <div className={styles.dataContainer}>
                    <p className={styles.label}>Monday</p>
                    <div className={styles.selectorContainer}>
                      <Field
                        component={Select}
                        disabled={formProps.submitting}
                        title="From"
                        name="mondayFrom"
                        arrayToMap={schedule}
                        style={styles.selector}
                        value={selectedPsychologist.availability?.monday.from}
                        initialValue={selectedPsychologist.availability?.monday.from}
                      />
                      <Field
                        component={Select}
                        disabled={formProps.submitting}
                        title="To"
                        name="mondayTo"
                        arrayToMap={schedule}
                        style={styles.selector}
                        value={selectedPsychologist.availability?.monday.to}
                        initialValue={selectedPsychologist.availability?.monday.to}
                        validate={(value, all) => {
                          return validateIsBigger(value, all, 'mondayFrom');
                        }}
                      />
                    </div>
                    <p className={styles.label}>Tuesday</p>
                    <div className={styles.selectorContainer}>
                      <Field
                        component={Select}
                        disabled={formProps.submitting}
                        title="From"
                        name="tuesdayFrom"
                        arrayToMap={schedule}
                        style={styles.selector}
                        value={selectedPsychologist.availability?.tuesday.from}
                        initialValue={selectedPsychologist.availability?.tuesday.from}
                      />
                      <Field
                        component={Select}
                        disabled={formProps.submitting}
                        title="To"
                        name="tuesdayTo"
                        arrayToMap={schedule}
                        style={styles.selector}
                        value={selectedPsychologist.availability?.tuesday.to}
                        initialValue={selectedPsychologist.availability?.tuesday.to}
                        validate={(value, all) => {
                          return validateIsBigger(value, all, 'tuesdayFrom');
                        }}
                      />
                    </div>
                    <p className={styles.label}>Wednesday</p>
                    <div className={styles.selectorContainer}>
                      <Field
                        component={Select}
                        disabled={formProps.submitting}
                        title="From"
                        name="wednesdayFrom"
                        arrayToMap={schedule}
                        style={styles.selector}
                        value={selectedPsychologist.availability?.wednesday.from}
                        initialValue={selectedPsychologist.availability?.wednesday.from}
                      />
                      <Field
                        component={Select}
                        disabled={formProps.submitting}
                        title="To"
                        name="wednesdayTo"
                        arrayToMap={schedule}
                        style={styles.selector}
                        value={selectedPsychologist.availability?.wednesday.to}
                        initialValue={selectedPsychologist.availability?.wednesday.to}
                        validate={(value, all) => {
                          return validateIsBigger(value, all, 'wednesdayFrom');
                        }}
                      />
                    </div>
                    <p className={styles.label}>Thursday</p>
                    <div className={styles.selectorContainer}>
                      <Field
                        component={Select}
                        disabled={formProps.submitting}
                        title="From"
                        name="thursdayFrom"
                        arrayToMap={schedule}
                        style={styles.selector}
                        value={selectedPsychologist.availability?.thursday.from}
                        initialValue={selectedPsychologist.availability?.thursday.from}
                      />
                      <Field
                        component={Select}
                        disabled={formProps.submitting}
                        title="To"
                        name="thursdayTo"
                        arrayToMap={schedule}
                        style={styles.selector}
                        value={selectedPsychologist.availability?.thursday.to}
                        initialValue={selectedPsychologist.availability?.thursday.to}
                        validate={(value, all) => {
                          return validateIsBigger(value, all, 'thursdayFrom');
                        }}
                      />
                    </div>
                    <p className={styles.label}>Friday</p>
                    <div className={styles.selectorContainer}>
                      <Field
                        component={Select}
                        disabled={formProps.submitting}
                        title="From"
                        name="fridayFrom"
                        arrayToMap={schedule}
                        style={styles.selector}
                        value={selectedPsychologist.availability?.friday.from}
                        initialValue={selectedPsychologist.availability?.friday.from}
                      />
                      <Field
                        component={Select}
                        disabled={formProps.submitting}
                        title="to"
                        name="fridayTo"
                        arrayToMap={schedule}
                        style={styles.selector}
                        value={selectedPsychologist.availability?.friday.to}
                        initialValue={selectedPsychologist.availability?.friday.to}
                        validate={(value, all) => {
                          return validateIsBigger(value, all, 'fridayFrom');
                        }}
                      />
                    </div>
                    <p className={styles.label}>Saturday</p>
                    <div className={styles.selectorContainer}>
                      <Field
                        component={Select}
                        disabled={formProps.submitting}
                        title="From"
                        name="saturdayFrom"
                        arrayToMap={schedule}
                        style={styles.selector}
                        value={selectedPsychologist.availability?.saturday.from}
                        initialValue={selectedPsychologist.availability?.saturday.from}
                      />
                      <Field
                        component={Select}
                        disabled={formProps.submitting}
                        title="To"
                        name="saturdayTo"
                        arrayToMap={schedule}
                        style={styles.selector}
                        value={selectedPsychologist.availability?.saturday.to}
                        initialValue={selectedPsychologist.availability?.saturday.to}
                        validate={(value, all) => {
                          return validateIsBigger(value, all, 'saturdayFrom');
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles.buttonContainer}>
                    <Button
                      label="Save Changes"
                      type="submit"
                      disabled={formProps.submitting || formProps.pristine}
                    />
                  </div>
                </div>
                <Modal
                  show={showModal}
                  title="Change Schedule"
                  message="Changes made in schedule will be applied from the following week "
                  cancel={{ text: 'Cancel', callback: () => setShowModal(false) }}
                  confirm={{
                    text: 'Confirm',
                    callback: () => {
                      updateAvailability();
                      setShowModal(false);
                    }
                  }}
                />
              </div>
            </form>
          )}
        />
      )}
    </section>
  );
};

export default Profile;
