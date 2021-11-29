import React from 'react';
import styles from './psychologistItem.module.css';

const PsychologistItem = ({ psychologist, handleEdit, handleDelete, toggleModal }) => {
  const { firstName, lastName, username, password, email, phone, address, _id } = psychologist;
  return (
    <tr className={styles.tr} onClick={() => handleEdit(psychologist)}>
      <td>
        {firstName} {lastName}
      </td>
      <td>{username}</td>
      <td>{password}</td>
      <td>
        <button onClick={(e) => toggleModal(e, psychologist)}>Click to see</button>
      </td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>{address}</td>
      <td>
        <button onClick={(e) => handleDelete(e, _id)}>Delete</button>
      </td>
    </tr>
  );
};

export default PsychologistItem;
