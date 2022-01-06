import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPsychologistById, updatePsychologist } from 'redux/psychologists/thunks';
import styles from './profile.module.css';

const Profile = () => {
  const isLoading = useSelector((store) => store.psychologists.isFetching);
  const selectedPsychologist = useSelector((store) => store.psychologists.selectedItem);
  const dispatch = useDispatch();
  const psychologistId = process.env.REACT_APP_PSYCHOLOGIST_ID;

  useEffect(() => {
    dispatch(getPsychologistById(psychologistId));
  }, []);

  return (
    <section className={styles.container}>
      {isLoading ? (
        <p className={styles.loading}>On Loading ...</p>
      ) : (
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
      )}
    </section>
  );
};

export default Profile;
