import React from 'react';
import styles from './modal.module.css';
import Button from '../Button';

function Modal(props) {
  if (!props.show) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3>{props.title}</h3>
        <p>{props.message}</p>
        <div className={styles.buttons}>
          {props.confirm && (
            <Button
              label={props.confirm.text}
              disabled={props.disabled}
              onClick={props.confirm.callback}
            />
          )}
          {props.cancel && (
            <Button
              label={props.cancel.text}
              disabled={props.disabled}
              onClick={props.cancel.callback}
              theme="secondary"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
