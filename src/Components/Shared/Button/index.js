import React from 'react';
import styles from './button.module.css';

function Button({ name, entity, onClick, onSubmit, disabled }) {
  return (
    <div>
      <button className={styles[name]} onClick={onClick} onSubmit={onSubmit} disabled={disabled}>
        {name === 'deleteButton' && 'DELETE'}
        {name === 'addButton' && `ADD ${entity}`}
        {name === 'saveButton' && 'SAVE'}
        {name === 'modalDeleteButton' && 'Delete'}
        {name === 'modalCancelButton' && 'Cancel'}
      </button>
    </div>
  );
}

export default Button;
