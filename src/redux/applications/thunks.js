import {
  getApplicationsPending,
  getApplicationsSuccess,
  getApplicationsError,
  createApplicationPending,
  createApplicationSuccess,
  createApplicationError,
  updateApplicationPending,
  updateApplicationSuccess,
  updateApplicationError,
  getApplicationByIdPending,
  getApplicationByIdSuccess,
  getApplicationByIdError,
  deleteApplicationPending,
  deleteApplicationSuccess,
  deleteApplicationError
} from './actions';

export const getApplications = () => {
  return (dispatch) => {
    dispatch(getApplicationsPending());
    const token = sessionStorage.getItem('token');
    return fetch(`${process.env.REACT_APP_API}/applications`, { headers: { token } })
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(getApplicationsSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(getApplicationsError(error.toString()));
      });
  };
};

export const getApplicationById = (id) => {
  return (dispatch) => {
    dispatch(getApplicationByIdPending());
    return fetch(`${process.env.REACT_APP_API}/applications?_id=${id}`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(getApplicationByIdSuccess(response.data[0]));
        return response.data[0];
      })
      .catch((error) => {
        dispatch(getApplicationByIdError(error.toString()));
      });
  };
};

export const createApplication = (values) => {
  return (dispatch) => {
    dispatch(createApplicationPending());
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    };
    return fetch(`${process.env.REACT_APP_API}/applications`, options)
      .then((response) => {
        if (response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(createApplicationSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(createApplicationError(error.toString()));
      });
  };
};

export const updateApplication = (id, values) => {
  return (dispatch) => {
    dispatch(updateApplicationPending());
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    };
    return fetch(`${process.env.REACT_APP_API}/applications/${id}`, options)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(updateApplicationSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(updateApplicationError(error.toString()));
      });
  };
};

export const deleteApplication = (id) => {
  return (dispatch) => {
    dispatch(deleteApplicationPending());
    return fetch(`${process.env.REACT_APP_API}/applications/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (response.status !== 204) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        dispatch(deleteApplicationSuccess(id));
      })
      .catch((error) => {
        dispatch(deleteApplicationError(error.toString()));
      });
  };
};
