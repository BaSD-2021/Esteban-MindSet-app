import styles from './input.module.css';

function Input(props) {
  return (
    <input
      className={styles.input}
      name={props.name}
      type={props.type}
      value={props.value}
      onChange={props.onChange}
      required={props.required}
    />
  );
}

export default Input;
