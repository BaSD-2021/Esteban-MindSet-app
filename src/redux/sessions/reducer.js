import {
  GET_SESSIONS_PENDING,
  GET_SESSIONS_SUCCESS,
  GET_SESSIONS_ERROR,
  GET_SESSION_BY_ID_PENDING,
  GET_SESSION_BY_ID_SUCCESS,
  GET_SESSION_BY_ID_ERROR,
  CREATE_SESSION_PENDING,
  CREATE_SESSION_SUCCESS,
  CREATE_SESSION_ERROR,
  UPDATE_SESSION_PENDING,
  UPDATE_SESSION_SUCCESS,
  UPDATE_SESSION_ERROR,
  DELETE_SESSION_PENDING,
  DELETE_SESSION_SUCCESS,
  DELETE_SESSION_ERROR,
  CLEAN_ERROR
} from './constants';

const initialState = {
  isFetching: false,
  list: [],
  selectedItem: {},
  error: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SESSIONS_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: initialState.error
      };
    }
    case GET_SESSIONS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        list: action.payload
      };
    }
    case GET_SESSIONS_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    }
    case GET_SESSION_BY_ID_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: initialState.error,
        selectedItem: initialState.selectedItem
      };
    }
    case GET_SESSION_BY_ID_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        selectedItem: action.payload
      };
    }
    case GET_SESSION_BY_ID_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    }
    case CREATE_SESSION_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: initialState.error
      };
    }
    case CREATE_SESSION_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        list: [...state.list, action.payload]
      };
    }
    case CREATE_SESSION_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    }
    case UPDATE_SESSION_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: initialState.error
      };
    }
    case UPDATE_SESSION_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        list: state.list.map((item) => {
          if (item._id === action.payload._id) {
            return action.payload;
          }
          return item;
        })
      };
    }
    case UPDATE_SESSION_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    }
    case DELETE_SESSION_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: initialState.error
      };
    }
    case DELETE_SESSION_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        list: state.list.filter((item) => item._id !== action.payload)
      };
    }
    case DELETE_SESSION_ERROR: {
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
    default: {
      return state;
    }
  }
};

export default reducer;
