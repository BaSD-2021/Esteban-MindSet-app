export const GET_PSYCHOLOGIST_FETCHING = 'GET_PSYCHOLOGIST_FETCHING';
export const GET_PSYCHOLOGIST_SUCCESS = 'GET_PSYCHOLOGIST_SUCCESS';
export const GET_PSYCHOLOGIST_ERROR = 'GET_PSYCHOLOGIST_ERROR';

export const GET_PSYCHOLOGIST_BY_ID_FETCHING = 'GET_PSYCHOLOGIST_BY_ID_FETCHING';
export const GET_PSYCHOLOGIST_BY_ID_SUCCESS = 'GET_PSYCHOLOGIST_BY_ID_SUCCESS';
export const GET_PSYCHOLOGIST_BY_ID_ERROR = 'GET_PSYCHOLOGIST_BY_ID_ERROR';

export const CREATE_PSYCHOLOGIST_FETCHING = 'CREATE_PSYCHOLOGIST_FETCHING';
export const CREATE_PSYCHOLOGIST_SUCCESS = 'CREATE_PSYCHOLOGIST_SUCCESS';
export const CREATE_PSYCHOLOGIST_ERROR = 'CREATE_PSYCHOLOGIST_ERROR';

export const UPDATE_PSYCHOLOGIST_FETCHING = 'UPDATE_PSYCHOLOGIST_FETCHING';
export const UPDATE_PSYCHOLOGIST_SUCCESS = 'UPDATE_PSYCHOLOGIST_SUCCESS';
export const UPDATE_PSYCHOLOGIST_ERROR = 'UPDATE_PSYCHOLOGIST_ERROR';

export const DELETE_PSYCHOLOGIST_FETCHING = 'DELETE_PSYCHOLOGIST_FETCHING';
export const DELETE_PSYCHOLOGIST_SUCCESS = 'DELETE_PSYCHOLOGIST_SUCCESS';
export const DELETE_PSYCHOLOGIST_ERROR = 'DELETE_PSYCHOLOGIST_ERROR';

export const CLEAN_ERROR = 'CLEAN_ERROR';

export const getPsychologistFetching = () => {
  return {
    type: GET_PSYCHOLOGIST_FETCHING
  };
};

export const getPsychologistSuccess = (data) => {
  return {
    type: GET_PSYCHOLOGIST_SUCCESS,
    payload: data
  };
};

export const getPsychologistError = (error) => {
  return {
    type: GET_PSYCHOLOGIST_ERROR,
    payload: error
  };
};

export const getPsychologistByIdFetching = () => {
  return {
    type: GET_PSYCHOLOGIST_BY_ID_FETCHING
  };
};

export const getPsychologistByIdSuccess = (data) => {
  return {
    type: GET_PSYCHOLOGIST_BY_ID_SUCCESS,
    payload: data
  };
};

export const getPsychologistByIdError = (error) => {
  return {
    type: GET_PSYCHOLOGIST_BY_ID_ERROR,
    payload: error
  };
};

export const createPsychologistFetching = () => {
  return {
    type: CREATE_PSYCHOLOGIST_FETCHING
  };
};

export const createPsychologistSuccess = (data) => {
  return {
    type: CREATE_PSYCHOLOGIST_SUCCESS,
    payload: data
  };
};

export const createPsychologistError = (error) => {
  return {
    type: CREATE_PSYCHOLOGIST_ERROR,
    payload: error
  };
};

export const updatePsychologistFetching = () => {
  return {
    type: UPDATE_PSYCHOLOGIST_FETCHING
  };
};

export const updatePsychologistSuccess = (data) => {
  return {
    type: UPDATE_PSYCHOLOGIST_SUCCESS,
    payload: data
  };
};

export const updatePsychologistError = (error) => {
  return {
    type: UPDATE_PSYCHOLOGIST_ERROR,
    payload: error
  };
};

export const deletePsychologistFetching = () => {
  return {
    type: DELETE_PSYCHOLOGIST_FETCHING
  };
};

export const deletePsychologistSuccess = (id) => {
  return {
    type: DELETE_PSYCHOLOGIST_SUCCESS,
    payload: id
  };
};

export const deletePsychologistError = (error) => {
  return {
    type: DELETE_PSYCHOLOGIST_ERROR,
    payload: error
  };
};

export const cleanError = () => {
  return {
    type: CLEAN_ERROR
  };
};
