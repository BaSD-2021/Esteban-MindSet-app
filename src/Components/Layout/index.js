import Header from 'Components/Header';
import Footer from 'Components/Footer';
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
