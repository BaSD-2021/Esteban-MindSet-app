import React, { useEffect } from 'react';
import styles from './OpenPositions.module.css';
import Card from 'Components/MainPage/utils/Card';
import { useDispatch, useSelector } from 'react-redux';
import { getPositions } from 'redux/positions/thunks';
import { useHistory } from 'react-router-dom';

function OpenPositions() {
  const positions = useSelector((store) => store.positions.list);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!positions.length) {
      dispatch(getPositions());
    }
  }, [positions]);

  return (
    <div className={styles.container}>
      {positions.map((position) => {
        return (
          <Card
            action={(id) => {
              history.push(`/home/position?_id=${id}`);
            }}
            info={position}
            key={position._id}
          />
        );
      })}
    </div>
  );
}

export default OpenPositions;
