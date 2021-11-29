import React from 'react';
import styles from './availabilityTable.module.css';

const AvailabilityTable = ({ availability }) => {
  return (
    <table>
      <thead className={styles.header}>
        <tr>
          <th>Day</th>
          <th>From</th>
          <th>To</th>
        </tr>
      </thead>
      <tbody className={styles.body}>
        {Object.keys(availability).map((day, i) => (
          <tr key={i}>
            <td>{day}</td>
            <td>{availability[day].from}</td>
            <td>{availability[day].to}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AvailabilityTable;
