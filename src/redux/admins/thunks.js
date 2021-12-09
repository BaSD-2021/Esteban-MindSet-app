import {
  getAdminsPending,
  getAdminsSuccess,
  getAdminsError,
  createAdminPending,
  createAdminSuccess,
  createAdminError,
  updateAdminPending,
  updateAdminSuccess,
  updateAdminError,
  getAdminByIdPending,
  getAdminByIdSuccess,
  getAdminByIdError,
  deleteAdminPending,
  deleteAdminSuccess,
  deleteAdminError
} from './actions';

// Async Actions definition
export const getAdmins = () => {
  return (dispatch) => {
    // Dispatch (execute) the redux action to indicate the request will start
    dispatch(getAdminsPending());
    // Make the backend request
    return fetch(`${process.env.REACT_APP_API}/admins`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        // Dispatch (execute) the redux action to save the response in Redux
        dispatch(getAdminsSuccess(response.data));
      })
      .catch((error) => {
        // Dispatch (execute) the redux action to save the error in Redux
        // Remember always save an string, it is guaranteed using "error.toString()"
        dispatch(getAdminsError(error.toString()));
      });
  };
};

// See the comments above for reference.
// On this case, we are passing an "id" params to send it to the backend
export const getAdminById = (id) => {
  return (dispatch) => {
    dispatch(getAdminByIdPending());
    return fetch(`${process.env.REACT_APP_API}/admins?_id=${id}`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(getAdminByIdSuccess(response.data[0]));
        // it is necessary to return the response to get it on the ".then" in
        // the component when the action is dispatched
        return response.data[0];
      })
      .catch((error) => {
        dispatch(getAdminByIdError(error.toString()));
      });
  };
};

export const createAdmin = (values) => {
  return (dispatch) => {
    dispatch(createAdminPending());
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    };
    return fetch(`${process.env.REACT_APP_API}/admins`, options)
      .then((response) => {
        if (response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(createAdminSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(createAdminError(error.toString()));
      });
  };
};

export const updateAdmin = (id, values) => {
  return (dispatch) => {
    dispatch(updateAdminPending());
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    };
    return fetch(`${process.env.REACT_APP_API}/admins/${id}`, options)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(updateAdminSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(updateAdminError(error.toString()));
      });
  };
};

export const deleteAdmin = (id) => {
  return (dispatch) => {
    dispatch(deleteAdminPending());
    return fetch(`${process.env.REACT_APP_API}/admins/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (response.status !== 204) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        dispatch(deleteAdminSuccess(id));
      })
      .catch((error) => {
        dispatch(deleteAdminError(error.toString()));
      });
  };
};
