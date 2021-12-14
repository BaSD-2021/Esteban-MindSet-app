import React from 'react';
import TableHeader from 'Components/Admin/Psychologists/TableHeader';
import PSYCHOLOGISTS_TABLE_HEADERS from 'Components/Admin/Psychologists/utils/table-headers-utils';
import PsychologistItem from 'Components/Admin/Psychologists/PsychologistItem';
import styles from './list.module.css';
import Button from 'Components/Shared/Button';

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
      <div className={styles.buttonContainer}>
        <Button label="ADD PSYCHOLOGIST" onClick={toggleFormDisplay} />
      </div>
    </div>
  );
};

export default List;
