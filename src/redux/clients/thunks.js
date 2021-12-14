import {
  getClientsPending,
  getClientsSuccess,
  getClientsError,
  createClientPending,
  createClientSuccess,
  createClientError,
  updateClientPending,
  updateClientSuccess,
  updateClientError,
  getClientByIdPending,
  getClientByIdSuccess,
  getClientByIdError,
  deleteClientPending,
  deleteClientSuccess,
  deleteClientError
} from './actions';

export const getClients = () => {
  return (dispatch) => {
    dispatch(getClientsPending());
    return fetch(`${process.env.REACT_APP_API}/clients`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(getClientsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getClientsError(error.toString()));
      });
  };
};

export const getClientById = (id) => {
  return (dispatch) => {
    dispatch(getClientByIdPending());
    return fetch(`${process.env.REACT_APP_API}/clients?_id=${id}`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(getClientByIdSuccess(response.data[0]));
        return response.data[0];
      })
      .catch((error) => {
        dispatch(getClientByIdError(error.toString()));
      });
  };
};

export const createClient = (values) => {
  return (dispatch) => {
    dispatch(createClientPending());
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    };
    return fetch(`${process.env.REACT_APP_API}/clients`, options)
      .then((response) => {
        if (response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(createClientSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(createClientError(error.toString()));
      });
  };
};

export const updateClient = (id, values) => {
  return (dispatch) => {
    dispatch(updateClientPending());
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    };
    return fetch(`${process.env.REACT_APP_API}/clients/${id}`, options)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(updateClientSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(updateClientError(error.toString()));
      });
  };
};

export const deleteClient = (id) => {
  return (dispatch) => {
    dispatch(deleteClientPending());
    return fetch(`${process.env.REACT_APP_API}/clients/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (response.status !== 204) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        dispatch(deleteClientSuccess(id));
      })
      .catch((error) => {
        dispatch(deleteClientError(error.toString()));
      });
  };
};
