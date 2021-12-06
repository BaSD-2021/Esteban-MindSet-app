import React from 'react';
import styles from './textarea.module.css';

function Textarea({ title, id, name, placeholder, value, onChange, required, rows, cols }) {
  return (
    <div className={styles.container}>
      <label className={styles.labelTitle}>{title}</label>
      <input
        className={styles.textareaContent}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        cols={cols}
      />
    </div>
  );
}

export default Textarea;
