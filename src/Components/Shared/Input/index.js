import React from 'react';
import styles from './input.module.css';

function Input({ title, id, name, placeholder, value, onChange, type, required, style, disabled }) {
  return (
    <div className={styles.container}>
      <label className={styles.labelTitle}>{title}</label>
      <input
        className={`${styles.inputContent} ${style}`}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
        required={required}
        disabled={disabled}
      />
    </div>
  );
}

export default Input;
