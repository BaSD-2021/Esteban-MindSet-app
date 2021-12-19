import { useEffect, useState } from 'react';
import styles from './positions.module.css';
import Modal from 'Components/Shared/Modal';
import Button from 'Components/Shared/Button';
import { useHistory } from 'react-router-dom';
import Table from 'Components/Shared/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getPositions } from 'redux/positions/thunks';
import { cleanError } from 'redux/positions/actions';

function Positions() {
  const history = useHistory();
  const dispatch = useDispatch();
  const positions = useSelector((store) => store.positions.list);
  const error = useSelector((store) => store.positions.error);
  const isLoading = useSelector((store) => store.positions.isFetching);
  const [openPositions, setOpenPositions] = useState([]);

  useEffect(() => {
    if (!positions.length) {
      dispatch(getPositions());
    }
    setOpenPositions(positions.filter((position) => position.isOpen));
  }, [positions]);

  return (
    <section className={styles.container}>
      <Modal
        show={!!error}
        title="Error"
        message={error}
        cancel={{
          text: 'Close',
          callback: () => dispatch(cleanError())
        }}
      />
      <h2 className={styles.title}>Open Positions</h2>
      {isLoading ? (
        <p className={styles.loading}>On Loading ...</p>
      ) : (
        <Table
          columns={[
            { name: 'Client', value: 'client.name' },
            { name: 'Job Description', value: 'jobDescription' },
            { name: 'Vacancy', value: 'vacancy' },
            { name: 'Professional Profile', value: 'professionalProfile.name' }
          ]}
          data={openPositions}
          onRowClick={(item) => history.push(`/admin/positions/form?_id=${item._id}`)}
          actions={[]}
        />
      )}
      <div className={styles.buttonContainer}>
        <Button label="ADD POSITION" onClick={() => history.push('/admin/positions/form')} />
      </div>
    </section>
  );
}

export default Positions;
