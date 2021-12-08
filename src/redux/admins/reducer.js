const initialState = {
  isFetching: false,
  list: [],
  error: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ADMINS_PENDING': {
      return {
        ...state,
        isFetching: true,
        error: initialState.error
      };
    }
    case 'GET_ADMINS_SUCCESS': {
      return {
        ...state,
        isFetching: false,
        list: action.payload
      };
    }
    case 'GET_ADMINS_ERROR': {
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    }
    case 'DELETE_ADMIN_PENDING': {
      return {
        ...state,
        isFetching: true,
        error: initialState.error
      };
    }
    case 'DELETE_ADMIN_SUCCESS': {
      return {
        ...state,
        isFetching: false,
        list: state.list.filter((item) => item._id !== action.payload)
      };
    }
    case 'DELETE_ADMIN_ERROR': {
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
