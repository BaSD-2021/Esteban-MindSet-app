import Switch from 'Components/Shared/Switch';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostulantById, updatePostulant } from 'redux/postulants/thunks';
import styles from './profile.module.css';

const Profile = () => {
  const isLoading = useSelector((store) => store.postulants.isLoading);
  const selectedPostulant = useSelector((store) => store.postulants.selectedPostulant);
  const dispatch = useDispatch();
  const postulantId = process.env.REACT_APP_POSTULANT_ID;

  useEffect(() => {
    dispatch(getPostulantById(postulantId));
  }, []);
  console.log(selectedPostulant);

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
              <p className={styles.info}>{selectedPostulant?.firstName}</p>
            </div>
            <div className={styles.dataContainer}>
              <p className={styles.label}>Last Name</p>
              <p className={styles.info}>{selectedPostulant?.lastName}</p>
            </div>
            <div className={styles.dataContainer}>
              <p className={styles.label}>Address</p>
              <p className={styles.info}>{selectedPostulant?.address}</p>
            </div>
            <div className={styles.dataContainer}>
              <p className={styles.label}>Birth Date</p>
              <p className={styles.info}>{selectedPostulant?.birthday.split('T')[0]}</p>
            </div>
            <div className={styles.dataContainer}>
              <p className={styles.label}>Email</p>
              <p className={styles.info}>{selectedPostulant?.email}</p>
            </div>
            <div className={styles.dataContainer}>
              <p className={styles.label}>Phone</p>
              <p className={styles.info}>{selectedPostulant?.phone}</p>
            </div>
            <div className={styles.dataContainer}>
              <p className={styles.label}>Availability</p>
              <p className={styles.info}>
                {selectedPostulant?.available ? 'Available' : 'Not Available'}
              </p>
            </div>
            <div className={styles.toggleContainer}>
              <p className={styles.toggleLabel}>Change Availability</p>
              <Switch
                isToggled={selectedPostulant?.available}
                onToggle={() =>
                  dispatch(
                    updatePostulant(selectedPostulant._id, {
                      ...selectedPostulant,
                      available: !selectedPostulant.available
                    })
                  )
                }
              />
            </div>
          </div>
          <div className={styles.infoContainer}>
            <h2 className={styles.title}>Studies</h2>
            {selectedPostulant?.studies.primaryStudies && (
              <div className={styles.dataContainer}>
                <p className={styles.label}>Primary Studies</p>
                <div className={styles.labelContainer}>
                  <p className={styles.infoLabel}>School:</p>
                  <p className={styles.infoText}>
                    {selectedPostulant?.studies.primaryStudies.school}
                  </p>
                </div>
                <div className={styles.labelContainer}>
                  <p className={styles.infoLabel}>Start Date:</p>
                  <p className={styles.infoText}>
                    {selectedPostulant?.studies.primaryStudies.startDate.split('T')[0]}
                  </p>
                </div>
                <div className={styles.labelContainer}>
                  <p className={styles.infoLabel}>End Date:</p>
                  <p className={styles.infoText}>
                    {selectedPostulant?.studies.primaryStudies.endDate.split('T')[0]}
                  </p>
                </div>
              </div>
            )}
            {selectedPostulant?.studies.secondaryStudies && (
              <div className={styles.dataContainer}>
                <p className={styles.label}>Secondary Studies</p>
                <div className={styles.labelContainer}>
                  <p className={styles.infoLabel}>School:</p>
                  <p className={styles.infoText}>
                    {selectedPostulant?.studies.secondaryStudies.school}
                  </p>
                </div>
                <div className={styles.labelContainer}>
                  <p className={styles.infoLabel}>Start Date:</p>
                  <p className={styles.infoText}>
                    {selectedPostulant?.studies.secondaryStudies.startDate.split('T')[0]}
                  </p>
                </div>
                <div className={styles.labelContainer}>
                  <p className={styles.infoLabel}>End Date:</p>
                  <p className={styles.infoText}>
                    {selectedPostulant?.studies.secondaryStudies.endDate.split('T')[0]}
                  </p>
                </div>
              </div>
            )}
            {selectedPostulant?.studies.tertiaryStudies && (
              <div className={styles.dataContainer}>
                <p className={styles.label}>Tertiary Studies</p>
                {selectedPostulant?.studies.tertiaryStudies.map((study, i) => (
                  <div key={i}>
                    <div className={styles.labelContainer}>
                      <p className={styles.infoLabel}>Description:</p>
                      <p className={styles.infoText}>{study.description}</p>
                    </div>
                    <div className={styles.labelContainer}>
                      <p className={styles.infoLabel}>Institute:</p>
                      <p className={styles.infoText}>{study.institute}</p>
                    </div>
                    <div className={styles.labelContainer}>
                      <p className={styles.infoLabel}>Start Date:</p>
                      <p className={styles.infoText}>{study.startDate}</p>
                    </div>
                    <div className={styles.labelContainer}>
                      <p className={styles.infoLabel}>End Date:</p>
                      <p className={styles.infoText}>{study.endDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {selectedPostulant?.studies.universityStudies && (
              <div className={styles.dataContainer}>
                <p className={styles.label}>University Studies</p>
                {selectedPostulant?.studies.universityStudies.map((study, i) => (
                  <div key={i}>
                    <div className={styles.labelContainer}>
                      <p className={styles.infoLabel}>Description:</p>
                      <p className={styles.infoText}>{study.description}</p>
                    </div>
                    <div className={styles.labelContainer}>
                      <p className={styles.infoLabel}>Institute:</p>
                      <p className={styles.infoText}>{study.institute}</p>
                    </div>
                    <div className={styles.labelContainer}>
                      <p className={styles.infoLabel}>Start Date:</p>
                      <p className={styles.infoText}>{study.startDate}</p>
                    </div>
                    <div className={styles.labelContainer}>
                      <p className={styles.infoLabel}>End Date:</p>
                      <p className={styles.infoText}>{study.endDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {selectedPostulant?.studies.informalStudies && (
              <div className={styles.dataContainer}>
                <p className={styles.label}>Informal Studies</p>
                {selectedPostulant?.studies.informalStudies.map((study, i) => (
                  <div key={i}>
                    <div className={styles.labelContainer}>
                      <p className={styles.infoLabel}>Description:</p>
                      <p className={styles.infoText}>{study.description}</p>
                    </div>
                    <div className={styles.labelContainer}>
                      <p className={styles.infoLabel}>Institute:</p>
                      <p className={styles.infoText}>{study.institute}</p>
                    </div>
                    <div className={styles.labelContainer}>
                      <p className={styles.infoLabel}>Start Date:</p>
                      <p className={styles.infoText}>{study.startDate}</p>
                    </div>
                    <div className={styles.labelContainer}>
                      <p className={styles.infoLabel}>End Date:</p>
                      <p className={styles.infoText}>{study.endDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={styles.infoContainer}>
            <h2 className={styles.title}>Work Experience</h2>
            {selectedPostulant?.workExperience && (
              <div className={styles.dataContainer}>
                {selectedPostulant?.workExperience.map((experience, i) => (
                  <div key={i}>
                    <div className={styles.labelContainer}>
                      <p className={styles.infoLabel}>Company:</p>
                      <p className={styles.infoText}>{experience.company}</p>
                    </div>
                    <div className={styles.labelContainer}>
                      <p className={styles.infoLabel}>Description:</p>
                      <p className={styles.infoText}>{experience.description}</p>
                    </div>
                    <div className={styles.labelContainer}>
                      <p className={styles.infoLabel}>Start Date:</p>
                      <p className={styles.infoText}>{experience.startDate}</p>
                    </div>
                    <div className={styles.labelContainer}>
                      <p className={styles.infoLabel}>End Date:</p>
                      <p className={styles.infoText}>{experience.endDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Profile;
