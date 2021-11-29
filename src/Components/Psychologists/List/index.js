import React from 'react';
import TableHeader from '../TableHeader';
import PSYCHOLOGISTS_TABLE_HEADERS from '../utils/table-headers-utils';
import PsychologistItem from '../PsychologistItem';

const List = ({ psychologists, toggleFormDisplay, handleEdit, handleDelete, toggleModal }) => {
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
              toggleModal={toggleModal}
            />
          ))}
        </tbody>
      </table>
      <button onClick={toggleFormDisplay}>Add psychologist</button>
    </div>
  );
};

export default List;
