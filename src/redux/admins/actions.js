export const getAdminsPending = () => {
  return {
    type: 'GET_ADMINS_PENDING'
  };
};

export const getAdminsSuccess = (data) => {
  return {
    type: 'GET_ADMINS_SUCCESS',
    payload: data
  };
};

export const getAdminsError = (error) => {
  return {
    type: 'GET_ADMINS_ERROR',
    payload: error
  };
};

export const deleteAdminPending = () => {
  return {
    type: 'DELETE_ADMIN_PENDING'
  };
};

export const deleteAdminSuccess = (id) => {
  return {
    type: 'DELETE_ADMIN_SUCCESS',
    payload: id
  };
};

export const deleteAdminError = (error) => {
  return {
    type: 'DELETE_ADMIN_ERROR',
    payload: error
  };
};
