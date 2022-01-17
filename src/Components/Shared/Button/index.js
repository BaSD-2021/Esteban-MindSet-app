import React from 'react';
import styles from './button.module.css';

function Button({ label, onClick, disabled, type = 'button', theme = 'primary', style, hidden }) {
  return (
    <div>
      <button
        type={type}
        className={`${styles[theme]} ${style} ${disabled && styles.disabled} ${
          hidden && styles.hidden
        }`}
        onClick={onClick}
        disabled={disabled}
        hidden={hidden}
      >
        {label}
      </button>
    </div>
  );
}

export default Button;
