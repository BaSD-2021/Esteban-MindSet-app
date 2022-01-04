import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  CLEAN_ERROR,
  SET_AUTHENTICATION
} from './actions';

const initialState = {
  isLoading: true,
  authenticated: undefined,
  error: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: initialState.error
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        authenticated: action.payload
      };
    }
    case LOGIN_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    }
    case CLEAN_ERROR: {
      return {
        ...state,
        error: initialState.error
      };
    }
    case SET_AUTHENTICATION: {
      return {
        ...state,
        authenticated: action.payload,
        isFetching: false
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
