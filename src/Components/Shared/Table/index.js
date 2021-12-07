import styles from './table.module.css';
import Button from '../Button';

function Table(props) {
  return (
    <table className={styles.tableData}>
      <thead className={styles.tableHeader}>
        <tr className={styles.trStyles}>
          {props.columnsName.map((column, index) => {
            return <th key={index}>{column}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {props.tableInfo.length === 0 ? (
          <tr>
            <td>
              <p>There is no data to show. Please create new entities.</p>
            </td>
          </tr>
        ) : (
          props.tableInfo.map((row, index) => {
            return (
              <tr
                key={props.id[index]}
                onClick={() => props.redirectFunction(props.id[index])}
                className={styles.trStyles}
              >
                {row.map((cell, index) => {
                  return (
                    <td key={index} className={styles.tdStyles}>
                      {cell}
                    </td>
                  );
                })}
                <td className={styles.tdStyles}>
                  <Button
                    name="deleteButton"
                    onClick={(e) => {
                      props.deleteFunction(e, props.id[index]);
                    }}
                  />
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
}

export default Table;
