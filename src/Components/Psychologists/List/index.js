import React from 'react';
import TableHeader from '../TableHeader';
import PSYCHOLOGISTS_TABLE_HEADERS from '../utils/table-headers-utils';
import PsychologistItem from '../PsychologistItem';
import styles from './list.module.css';
import Button from '../../Shared/Button';
import { useHistory } from 'react-router-dom';

const List = ({
  psychologists,
  handleEdit,
  toggleAvailabilityModal,
  toggleConfirmModal,
  setDelete
}) => {
  const history = useHistory();
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
              setDelete={setDelete}
              toggleConfirmModal={toggleConfirmModal}
              toggleAvailabilityModal={toggleAvailabilityModal}
            />
          ))}
        </tbody>
      </table>
      <div className={styles.buttonContainer}>
        <Button label="ADD PSYCHOLOGIST" onClick={() => history.push('/psychologists/form')} />
      </div>
    </div>
  );
};

export default List;
