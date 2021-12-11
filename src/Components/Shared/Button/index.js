import React from 'react';
import styles from './button.module.css';

function Button({ label, onClick, disabled, type = 'button', theme = 'primary', style }) {
  return (
    <div>
      <button
        type={type}
        className={`${styles[theme]} ${style} ${disabled && styles.disabled}`}
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </button>
    </div>
  );
}

export default Button;
