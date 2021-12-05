import React from 'react';
import styles from './form.module.css';
import Button from '../../Shared/Button';

const Form = ({ inputs, availability, toggleFormDisplay, itemOnEdit, onChange, handleSubmit }) => {
  return (
    <form className={styles.form} onSubmit={(e) => handleSubmit(itemOnEdit, e)}>
      {inputs.map((input) => (
        <input
          className={styles.dataInput}
          key={input.inputName}
          type={input.type}
          name={input.inputName}
          placeholder={input.placeholder}
          value={itemOnEdit[input.inputName]}
          onChange={onChange}
        />
      ))}
      <h3 className={styles.availabilityHeading}>Availability</h3>
      {availability.map((item, i) => (
        <div className={styles.availabilityForm} key={i}>
          <label key={item.label} className={styles.availabilityLabel}>
            {item.label}
          </label>
          <input
            key={item.day.inputName}
            type={item.day.type}
            name={item.day.inputName}
            placeholder={item.day.placeholder}
            value={itemOnEdit.availability[item.label].availability}
            onChange={onChange}
            className={styles.availabilityInput}
          />
          <input
            key={item.from.inputName}
            type={item.from.type}
            name={item.from.inputName}
            placeholder={item.from.placeholder}
            value={itemOnEdit.availability[item.label].from}
            onChange={onChange}
            className={styles.availabilityInput}
          />
          <input
            key={item.to.inputName}
            type={item.to.type}
            name={item.to.inputName}
            placeholder={item.to.placeholder}
            value={itemOnEdit.availability[item.label].to}
            onChange={onChange}
            className={styles.availabilityInput}
          />
        </div>
      ))}
      <div className={styles.buttonContainer}>
        <Button name="saveButton" type="button" onClick={toggleFormDisplay} />
        {/* <input className={styles.submitBtn} type="submit" value="Submit" name="submit"></input>
        <input
          className={styles.cancelBtn}
          type="button"
          value="Cancel"
          name="cancel"
          onClick={toggleFormDisplay}
        ></input> */}
      </div>
    </form>
  );
};

export default Form;
