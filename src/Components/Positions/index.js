import { useEffect, useState } from 'react';
import styles from './list.module.css';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import { useHistory } from 'react-router-dom';
import Table from '../Shared/Table';

function Positions() {
  const [showModal, setShowModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const [errorValue, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [infoToShow, setInfoToShow] = useState([]);
  const [idToPass, setIdToPass] = useState([]);
  const history = useHistory();
  const columnName = [
    'Client',
    'Job Description',
    'Vacancy',
    'Professional Profile',
    'Is Open',
    'Delete'
  ];

  const deletePosition = () => {
    setIsLoading(true);
    const url = `${process.env.REACT_APP_API}/positions/${idToDelete}`;
    fetch(url, {
      method: 'DELETE'
    }).then(() => {
      fetch(`${process.env.REACT_APP_API}/positions`)
        .then((response) => response.json())
        .then(() => {
          closeModal();
        })
        .catch((errorValue) => {
          setError(errorValue.toString());
        })
        .finally(() => {
          setIsLoading(false);
          history.go(0);
        });
    });
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API}/positions`)
      .then((response) => response.json())
      .then((response) => {
        setInformationToShow(response.data);
      })
      .catch((errorValue) => {
        setError(errorValue.toString());
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const redirect = (id) => {
    history.push(`/positions/form?_id=${id}`);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const preventAndShow = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setIdToDelete(id);
    setShowModal(true);
  };

  const setInformationToShow = (data) => {
    const idToPass = [];
    const dataToPass = [];
    data.map((row) => {
      idToPass.push(row._id);
      dataToPass.push([
        row.client ? row.client.name : '-',
        row.jobDescription ? row.jobDescription : '-',
        row.vacancy ? row.vacancy : '-',
        row.professionalProfile ? row.professionalProfile.name : '-',
        row.isOpen ? 'Yes' : 'No'
      ]);
    });
    setInfoToShow(dataToPass);
    setIdToPass(idToPass);
  };

  return (
    <section className={styles.container}>
      <Modal
        showModal={showModal}
        title="Do you want to proceed and delete this position?"
        onClose={closeModal}
        isLoading={isLoading}
        onConfirm={deletePosition}
      />
      <h2 className={styles.title}>Positions</h2>
      {isLoading ? (
        <p className={styles.loading}>On Loading ...</p>
      ) : (
        <Table
          columnsName={columnName}
          id={idToPass}
          tableInfo={infoToShow}
          deleteFunction={preventAndShow}
          redirectFunction={redirect}
        />
      )}
      <div className={styles.buttonContainer}>
        <Button
          label="ADD POSITION"
          type="button"
          theme="primary"
          onClick={() => history.push('/positions/form')}
        />
      </div>
    </section>
  );
}

export default Positions;
