import styles from './footer.module.css';

function Footer(props) {
  return (
    <footer className={styles.container}>
      <div className={styles.main}>
        <div className={styles.appName}>
          Mind<span>SET</span>
        </div>
        <ul className={styles.routes}>
          {props.routes.map((route) => (
            <li key={route.name}>
              <a href={route.path}>{route.name}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.license}>
        <div className={styles.copyright}>Copyright © 2021 Radium Rocket</div>
        <div>
          <a href={'https://www.facebook.com/radiumrocket'} target={'_blank'} rel="noreferrer">
            <img
              className={styles.socialIcon}
              src={`${process.env.PUBLIC_URL}/assets/images/facebook.svg`}
            />
          </a>
          <a href={'https://twitter.com/radiumrocket'} target={'_blank'} rel="noreferrer">
            <img
              className={styles.socialIcon}
              src={`${process.env.PUBLIC_URL}/assets/images/twitter.svg`}
            />
          </a>
          <a href={'https://www.instagram.com/radium.rocket/'} target={'_blank'} rel="noreferrer">
            <img
              className={styles.socialIcon}
              src={`${process.env.PUBLIC_URL}/assets/images/instagram.svg`}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
