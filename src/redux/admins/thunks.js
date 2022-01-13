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

export const getAdmins = () => {
  return (dispatch) => {
    dispatch(getAdminsPending());
    const token = sessionStorage.getItem('token');
    return fetch(`${process.env.REACT_APP_API}/admins`, { headers: { token } })
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(getAdminsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getAdminsError(error.toString()));
      });
  };
};

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
