import styles from './select.module.css';
function Select({ title, id, type, required, style, arrayToMap, disabled, ...props }) {
  const hasError = !!(props.meta.touched && props.meta.error);
  return (
    <div className={styles.container}>
      <label className={styles.labelTitle}>{title}</label>
      <select
        className={`${styles.select} ${style} ${hasError && styles.inputError}`}
        title={title}
        id={id}
        type={type}
        required={required}
        disabled={disabled}
        name={props.input.name}
        value={props.input.value}
        onChange={props.input.onChange}
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
      <div className={styles.messageError}>{props.meta.touched && props.meta.error}</div>
    </div>
  );
}
export default Select;
