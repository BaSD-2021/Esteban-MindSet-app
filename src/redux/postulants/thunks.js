import {
  getPostulantsFetching,
  getPostulantsFulfilled,
  getPostulantsRejected,
  getPostulantByIdFetching,
  getPostulantByIdFulfilled,
  getPostulantByIdRejected,
  addPostulantsFetching,
  addPostulantsFulfilled,
  addPostulantsRejected,
  updatePostulantsFetching,
  updatePostulantsFulfilled,
  updatePostulantsRejected,
  deletePostulantsFetching,
  deletePostulantsFulfilled,
  deletePostulantsRejected
} from './actions';

export const getPostulants = () => {
  return (dispatch) => {
    dispatch(getPostulantsFetching());
    const token = sessionStorage.getItem('token');
    return fetch(`${process.env.REACT_APP_API}/postulants`, { headers: token })
      .then((response) => response.json())
      .then((response) => {
        dispatch(getPostulantsFulfilled(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(getPostulantsRejected(error.toString()));
      });
  };
};

export const getPostulantById = (id) => {
  return (dispatch) => {
    dispatch(getPostulantByIdFetching());
    return fetch(`${process.env.REACT_APP_API}/postulants?_id=${id}`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(getPostulantByIdFulfilled(response.data[0]));
        return response.data[0];
      })
      .catch((error) => {
        dispatch(getPostulantByIdRejected(error.toString()));
      });
  };
};

export const addPostulant = (postulant) => {
  return (dispatch) => {
    dispatch(addPostulantsFetching());

    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postulant),
      method: 'POST'
    };

    const url = `${process.env.REACT_APP_API}/postulants`;

    return fetch(url, options)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(addPostulantsFulfilled(response.data));
        return response.data;
      })
      .catch((err) => {
        dispatch(addPostulantsRejected(err.toString()));
      });
  };
};

export const updatePostulant = (postulantId, postulant) => {
  return (dispatch) => {
    dispatch(updatePostulantsFetching());

    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postulant),
      method: 'PUT'
    };

    const url = `${process.env.REACT_APP_API}/postulants/${postulantId}`;

    return fetch(url, options)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(updatePostulantsFulfilled(response.data));
        dispatch(getPostulantById(postulantId));
        return response.data;
      })
      .catch((err) => {
        dispatch(updatePostulantsRejected(err.toString()));
      });
  };
};

export const deletePostulant = (postulantId) => {
  return (dispatch) => {
    dispatch(deletePostulantsFetching());

    const options = {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    };

    const url = `${process.env.REACT_APP_API}/postulants/${postulantId}`;

    return fetch(url, options)
      .then((response) => {
        if (response.status !== 204) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        dispatch(deletePostulantsFulfilled(postulantId));
      })
      .catch((err) => {
        dispatch(deletePostulantsRejected(err.toString()));
      });
  };
};
