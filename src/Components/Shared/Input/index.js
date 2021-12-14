import React from 'react';
import styles from './input.module.css';

function Input(props) {
  // To more easily indicate when there is an error, "hasError" is a boolean
  const hasError = !!(props.meta.touched && props.meta.error);

  // All HTML native input props are into "props.input" (name, onChange, type, etc)
  // All Form props are into "props.meta" (touched, error, etc)
  // Rest of passed props are into "props" (disabled, placeholder, etc)

  return (
    <div className={styles.container}>
      <label className={styles.labelTitle}>{props.label}</label>
      <input
        // combine styles using string template
        className={`${styles.inputContent} ${props.style} ${hasError && styles.inputError}`}
        placeholder={props.placeholder}
        disabled={props.disabled}
        // it's a simpler way to pass all props.input inside input
        {...props.input}
      />
      {/* Show a message error if the input was touched and it has a message into "props.meta.error" */}
      <div className={styles.messageError}>{props.meta.touched && props.meta.error}</div>
    </div>
  );
}

export default Input;
