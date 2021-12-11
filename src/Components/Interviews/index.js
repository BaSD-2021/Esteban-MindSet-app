import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './list.module.css';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import Table from '../Shared/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getInterviews, deleteInterview } from '../../redux/interviews/thunks';
import { cleanError } from '../../redux/interviews/actions';

function Interviews() {
  const [showModal, setShowModal] = useState(false);
  const [selectedIdInterview, setIdInterview] = useState(false);
  //const [idToDelete, setIdToDelete] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  // const [infoToShow, setInfoToShow] = useState([]);
  // const [idToPass, setIdToPass] = useState([]);
  const history = useHistory();
  // const columnName = ['Postulant', 'Client', 'Status', 'Date', 'Action'];

  // get the dispatcher to be able to dispatch Redux actions
  const dispatch = useDispatch();

  // get the Redux store values we need in the component
  const interviews = useSelector((store) => store.interviews.list);
  const error = useSelector((store) => store.interviews.error);
  const isLoading = useSelector((store) => store.interviews.isFetching);

  // const deleteInterview = () => {
  //   setIsLoading(true);
  //   const url = `${process.env.REACT_APP_API}/interviews/${idToDelete}`;
  //   fetch(url, {
  //     method: 'DELETE'
  //   })
  //     .then(() => {
  //       fetch(`${process.env.REACT_APP_API}/interviews`)
  //         .then((response) => response.json())
  //         .then(() => {
  //           closeModal();
  //         })
  //         .catch((error) => {
  //           setErrorMessage(error);
  //         });
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //       history.go(0);
  //     });
  // };

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch(`${process.env.REACT_APP_API}/interviews`)
  //     .then((response) => response.json())
  //     .then((response) => {
  //       setInformationToShow(response.data);
  //     })
  //     .catch((error) => {
  //       setErrorMessage(error);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, []);

  // const closeModal = () => {
  //   setShowModal(false);
  // };

  // const preventAndShow = (e, id) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setIdToDelete(id);
  //   setShowModal(true);
  // };

  // const redirect = (id) => {
  //   history.push(`/interviews/form?_id=${id}`);
  // };

  // const setInformationToShow = (data) => {
  //   const idToPass = [];
  //   const dataToPass = [];
  //   data.map((row) => {
  //     idToPass.push(row._id);
  //     dataToPass.push([
  //       row.postulant ? row.postulant.firstName + ' ' + row.postulant.lastName : '-',
  //       row.client ? row.client.name : '-',
  //       row.status ? row.status : '-',
  //       row.date ? row.date : '-'
  //     ]);
  //   });
  //   setInfoToShow(dataToPass);
  //   setIdToPass(idToPass);
  // };

  useEffect(() => {
    // get interviews list when the list on Redux is empty
    if (!interviews.length) {
      // Dispatch (execute) the async redux action to get the interviews list
      dispatch(getInterviews());
    }
  }, [interviews]);

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Interviews</h2>
      {isLoading ? (
        <p className={styles.loading}>On Loading ...</p>
      ) : (
        <Table
          //     columnsName={columnName}
          //     id={idToPass}
          //     tableInfo={infoToShow}
          //     deleteFunction={preventAndShow}
          //     redirectFunction={redirect}
          //   />
          // )}
          columns={[
            { name: 'Postulant', value: 'postulant' },
            { name: 'Client', value: 'client' },
            { name: 'Status', value: 'status' },
            { name: 'Date', value: 'date' }
          ]}
          data={interviews}
          onRowClick={(item) => history.push(`/interviews/form?_id=${item._id}`)}
          actions={[
            {
              text: 'Delete',
              callback: (e, item) => {
                e.stopPropagation();
                setIdInterview(item._id);
                setShowModal(true);
              }
            }
          ]}
        />
      )}
      <Modal
        show={showModal}
        title="Do you want to proceed and delete this Interview?"
        //onClose={closeModal}
        isLoading={isLoading}
        //onConfirm={deleteInterview}
        cancel={{
          text: 'Cancel',
          callback: () => setShowModal(false)
        }}
        confirm={{
          text: 'Confirm',
          callback: () => {
            dispatch(deleteInterview(selectedIdInterview)).then(() => {
              setIdInterview(undefined);
              setShowModal(false);
            });
          }
        }}
      />
      <Modal
        // The Error Modal is shown when an error exist in Redux
        show={!!error}
        title="Error"
        message={error}
        cancel={{
          text: 'Close',
          // Dispatch (execute) the cleanError action to remove the error in Redux
          // and hide the modal
          callback: () => dispatch(cleanError())
        }}
      />
      <div className={styles.buttonContainer}>
        {/* <Link to="/Interviews/Form" className={styles.button}>
          <Button name="addButton" entity="INTERVIEW" />
        </Link> */}
        <Button label="Add Interview" onClick={() => history.push('/interviews/form')} />
      </div>
    </section>
  );
}

export default Interviews;
