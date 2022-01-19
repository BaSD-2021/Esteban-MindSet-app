import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './main.module.css';
import Button from 'Components/Shared/Button';

function MainPage() {
  const history = useHistory();
  return (
    <div className={styles.wrapper}>
      <div className={styles.background}></div>
      <div className={styles.mainPageTitleWrapper}>
        <h2 className={styles.mainPageTitle}>Are you looking for a job?</h2>
        <h3 className={styles.mainPageSubTitle}>Check our open positions!</h3>
        <Button onClick={() => history.push(`/home/positions`)} label="CLICK HERE" />
      </div>
    </div>
  );
}

export default MainPage;
