import React from 'react';
import TableHeader from '../TableHeader';
import PSYCHOLOGISTS_TABLE_HEADERS from '../utils/table-headers-utils';
import PsychologistItem from '../PsychologistItem';

const List = ({
  psychologists,
  toggleFormDisplay,
  handleEdit,
  toggleAvailabilityModal,
  toggleConfirmModal
}) => {
  return (
    <div>
      <table>
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
      <button onClick={toggleFormDisplay}>Add psychologist</button>
    </div>
  );
};

export default List;
