import React from 'react';
import styles from './contact.module.css';

function Contact() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.background}></div>
      <p className={styles.mainPageTitle}>
        If you are a company and looking for potential candidates, this is the place you{`'`}ve been
        looking for.
      </p>
    </div>
  );
}

export default Contact;
