export const GET_ADMINS_PENDING = 'GET_ADMINS_PENDING';
export const GET_ADMINS_SUCCESS = 'GET_ADMINS_SUCCESS';
export const GET_ADMINS_ERROR = 'GET_ADMINS_ERROR';

export const GET_ADMIN_BY_ID_PENDING = 'GET_ADMIN_BY_ID_PENDING';
export const GET_ADMIN_BY_ID_SUCCESS = 'GET_ADMIN_BY_ID_SUCCESS';
export const GET_ADMIN_BY_ID_ERROR = 'GET_ADMIN_BY_ID_ERROR';

export const CREATE_ADMIN_PENDING = 'CREATE_ADMIN_PENDING';
export const CREATE_ADMIN_SUCCESS = 'CREATE_ADMIN_SUCCESS';
export const CREATE_ADMIN_ERROR = 'CREATE_ADMIN_ERROR';

export const UPDATE_ADMIN_PENDING = 'UPDATE_ADMIN_PENDING';
export const UPDATE_ADMIN_SUCCESS = 'UPDATE_ADMIN_SUCCESS';
export const UPDATE_ADMIN_ERROR = 'UPDATE_ADMIN_ERROR';

export const DELETE_ADMIN_PENDING = 'DELETE_ADMIN_PENDING';
export const DELETE_ADMIN_SUCCESS = 'DELETE_ADMIN_SUCCESS';
export const DELETE_ADMIN_ERROR = 'DELETE_ADMIN_ERROR';

export const CLEAN_ERROR = 'CLEAN_ERROR';

export const CLEAN_SELECTED_ADMIN = 'CLEAN_SELECTED_ADMIN';

export const getAdminsPending = () => {
  return {
    type: GET_ADMINS_PENDING
  };
};

export const getAdminsSuccess = (data) => {
  return {
    type: GET_ADMINS_SUCCESS,
    payload: data
  };
};

export const getAdminsError = (error) => {
  return {
    type: GET_ADMINS_ERROR,
    payload: error
  };
};

export const getAdminByIdPending = () => {
  return {
    type: GET_ADMIN_BY_ID_PENDING
  };
};

export const getAdminByIdSuccess = (data) => {
  return {
    type: GET_ADMIN_BY_ID_SUCCESS,
    payload: data
  };
};

export const getAdminByIdError = (error) => {
  return {
    type: GET_ADMIN_BY_ID_ERROR,
    payload: error
  };
};

export const createAdminPending = () => {
  return {
    type: CREATE_ADMIN_PENDING
  };
};

export const createAdminSuccess = (data) => {
  return {
    type: CREATE_ADMIN_SUCCESS,
    payload: data
  };
};

export const createAdminError = (error) => {
  return {
    type: CREATE_ADMIN_ERROR,
    payload: error
  };
};

export const updateAdminPending = () => {
  return {
    type: UPDATE_ADMIN_PENDING
  };
};

export const updateAdminSuccess = (data) => {
  return {
    type: UPDATE_ADMIN_SUCCESS,
    payload: data
  };
};

export const updateAdminError = (error) => {
  return {
    type: UPDATE_ADMIN_ERROR,
    payload: error
  };
};

export const deleteAdminPending = () => {
  return {
    type: DELETE_ADMIN_PENDING
  };
};

export const deleteAdminSuccess = (id) => {
  return {
    type: DELETE_ADMIN_SUCCESS,
    payload: id
  };
};

export const deleteAdminError = (error) => {
  return {
    type: DELETE_ADMIN_ERROR,
    payload: error
  };
};

export const cleanError = () => {
  return {
    type: CLEAN_ERROR
  };
};

export const cleanSelectedAdmin = () => {
  return {
    type: CLEAN_SELECTED_ADMIN
  };
};
