import { useEffect, useState } from 'react';
import styles from './list.module.css';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import { useHistory } from 'react-router-dom';
import Table from '../Shared/TableV2';
import { useDispatch, useSelector } from 'react-redux';
import { getPositions, deletePosition } from '../../redux/positions/thunks';
import { cleanError } from '../../redux/positions/actions';

function Positions() {
  const [showModal, setShowModal] = useState(false);
  const [selectedIdPosition, setSelectedIdPosition] = useState(undefined);

  const history = useHistory();
  const dispatch = useDispatch();
  const positions = useSelector((store) => store.positions.list);
  const error = useSelector((store) => store.positions.error);
  const isLoading = useSelector((store) => store.positions.isFetching);

  useEffect(() => {
    if (!positions.length) {
      dispatch(getPositions());
    }
  }, []);

  return (
    <section className={styles.container}>
      <Modal
        showModal={showModal}
        title="Do you want to proceed and delete this position?"
        onClose={() => setShowModal(false)}
        isLoading={isLoading}
        onConfirm={() => {
          dispatch(deletePosition(selectedIdPosition)).then(() => {
            setSelectedIdPosition(undefined);
            setShowModal(false);
          });
        }}
      />
      <h2 className={styles.title}>Positions</h2>
      {isLoading ? (
        <p className={styles.loading}>On Loading ...</p>
      ) : (
        <Table
          columns={[
            { name: 'Client', value: 'client.name' },
            { name: 'Job Description', value: 'jobDescription' },
            { name: 'Vacancy', value: 'vacancy' }
            // { name: 'Professional Profile', value: 'professionalProfile' },
            // { name: 'Is Open', value: 'isOpen' }
          ]}
          data={positions}
          onRowClick={(item) => history.push(`/positions/form?_id=${item._id}`)}
          actions={[
            {
              text: 'Delete',
              callback: (e, item) => {
                e.stopPropagation();
                setSelectedIdPosition(item._id);
                setShowModal(true);
              }
            }
          ]}
        />
      )}
      {error && (
        <Modal>
          {`${error}`}
          <button className={styles.button} onClick={() => dispatch(cleanError())}>
            Close
          </button>
        </Modal>
      )}
      <div className={styles.buttonContainer}>
        <Button label="ADD POSITION" onClick={() => history.push('/positions/form')} />
      </div>
    </section>
  );
}

export default Positions;
