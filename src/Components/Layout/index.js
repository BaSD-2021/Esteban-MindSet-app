import Header from '../Header/index';
import Footer from '../Footer/index';
import styles from './layout.module.css';

function Layout(props) {
  return (
    <div className={styles.container}>
      <Header />
      {props.children}
      <Footer />
    </div>
  );
}

export default Layout;
