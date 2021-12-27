import React from 'react';
import styles from './checkbox2.module.css';

const Checkbox = (props) => {
  return (
    <div className={styles.container}>
      <input className={`${styles.checkbox} ${props.style}`} type="checkbox" {...props.input} />
      <label className={styles.label}>{props.label}</label>
    </div>
  );
};

export default Checkbox;
