import React from 'react';
import useQuery from 'Hooks/useQuery';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getPositionById } from 'redux/positions/thunks';
import { cleanSelectedItem } from 'redux/interviews/actions';
import { useHistory } from 'react-router-dom';
import styles from './position-detailed.module.css';
import Button from 'Components/Shared/Button';

function PositionDetailed() {
  const history = useHistory();
  const query = useQuery();
  const dispatch = useDispatch();
  const selectedItem = useSelector((store) => store.positions.selectedItem);

  const positionId = query.get('_id');
  useEffect(() => {
    if (positionId) {
      dispatch(getPositionById(positionId));
    }
  }, []);

  useEffect(() => {
    return () => {
      dispatch(cleanSelectedItem());
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <div>
          <h3 className={styles.cardTitle}>{selectedItem.professionalProfile?.name}</h3>
          <p className={styles.cardSubTitle}>{selectedItem.client?.name}</p>
          <p className={styles.cardDate}>{selectedItem.createdAt?.slice(0, 10)}</p>
          <p className={styles.jobDescription}>{selectedItem.jobDescription}</p>
        </div>
        <div className={styles.bttnContainer}>
          <Button
            onClick={() => {
              history.push('/auth/login');
            }}
            label="Interested? Sign in now"
          />
        </div>
      </div>
    </div>
  );
}

export default PositionDetailed;
