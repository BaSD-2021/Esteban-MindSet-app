import React from 'react';
import { useHistory } from 'react-router-dom';

function MainPage() {
  const history = useHistory();
  return (
    <div>
      <div>
        <h2>Are you looking for a job?</h2>
        <h3>Check our active positions to join</h3>
        <button onClick={() => history.push(`/home/positions`)}>CLICK HERE</button>
      </div>
    </div>
  );
}

export default MainPage;
