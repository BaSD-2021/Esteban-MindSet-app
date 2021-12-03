import React from 'react';
import TableHeader from '../TableHeader';
import PSYCHOLOGISTS_TABLE_HEADERS from '../utils/table-headers-utils';
import PsychologistItem from '../PsychologistItem';
import styles from './list.module.css';

const List = ({
  psychologists,
  toggleFormDisplay,
  handleEdit,
  toggleAvailabilityModal,
  toggleConfirmModal
}) => {
  return (
    <div>
      <table className={styles.table}>
        <TableHeader headers={PSYCHOLOGISTS_TABLE_HEADERS} />
        <tbody>
          {psychologists.map((psychologist, i) => (
            <PsychologistItem
              key={i}
              psychologist={psychologist}
              handleEdit={handleEdit}
              toggleConfirmModal={toggleConfirmModal}
              toggleAvailabilityModal={toggleAvailabilityModal}
            />
          ))}
        </tbody>
      </table>
      <div className={styles.btnContainer}>
        <button className={styles.addBtn} onClick={toggleFormDisplay}>
          Add psychologist
        </button>
      </div>
    </div>
  );
};

export default List;
