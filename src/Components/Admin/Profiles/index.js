import { useEffect, useState } from 'react';
import Modal from 'Components/Shared/Modal';
import styles from './profiles.module.css';
import Button from 'Components/Shared/Button';
import { useHistory } from 'react-router-dom';
import Table from 'Components/Shared/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getProfiles, deleteProfile } from 'redux/profiles/thunks';
import { cleanError } from 'redux/profiles/actions';

function Profiles() {
  const [showModal, setShowModal] = useState(false);
  const [selectedIdProfile, setSelectedIdProfile] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const profiles = useSelector((store) => store.profiles.list);
  const error = useSelector((store) => store.profiles.error);
  const isLoading = useSelector((store) => store.profiles.isFetching);

  useEffect(() => {
    if (!profiles.length) {
      dispatch(getProfiles());
    }
  }, [profiles]);

  return (
    <section className={styles.container}>
      <Modal
        show={showModal}
        title="Are you sure you want to delete this Profile?"
        isLoading={isLoading}
        cancel={{
          text: 'Cancel',
          callback: () => setShowModal(false)
        }}
        confirm={{
          text: 'Confirm',
          callback: () => {
            dispatch(deleteProfile(selectedIdProfile)).then(() => {
              setSelectedIdProfile(undefined);
              setShowModal(false);
            });
          }
        }}
      />
      <Modal
        show={!!error}
        title="Error"
        message={error}
        cancel={{
          text: 'Close',
          callback: () => dispatch(cleanError())
        }}
      />
      <h2 className={styles.title}>Profiles</h2>
      <div>
        {isLoading ? (
          <p className={styles.loading}>On Loading ...</p>
        ) : (
          <Table
            columns={[{ name: 'Postulant', value: 'name' }]}
            data={profiles}
            onRowClick={(item) => history.push(`/admin/profiles/form?_id=${item._id}`)}
            actions={[
              {
                text: 'Delete',
                callback: (e, item) => {
                  e.stopPropagation();
                  setSelectedIdProfile(item._id);
                  setShowModal(true);
                }
              }
            ]}
          />
        )}
      </div>
      <div className={styles.buttonContainer}>
        <Button label="ADD PROFILE" onClick={() => history.push('/admin/profiles/form')} />
      </div>
    </section>
  );
}

export default Profiles;
