import React from 'react';
import styles from './select.module.css';

function Select({ title, id, name, value, onChange, type, required, style, arrayToMap }) {
  return (
    <div className={styles.container}>
      <label className={styles.labelTitle}>{title}</label>
      <select
        className={`${styles.select} ${style}`}
        title={title}
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value={''} disabled>
          Select one
        </option>
        {arrayToMap.map((entity) => {
          return (
            <option value={entity.value} key={entity.value}>
              {entity.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Select;
