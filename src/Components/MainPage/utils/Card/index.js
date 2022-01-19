import Button from 'Components/Shared/Button';
import React from 'react';
import styles from './card.module.css';

function Cards(props) {
  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <div>
          <h2 className={styles.cardTitle}>{props.info.professionalProfile.name}</h2>
          <h4 className={styles.cardSubTitle}>{props.info.client.name}</h4>
          <div>
            <p className={styles.cardDate}>{props.info.createdAt.slice(0, 10)}</p>
            <div className={styles.bttnContainer}>
              <Button
                onClick={() => props.action(props.info._id)}
                label="More details"
                style={styles.button}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
