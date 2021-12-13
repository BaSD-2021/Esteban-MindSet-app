import {
  getPositionsPending,
  getPositionsSuccess,
  getPositionsError,
  createPositionPending,
  createPositionSuccess,
  createPositionError,
  updatePositionPending,
  updatePositionSuccess,
  updatePositionError,
  getPositionByIdPending,
  getPositionByIdSuccess,
  getPositionByIdError,
  deletePositionPending,
  deletePositionSuccess,
  deletePositionError
} from './actions';

export const getPositions = () => {
  return (dispatch) => {
    dispatch(getPositionsPending());
    return fetch(`${process.env.REACT_APP_API}/positions`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(getPositionsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getPositionsError(error.toString()));
        console.log(error);
      });
  };
};

export const getPositionById = (id) => {
  return (dispatch) => {
    dispatch(getPositionByIdPending());
    return fetch(`${process.env.REACT_APP_API}/positions?_id=${id}`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(getPositionByIdSuccess(response.data[0]));
        return response.data[0];
      })
      .catch((error) => {
        dispatch(getPositionByIdError(error.toString()));
      });
  };
};

export const createPosition = (values) => {
  return (dispatch) => {
    dispatch(createPositionPending());
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    };
    return fetch(`${process.env.REACT_APP_API}/positions`, options)
      .then((response) => {
        if (response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(createPositionSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(createPositionError(error.toString()));
      });
  };
};

export const updatePosition = (id, values) => {
  return (dispatch) => {
    dispatch(updatePositionPending());
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    };
    return fetch(`${process.env.REACT_APP_API}/positions/${id}`, options)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(updatePositionSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(updatePositionError(error.toString()));
      });
  };
};

export const deletePosition = (id) => {
  return (dispatch) => {
    dispatch(deletePositionPending());
    return fetch(`${process.env.REACT_APP_API}/positions/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (response.status !== 204) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        dispatch(deletePositionSuccess(id));
      })
      .catch((error) => {
        dispatch(deletePositionError(error.toString()));
      });
  };
};
