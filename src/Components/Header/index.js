import styles from './header.module.css';
import { Link } from 'react-router-dom';
import Button from 'Components/Shared/Button';
import firebase from 'helper/firebase';

function Header(props) {
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.brand}>Radium Rocket</div>
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
      <nav className={styles.navbar}>
        <Link to="/" className={styles.appName}>
          Mind<span>SET</span>
        </Link>
        <ul className={styles.routes}>
          {props.routes.map((route) => (
            <li key={route.name}>
              <Link to={route.path}>{route.name}</Link>
            </li>
          ))}
        </ul>
        {props.logout && (
          <Button
            label="Logout"
            onClick={() => {
              firebase.auth().signOut();
            }}
          />
        )}
      </nav>
    </header>
  );
}

export default Header;
