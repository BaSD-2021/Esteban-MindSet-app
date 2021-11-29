import React from 'react';
import styles from './psychologistItem.module.css';

const PsychologistItem = ({
  psychologist,
  handleEdit,
  toggleConfirmModal,
  toggleAvailabilityModal
}) => {
  const { firstName, lastName, username, password, email, phone, address } = psychologist;
  return (
    <tr className={styles.tr} onClick={() => handleEdit(psychologist)}>
      <td>
        {firstName} {lastName}
      </td>
      <td>{username}</td>
      <td>{password}</td>
      <td>
        <button onClick={(e) => toggleAvailabilityModal(e, psychologist)}>Click to see</button>
      </td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>{address}</td>
      <td>
        <button onClick={(e) => toggleConfirmModal(e, psychologist)}>Delete</button>
      </td>
    </tr>
  );
};

export default PsychologistItem;
