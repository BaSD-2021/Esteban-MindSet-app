import {
  getSessionsPending,
  getSessionsSuccess,
  getSessionsError,
  createSessionPending,
  createSessionSuccess,
  createSessionError,
  updateSessionPending,
  updateSessionSuccess,
  updateSessionError,
  getSessionByIdPending,
  getSessionByIdSuccess,
  getSessionByIdError,
  deleteSessionPending,
  deleteSessionSuccess,
  deleteSessionError
} from './actions';

export const getSessions = () => {
  return (dispatch) => {
    dispatch(getSessionsPending());
    return fetch(`${process.env.REACT_APP_API}/sessions`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(getSessionsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getSessionsError(error.toString()));
      });
  };
};

export const getSessionById = (id) => {
  return (dispatch) => {
    dispatch(getSessionByIdPending());
    return fetch(`${process.env.REACT_APP_API}/sessions?_id=${id}`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(getSessionByIdSuccess(response.data[0]));
        return response.data[0];
      })
      .catch((error) => {
        dispatch(getSessionByIdError(error.toString()));
      });
  };
};

export const createSession = (values) => {
  return (dispatch) => {
    dispatch(createSessionPending());
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    };
    return fetch(`${process.env.REACT_APP_API}/sessions`, options)
      .then((response) => {
        if (response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(createSessionSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(createSessionError(error.toString()));
      });
  };
};

export const updateSession = (id, values) => {
  return (dispatch) => {
    dispatch(updateSessionPending());
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    };

    return fetch(`${process.env.REACT_APP_API}/sessions/${id}`, options)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(updateSessionSuccess(response.data));
        dispatch(getSessions());
        return response.data;
      })
      .catch((error) => {
        dispatch(updateSessionError(error.toString()));
      });
  };
};

export const deleteSession = (id) => {
  return (dispatch) => {
    dispatch(deleteSessionPending());
    return fetch(`${process.env.REACT_APP_API}/sessions/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (response.status !== 204) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        dispatch(deleteSessionSuccess(id));
      })
      .catch((error) => {
        dispatch(deleteSessionError(error.toString()));
      });
  };
};
