import {
  GET_PSYCHOLOGIST_FETCHING,
  GET_PSYCHOLOGIST_SUCCESS,
  GET_PSYCHOLOGIST_ERROR,
  GET_PSYCHOLOGIST_BY_ID_FETCHING,
  GET_PSYCHOLOGIST_BY_ID_SUCCESS,
  GET_PSYCHOLOGIST_BY_ID_ERROR,
  CREATE_PSYCHOLOGIST_FETCHING,
  CREATE_PSYCHOLOGIST_SUCCESS,
  CREATE_PSYCHOLOGIST_ERROR,
  UPDATE_PSYCHOLOGIST_FETCHING,
  UPDATE_PSYCHOLOGIST_SUCCESS,
  UPDATE_PSYCHOLOGIST_ERROR,
  DELETE_PSYCHOLOGIST_FETCHING,
  DELETE_PSYCHOLOGIST_SUCCESS,
  DELETE_PSYCHOLOGIST_ERROR,
  CLEAN_ERROR
} from './actions';

const initialState = {
  isFetching: false,
  list: [],
  selectedItem: {},
  error: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PSYCHOLOGIST_FETCHING: {
      return {
        ...state,
        isFetching: true,
        error: initialState.error
      };
    }
    case GET_PSYCHOLOGIST_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        list: action.payload
      };
    }
    case GET_PSYCHOLOGIST_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    }
    case GET_PSYCHOLOGIST_BY_ID_FETCHING: {
      return {
        ...state,
        isFetching: true,
        error: initialState.error,
        selectedItem: initialState.selectedItem
      };
    }
    case GET_PSYCHOLOGIST_BY_ID_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        selectedItem: action.payload
      };
    }
    case GET_PSYCHOLOGIST_BY_ID_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    }
    case CREATE_PSYCHOLOGIST_FETCHING: {
      return {
        ...state,
        isFetching: true,
        error: initialState.error
      };
    }
    case CREATE_PSYCHOLOGIST_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        list: [...state.list, action.payload]
      };
    }
    case CREATE_PSYCHOLOGIST_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    }
    case UPDATE_PSYCHOLOGIST_FETCHING: {
      return {
        ...state,
        isFetching: true,
        error: initialState.error
      };
    }
    case UPDATE_PSYCHOLOGIST_SUCCESS: {
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
    case UPDATE_PSYCHOLOGIST_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    }
    case DELETE_PSYCHOLOGIST_FETCHING: {
      return {
        ...state,
        isFetching: true,
        error: initialState.error
      };
    }
    case DELETE_PSYCHOLOGIST_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        list: state.list.filter((item) => item._id !== action.payload)
      };
    }
    case DELETE_PSYCHOLOGIST_ERROR: {
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
