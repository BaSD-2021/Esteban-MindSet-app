import {
  getInterviewsPending,
  getInterviewsSuccess,
  getInterviewsError,
  createInterviewPending,
  createInterviewSuccess,
  createInterviewError,
  updateInterviewPending,
  updateInterviewSuccess,
  updateInterviewError,
  getInterviewByIdPending,
  getInterviewByIdSuccess,
  getInterviewByIdError,
  deleteInterviewPending,
  deleteInterviewSuccess,
  deleteInterviewError
} from './actions';

// Async Actions definition
export const getInterviews = () => {
  return (dispatch) => {
    // Dispatch (execute) the redux action to indicate the request will start
    dispatch(getInterviewsPending());
    // Make the backend request
    return fetch(`${process.env.REACT_APP_API}/interviews`)
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
        dispatch(getInterviewsSuccess(response.data));
      })
      .catch((error) => {
        // Dispatch (execute) the redux action to save the error in Redux
        // Remember always save an string, it is guaranteed using "error.toString()"
        dispatch(getInterviewsError(error.toString()));
      });
  };
};

// See the comments above for reference.
// On this case, we are passing an "id" params to send it to the backend
export const getInterviewById = (id) => {
  return (dispatch) => {
    dispatch(getInterviewByIdPending());
    return fetch(`${process.env.REACT_APP_API}/interview?_id=${id}`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(getInterviewByIdSuccess(response.data[0]));
        // it is necessary to return the response to get it on the ".then" in
        // the component when the action is dispatched
        return response.data[0];
      })
      .catch((error) => {
        dispatch(getInterviewByIdError(error.toString()));
      });
  };
};

export const createInterview = (values) => {
  return (dispatch) => {
    dispatch(createInterviewPending());
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    };
    return fetch(`${process.env.REACT_APP_API}/interview`, options)
      .then((response) => {
        if (response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(createInterviewSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(createInterviewError(error.toString()));
      });
  };
};

export const updateInterview = (id, values) => {
  return (dispatch) => {
    dispatch(updateInterviewPending());
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    };
    return fetch(`${process.env.REACT_APP_API}/interviews/${id}`, options)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(updateInterviewSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(updateInterviewError(error.toString()));
      });
  };
};

export const deleteInterview = (id) => {
  return (dispatch) => {
    dispatch(deleteInterviewPending());
    return fetch(`${process.env.REACT_APP_API}/interviews/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (response.status !== 204) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        dispatch(deleteInterviewSuccess(id));
      })
      .catch((error) => {
        dispatch(deleteInterviewError(error.toString()));
      });
  };
};
