import Header from 'Components/Header';
import Footer from 'Components/Footer';
import styles from './layout.module.css';

function Layout(props) {
  const { routes = [] } = props;
  return (
    <div className={styles.container}>
      <Header routes={routes} />
      {props.children}
      <Footer routes={routes} />
    </div>
  );
}

export default Layout;
