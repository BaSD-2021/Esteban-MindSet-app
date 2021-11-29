import React from 'react';
import TableHeader from '../TableHeader';
import PSYCHOLOGISTS_TABLE_HEADERS from '../utils/table-headers-utils';
import PsychologistItem from '../PsychologistItem';

const List = ({ psychologists, ToggleFormDisplay, handleEdit, handleDelete, ToggleModal }) => {
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
              handleDelete={handleDelete}
              ToggleModal={ToggleModal}
            />
          ))}
        </tbody>
      </table>
      <button onClick={ToggleFormDisplay}>Add psychologist</button>
    </div>
  );
};

export default List;
