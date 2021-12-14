import {
  getProfilesPending,
  getProfilesSuccess,
  getProfilesError,
  createProfilePending,
  createProfileSuccess,
  createProfileError,
  updateProfilePending,
  updateProfileSuccess,
  updateProfileError,
  getProfileByIdPending,
  getProfileByIdSuccess,
  getProfileByIdError,
  deleteProfilePending,
  deleteProfileSuccess,
  deleteProfileError
} from './actions';

export const getProfiles = () => {
  return (dispatch) => {
    dispatch(getProfilesPending());
    return fetch(`${process.env.REACT_APP_API}/profiles`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(getProfilesSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getProfilesError(error.toString()));
      });
  };
};

export const getProfileById = (id) => {
  return (dispatch) => {
    dispatch(getProfileByIdPending());
    return fetch(`${process.env.REACT_APP_API}/profiles?_id=${id}`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(getProfileByIdSuccess(response.data[0]));
        return response.data[0];
      })
      .catch((error) => {
        dispatch(getProfileByIdError(error.toString()));
      });
  };
};

export const createProfile = (values) => {
  return (dispatch) => {
    dispatch(createProfilePending());
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    };
    return fetch(`${process.env.REACT_APP_API}/profiles`, options)
      .then((response) => {
        if (response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(createProfileSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(createProfileError(error.toString()));
      });
  };
};

export const updateProfile = (id, values) => {
  return (dispatch) => {
    dispatch(updateProfilePending());
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    };
    return fetch(`${process.env.REACT_APP_API}/profiles/${id}`, options)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(updateProfileSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(updateProfileError(error.toString()));
      });
  };
};

export const deleteProfile = (id) => {
  return (dispatch) => {
    dispatch(deleteProfilePending());
    return fetch(`${process.env.REACT_APP_API}/profiles/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (response.status !== 204) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        dispatch(deleteProfileSuccess(id));
      })
      .catch((error) => {
        dispatch(deleteProfileError(error.toString()));
      });
  };
};
