import Header from 'Components/Header/index';
import Footer from 'Components/Footer/index';
import styles from './layout.module.css';

function Layout(props) {
  const { routes } = props;
  return (
    <div className={styles.container}>
      <Header routes={routes} />
      {props.children}
      <Footer routes={routes} />
    </div>
  );
}

export default Layout;
