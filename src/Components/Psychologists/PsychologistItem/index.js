import React from 'react';
import styles from './psychologistItem.module.css';
import Button from '../../Shared/Button';

const PsychologistItem = ({
  psychologist,
  handleEdit,
  toggleConfirmModal,
  toggleAvailabilityModal
}) => {
  const { firstName, lastName, username, password, email, phone, address } = psychologist;
  return (
    <tr className={styles.row} onClick={() => handleEdit(psychologist)}>
      <td>
        {firstName} {lastName}
      </td>
      <td>{username}</td>
      <td>{password}</td>
      <td>
        <button
          className={styles.availabilityBtn}
          onClick={(e) => toggleAvailabilityModal(e, psychologist)}
        >
          Click to see
        </button>
      </td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>{address}</td>
      <td>
        <Button name="deleteButton" onClick={(e) => toggleConfirmModal(e, psychologist)} />
      </td>
    </tr>
  );
};

export default PsychologistItem;
