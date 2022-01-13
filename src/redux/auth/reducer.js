import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  GET_ME_PENDING,
  GET_ME_SUCCESS,
  GET_ME_ERROR,
  CLEAN_ERROR,
  SET_AUTHENTICATION
} from './actions';

const initialState = {
  isFetching: true,
  authenticated: undefined,
  user: undefined,
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
    case GET_ME_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: initialState.error
      };
    }
    case GET_ME_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        user: action.payload
      };
    }
    case GET_ME_ERROR: {
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
