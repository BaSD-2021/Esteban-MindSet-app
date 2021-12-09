import React from 'react';
import styles from './form.module.css';
import Input from '../../Shared/Input';
import Button from '../../Shared/Button';
import Checkbox from '../../Shared/Checkbox';

const Form = ({
  inputs,
  availability,
  toggleFormDisplay,
  itemOnEdit,
  onChange,
  handleSubmit,
  disabled
}) => {
  return (
    <form className={styles.form}>
      {inputs.map((input) => (
        <Input
          title={input.title}
          key={input.inputName}
          type={input.type}
          name={input.inputName}
          placeholder={input.placeholder}
          value={itemOnEdit[input.inputName]}
          onChange={onChange}
          disabled={disabled}
        />
      ))}
      <h3 className={styles.availabilityHeading}>Availability</h3>
      {availability.map((item, i) => (
        <div className={styles.availabilityForm} key={i}>
          <label key={item.label} className={styles.availabilityLabel}>
            {item.label}
          </label>
          <Checkbox
            key={item.day.inputName}
            name={item.day.inputName}
            selected={itemOnEdit.availability[item.label].availability}
            onChange={onChange}
          />
          <Input
            key={item.from.inputName}
            type={item.from.type}
            name={item.from.inputName}
            placeholder={item.from.placeholder}
            value={itemOnEdit.availability[item.label].from}
            onChange={onChange}
            style={styles.availabilityInput}
            disabled={disabled}
          />
          <Input
            key={item.to.inputName}
            type={item.to.type}
            name={item.to.inputName}
            placeholder={item.to.placeholder}
            value={itemOnEdit.availability[item.label].to}
            onChange={onChange}
            style={styles.availabilityInput}
            disabled={disabled}
          />
        </div>
      ))}
      <div className={styles.buttonContainer}>
        <Button
          label="SAVE"
          theme="primary"
          type="submit"
          onClick={(e) => {
            toggleFormDisplay, handleSubmit(itemOnEdit, e);
          }}
          disabled={disabled}
        />
      </div>
    </form>
  );
};

export default Form;
