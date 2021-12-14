import React from 'react';
import styles from './availabilityTable.module.css';

const AvailabilityTable = ({ availability }) => {
  return (
    <table className={styles.table}>
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
            <td className={styles.tableContent}>{day}</td>
            <td className={styles.tableContent}>{availability[day].from}</td>
            <td className={styles.tableContent}>{availability[day].to}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AvailabilityTable;
