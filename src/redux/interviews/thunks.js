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
    dispatch(getInterviewsPending());
    const token = sessionStorage.getItem('token');
    return fetch(`${process.env.REACT_APP_API}/interviews`, { headers: { token } })
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(getInterviewsSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(getInterviewsError(error.toString()));
      });
  };
};

export const getInterviewById = (id) => {
  return (dispatch) => {
    dispatch(getInterviewByIdPending());
    return fetch(`${process.env.REACT_APP_API}/interviews?_id=${id}`)
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
        return response.data[0];
      })
      .catch((error) => {
        dispatch(getInterviewByIdError(error.toString()));
      });
  };
};

export const createInterview = (interview) => {
  return (dispatch) => {
    dispatch(createInterviewPending());
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(interview)
    };
    return fetch(`${process.env.REACT_APP_API}/interviews`, options)
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

export const updateInterview = (id, interview) => {
  return (dispatch) => {
    dispatch(updateInterviewPending());
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(interview)
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
        dispatch(getInterviews());
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
