import React from 'react';
import useQuery from 'Hooks/useQuery';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getPositionById } from 'redux/positions/thunks';
import { cleanSelectedItem } from 'redux/interviews/actions';
import { useHistory } from 'react-router-dom';

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
    <div>
      <div>
        <h3>{selectedItem.professionalProfile?.name}</h3>
        <p>{selectedItem.client?.name}</p>
        <p>{selectedItem.createdAt?.slice(0, 10)}</p>
        <p>{selectedItem.jobDescription}</p>
      </div>
      <div>
        <button
          onClick={() => {
            history.push('/home/login');
          }}
        >
          Interested? Sign in now
        </button>
      </div>
    </div>
  );
}

export default PositionDetailed;
