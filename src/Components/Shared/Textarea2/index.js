import React from 'react';
import styles from './textarea2.module.css';

function Textarea({ title, id, name, placeholder, rows, cols, ...props }) {
  return (
    <div className={styles.container}>
      <label className={styles.labelTitle}>{title}</label>
      <textarea
        className={styles.textareaContent}
        id={id}
        name={name}
        placeholder={placeholder}
        maxLength={250}
        rows={rows}
        cols={cols}
        {...props.input}
      ></textarea>
    </div>
  );
}

export default Textarea;
