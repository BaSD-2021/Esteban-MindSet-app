import {
  getPsychologistFetching,
  getPsychologistSuccess,
  getPsychologistError,
  createPsychologistFetching,
  createPsychologistSuccess,
  createPsychologistError,
  updatePsychologistFetching,
  updatePsychologistSuccess,
  updatePsychologistError,
  getPsychologistByIdFetching,
  getPsychologistByIdSuccess,
  getPsychologistByIdError,
  deletePsychologistFetching,
  deletePsychologistSuccess,
  deletePsychologistError
} from './actions';

export const getPsychologists = () => {
  return (dispatch) => {
    dispatch(getPsychologistFetching());
    return fetch(`${process.env.REACT_APP_API}/psychologists`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(getPsychologistSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(getPsychologistError(error.toString()));
      });
  };
};

export const getPsychologistById = (id) => {
  return (dispatch) => {
    dispatch(getPsychologistByIdFetching());
    return fetch(`${process.env.REACT_APP_API}/psychologists?_id=${id}`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(getPsychologistByIdSuccess(response.data[0]));
        return response.data[0];
      })
      .catch((error) => {
        dispatch(getPsychologistByIdError(error.toString()));
      });
  };
};

export const createPsychologist = (values) => {
  return (dispatch) => {
    dispatch(createPsychologistFetching());
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    };
    return fetch(`${process.env.REACT_APP_API}/psychologists`, options)
      .then((response) => {
        if (response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(createPsychologistSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(createPsychologistError(error.toString()));
      });
  };
};

export const updatePsychologist = (id, values) => {
  return (dispatch) => {
    dispatch(updatePsychologistFetching());
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    };
    return fetch(`${process.env.REACT_APP_API}/psychologists/${id}`, options)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(updatePsychologistSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(updatePsychologistError(error.toString()));
      });
  };
};

export const deletePsychologist = (id) => {
  return (dispatch) => {
    dispatch(deletePsychologistFetching());
    return fetch(`${process.env.REACT_APP_API}/psychologists/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (response.status !== 204) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        dispatch(deletePsychologistSuccess(id));
      })
      .catch((error) => {
        dispatch(deletePsychologistError(error.toString()));
      });
  };
};
