import React from 'react';
import styles from './textarea.module.css';

function Textarea(props) {
  const hasError = !!(props.meta.touched && props.meta.error);
  return (
    <div className={styles.container}>
      <label className={styles.labelTitle}>{props.title}</label>
      <textarea
        className={`${styles.textareaContent} ${props.style} ${hasError && styles.textareaError}`}
        name={props.name}
        placeholder={props.placeholder}
        maxLength={250}
        rows={props.rows}
        cols={props.cols}
        {...props.input}
      ></textarea>
      <div className={styles.messageError}>{props.meta.touched && props.meta.error}</div>
    </div>
  );
}

export default Textarea;
