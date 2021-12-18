import React from 'react';
import styles from './tableHeader.module.css';

const TableHeader = ({ headers }) => {
  return (
    <thead>
      <tr>
        {headers.map((header) => (
          <th key={header} className={styles.headerItem}>
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
