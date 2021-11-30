import { useEffect, useState } from 'react';
import styles from './form.module.css';

function Form() {
  const [professionalProfileIdValue, setProfessionalProfileIdValue] = useState('');
  const [clientIdValue, setClientIdValue] = useState('');
  const [vacancyValue, setVacancyValue] = useState('');
  const [jobDescriptionValue, setJobDescriptionValue] = useState('');
  const [isOpenValue, setIsOpenValue] = useState('');
  const [clientsValue, setClientsValue] = useState([]);
  const [professionalProfilesValue, setProfessionalProfilesValue] = useState([]);
  let fetchMethod = 'POST';

  const onLoading = (dat) => {
    setProfessionalProfileIdValue(
      dat.data[0].professionalProfile ? dat.data[0].professionalProfile : ''
    );
    setClientIdValue(dat.data[0].client ? dat.data[0].client._id : '');
    setVacancyValue(dat.data[0].vacancy || '');
    setJobDescriptionValue(dat.data[0].jobDescription || '');
    setIsOpenValue(dat.data[0].isOpen || '');
  };

  const onChangeProfessionalProfileId = (event) => {
    setProfessionalProfileIdValue(event.target.value);
  };

  const onChangeClientId = (event) => {
    setClientIdValue(event.target.value);
  };

  const onChangeVacancy = (event) => {
    setVacancyValue(event.target.value);
  };

  const onChangeJobDescription = (event) => {
    setJobDescriptionValue(event.target.value);
  };

  const onChangeIsOpen = (event) => {
    setIsOpenValue(event.target.value);
  };

  const params = new URLSearchParams(window.location.search);
  const positionId = params.get('_id');
  const url1 = `${process.env.REACT_APP_API}/positions?_id=${positionId}`;

  if (positionId) {
    fetchMethod = 'PUT';
  }

  const onSubmit = (event) => {
    event.preventDefault();

    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client: clientIdValue,
        jobDescription: jobDescriptionValue,
        vacancy: vacancyValue,
        professionalProfile: professionalProfileIdValue,
        isOpen: isOpenValue
      }),
      method: fetchMethod
    };

    const url = positionId
      ? `${process.env.REACT_APP_API}/positions/${positionId}`
      : `${process.env.REACT_APP_API}/positions/`;

    fetch(url, options)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then(() => {
        window.location.href = `${window.location.origin}/positions`;
      })
      .catch((error) => {
        console.log('err', error);
      });
  };
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/profiles`)
      .then((response) => response.json())
      .then((res) => {
        setProfessionalProfilesValue(res.data);
      })
      .catch((error) => {
        console.log('err', error);
      });

    fetch(`${process.env.REACT_APP_API}/clients`)
      .then((response) => response.json())
      .then((res) => {
        setClientsValue(res.data);
      })
      .catch((error) => {
        console.log('err', error);
      });

    if (positionId) {
      fetch(url1)
        .then((response) => response.json())
        .then((res) => {
          onLoading(res);
        })
        .catch((error) => {
          console.log('err', error);
        });
    }
  }, []);
  return (
    <div>
      <form onSubmit={onSubmit} className={styles.container}>
        <h2>Position</h2>
        <label className={styles.inputDiv}>
          <span className={styles.inputName}>Client Name</span>
        </label>
        <select
          id="clientId"
          name="clientId"
          type="text"
          required
          value={clientIdValue}
          onChange={onChangeClientId}
          className={styles.input}
        >
          <option value={''} disabled>
            {'Select one'}
          </option>
          {clientsValue.map((client) => {
            return (
              <option value={client._id} key={client._id}>
                {client.name}
              </option>
            );
          })}
        </select>
        <label className={styles.inputDiv}>
          <span className={styles.inputName}>Job Description</span>
        </label>
        <input
          id="jobDescription"
          name="jobDescription"
          type="text"
          required
          value={jobDescriptionValue}
          onChange={onChangeJobDescription}
          className={styles.input}
        />
        <label className={styles.inputDiv}>
          <span className={styles.inputName}>Vacancy</span>
        </label>
        <input
          id="vacancy"
          name="vacancy"
          type="number"
          required
          value={vacancyValue}
          onChange={onChangeVacancy}
          className={styles.input}
        />
        <label className={styles.inputDiv}>
          <span className={styles.inputName}>Professional Profile</span>
        </label>
        <select
          id="professionalProfileId"
          name="professionalProfileId"
          type="text"
          required
          value={professionalProfileIdValue}
          onChange={onChangeProfessionalProfileId}
          className={styles.input}
        >
          <option value={''} disabled>
            {'Select one'}
          </option>
          {professionalProfilesValue.map((professionalProfile) => {
            return (
              <option value={professionalProfile._id} key={professionalProfile._id}>
                {professionalProfile.name}
              </option>
            );
          })}
        </select>
        <label className={styles.inputDiv}>
          <span className={styles.inputName}>Is Open</span>
        </label>
        <select
          id="isOpen"
          name="isOpen"
          type="text"
          required
          value={isOpenValue}
          onChange={onChangeIsOpen}
          className={styles.input}
        >
          <option value={''} disabled>
            {'Select one'}
          </option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <button id="saveButton" type="submit" className={styles.button}>
          Save
        </button>
      </form>
    </div>
  );
}

export default Form;
