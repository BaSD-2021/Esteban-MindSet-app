import React from 'react';
import styles from './tableHeader.module.css';

const TableHeader = ({ headers }) => {
  return (
    <thead>
      <tr className={styles.trStyles}>
        {headers.map((header) => (
          <th key={header} className={styles.thStyles}>
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
