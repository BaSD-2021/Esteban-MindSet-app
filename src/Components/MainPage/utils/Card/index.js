import React from 'react';
import styles from './card.module.css';

function Cards(props) {
  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <div>
          <h2>{props.info.professionalProfile.name}</h2>
          <h4>{props.info.client.name}</h4>
          <div>
            <p>{props.info.createdAt.slice(0, 10)}</p>
            <span>
              <button onClick={() => props.action(props.info._id)}>More details</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
