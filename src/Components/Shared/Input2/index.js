import React from 'react';
import styles from './input2.module.css';

function Input(props) {
  const hasError = !!(props.meta.touched && props.meta.error);
  return (
    <div className={styles.container}>
      <label className={styles.labelTitle}>{props.label}</label>
      <input
        className={`${styles.inputContent} ${props.style} ${hasError && styles.inputError}`}
        type={props.type}
        placeholder={props.placeholder}
        disabled={props.disabled}
        {...props.input}
      />
      <div className={styles.messageError}>{props.meta.touched && props.meta.error}</div>
    </div>
  );
}

export default Input;
