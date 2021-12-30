import React from 'react';
import styles from './switch.module.css';

const Switch = ({ isToggled, onToggle }) => {
  return (
    <label className={styles.switch}>
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className={`${styles.slider}  ${styles.rounded}`} />
    </label>
  );
};

export default Switch;
