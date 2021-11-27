import { useEffect, useState } from 'react';
import styles from './postulants.module.css';

function Postulants() {
  const [postulants, setPostulants] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/postulants`)
      .then((response) => response.json())
      .then((response) => {
        setPostulants(response.data);
      });
  }, []);

  return (
    <section className={styles.container}>
      <h2>Postulants</h2>
      <ul>
        {postulants.map((postulant) => {
          return (
            <li key={postulant._id}>
              {postulant.firstName}
              {postulant.lastName}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default Postulants;
