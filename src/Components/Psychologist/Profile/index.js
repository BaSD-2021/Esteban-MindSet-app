import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import Select from 'Components/Shared/Select';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPsychologistById, updatePsychologist } from 'redux/psychologists/thunks';
import styles from './profile.module.css';

const Profile = () => {
  const isLoading = useSelector((store) => store.psychologists.isFetching);
  const selectedPsychologist = useSelector((store) => store.psychologists.selectedItem);
  const dispatch = useDispatch();
  const psychologistId = useSelector((store) => store.auth.user._id);
  const [mondayFrom, setMondayFrom] = useState(0);
  const [mondayTo, setMondayTo] = useState(0);
  const [tuesdayFrom, setTuesdayFrom] = useState(0);
  const [tuesdayTo, setTuesdayTo] = useState(0);
  const [wednesdayFrom, setWednesdayFrom] = useState(0);
  const [wednesdayTo, setWednesdayTo] = useState(0);
  const [thursdayFrom, setThursdayFrom] = useState(0);
  const [thursdayTo, setThursdayTo] = useState(0);
  const [fridayFrom, setFridayFrom] = useState(0);
  const [fridayTo, setFridayTo] = useState(0);
  const [saturdayFrom, setSaturdayFrom] = useState(0);
  const [saturdayTo, setSaturdayTo] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    dispatch(getPsychologistById(psychologistId));
  }, []);
  useEffect(() => fillAvailability(), [selectedPsychologist.availability]);

  const fillAvailability = () => {
    setMondayFrom(selectedPsychologist.availability?.monday.from);
    setMondayTo(selectedPsychologist.availability?.monday.to);
    setTuesdayFrom(selectedPsychologist.availability?.tuesday.from);
    setThursdayTo(selectedPsychologist.availability?.tuesday.to);
    setWednesdayFrom(selectedPsychologist.availability?.wednesday.from);
    setWednesdayTo(selectedPsychologist.availability?.wednesday.to);
    setThursdayFrom(selectedPsychologist.availability?.thursday.from);
    setThursdayTo(selectedPsychologist.availability?.thursday.to);
    setFridayFrom(selectedPsychologist.availability?.friday.from);
    setFridayTo(selectedPsychologist.availability?.friday.to);
    setSaturdayFrom(selectedPsychologist.availability?.saturday.from);
    setSaturdayTo(selectedPsychologist.availability?.saturday.to);
  };

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

  const updateAvailability = () => {
    dispatch(
      updatePsychologist(selectedPsychologist._id, {
        ...selectedPsychologist,
        availability: {
          monday: {
            from: parseInt(mondayFrom),
            to: parseInt(mondayTo)
          },
          tuesday: {
            from: parseInt(tuesdayFrom),
            to: parseInt(tuesdayTo)
          },
          wednesday: {
            from: parseInt(wednesdayFrom),
            to: parseInt(wednesdayTo)
          },
          thursday: {
            from: parseInt(thursdayFrom),
            to: parseInt(thursdayTo)
          },
          friday: {
            from: parseInt(fridayFrom),
            to: parseInt(fridayTo)
          },
          saturday: {
            from: parseInt(saturdayFrom),
            to: parseInt(saturdayTo)
          }
        }
      })
    );
  };

  return (
    <section className={styles.container}>
      {isLoading ? (
        <p className={styles.loading}>On Loading ...</p>
      ) : (
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
                <Select
                  style={styles.selector}
                  id="mondayFrom"
                  name="mondayFrom"
                  value={mondayFrom}
                  onChange={(e) => {
                    setMondayFrom(e.target.value);
                    setShowButton(true);
                  }}
                  arrayToMap={schedule}
                />
                <Select
                  style={styles.selector}
                  id="mondayTo"
                  name="mondayTo"
                  value={mondayTo}
                  onChange={(e) => {
                    setMondayTo(e.target.value);
                    setShowButton(true);
                  }}
                  arrayToMap={schedule}
                />
              </div>
              <p className={styles.label}>Tuesday</p>
              <div className={styles.selectorContainer}>
                <Select
                  style={styles.selector}
                  id="tuesdayFrom"
                  name="tuesdayFrom"
                  value={tuesdayFrom}
                  onChange={(e) => {
                    setTuesdayFrom(e.target.value);
                    setShowButton(true);
                  }}
                  arrayToMap={schedule}
                />
                <Select
                  style={styles.selector}
                  id="tuesdayTo"
                  name="tuesdayTo"
                  value={tuesdayTo}
                  onChange={(e) => {
                    setTuesdayTo(e.target.value);
                    setShowButton(true);
                  }}
                  arrayToMap={schedule}
                />
              </div>
              <p className={styles.label}>Wednesday</p>
              <div className={styles.selectorContainer}>
                <Select
                  style={styles.selector}
                  id="wednesdayFrom"
                  name="wednesdayFrom"
                  value={wednesdayFrom}
                  onChange={(e) => {
                    setWednesdayFrom(e.target.value);
                    setShowButton(true);
                  }}
                  arrayToMap={schedule}
                />
                <Select
                  style={styles.selector}
                  id="wednesdayTo"
                  name="wednesdayTo"
                  value={wednesdayTo}
                  onChange={(e) => {
                    setWednesdayTo(e.target.value);
                    setShowButton(true);
                  }}
                  arrayToMap={schedule}
                />
              </div>
              <p className={styles.label}>Thursday</p>
              <div className={styles.selectorContainer}>
                <Select
                  style={styles.selector}
                  id="thursdayFrom"
                  name="thursdayFrom"
                  value={thursdayFrom}
                  onChange={(e) => {
                    setThursdayFrom(e.target.value);
                    setShowButton(true);
                  }}
                  arrayToMap={schedule}
                />
                <Select
                  style={styles.selector}
                  id="thursdayTo"
                  name="thursdayTo"
                  value={thursdayTo}
                  onChange={(e) => {
                    setThursdayTo(e.target.value);
                    setShowButton(true);
                  }}
                  arrayToMap={schedule}
                />
              </div>
              <p className={styles.label}>Friday</p>
              <div className={styles.selectorContainer}>
                <Select
                  style={styles.selector}
                  id="fridayFrom"
                  name="fridayFrom"
                  value={fridayFrom}
                  onChange={(e) => {
                    setFridayFrom(e.target.value);
                    setShowButton(true);
                  }}
                  arrayToMap={schedule}
                />
                <Select
                  style={styles.selector}
                  id="fridayTo"
                  name="fridayTo"
                  value={fridayTo}
                  onChange={(e) => {
                    setFridayTo(e.target.value);
                    setShowButton(true);
                  }}
                  arrayToMap={schedule}
                />
              </div>
              <p className={styles.label}>Saturday</p>
              <div className={styles.selectorContainer}>
                <Select
                  style={styles.selector}
                  id="saturdayFrom"
                  name="saturdayFrom"
                  value={saturdayFrom}
                  onChange={(e) => {
                    setSaturdayFrom(e.target.value);
                    setShowButton(true);
                  }}
                  arrayToMap={schedule}
                />
                <Select
                  style={styles.selector}
                  id="saturdayTo"
                  name="saturdayTo"
                  value={saturdayTo}
                  onChange={(e) => {
                    setSaturdayTo(e.target.value);
                    setShowButton(true);
                  }}
                  arrayToMap={schedule}
                />
              </div>
            </div>
            {showButton && <Button label="Save Changes" onClick={() => setShowModal(true)} />}
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
      )}
    </section>
  );
};

export default Profile;
