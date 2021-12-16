import {
  GET_INTERVIEWS_PENDING,
  GET_INTERVIEWS_SUCCESS,
  GET_INTERVIEWS_ERROR,
  GET_INTERVIEW_BY_ID_PENDING,
  GET_INTERVIEW_BY_ID_SUCCESS,
  GET_INTERVIEW_BY_ID_ERROR,
  CREATE_INTERVIEW_PENDING,
  CREATE_INTERVIEW_SUCCESS,
  CREATE_INTERVIEW_ERROR,
  UPDATE_INTERVIEW_PENDING,
  UPDATE_INTERVIEW_SUCCESS,
  UPDATE_INTERVIEW_ERROR,
  DELETE_INTERVIEW_PENDING,
  DELETE_INTERVIEW_SUCCESS,
  DELETE_INTERVIEW_ERROR,
  CLEAN_ERROR,
  CLEAN_SELECTED_ITEM
} from './constants';

const initialState = {
  isFetching: false,
  list: [],
  selectedItem: {},
  error: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INTERVIEWS_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: initialState.error
      };
    }
    case GET_INTERVIEWS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        list: action.payload
      };
    }
    case GET_INTERVIEWS_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    }
    case GET_INTERVIEW_BY_ID_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: initialState.error,
        selectedItem: initialState.selectedItem
      };
    }
    case GET_INTERVIEW_BY_ID_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        selectedItem: action.payload
      };
    }
    case GET_INTERVIEW_BY_ID_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    }
    case CREATE_INTERVIEW_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: initialState.error
      };
    }
    case CREATE_INTERVIEW_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        list: [...state.list, action.payload]
      };
    }
    case CREATE_INTERVIEW_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    }
    case UPDATE_INTERVIEW_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: initialState.error
      };
    }
    case UPDATE_INTERVIEW_SUCCESS: {
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
    case UPDATE_INTERVIEW_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    }
    case DELETE_INTERVIEW_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: initialState.error
      };
    }
    case DELETE_INTERVIEW_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        list: state.list.filter((item) => item._id !== action.payload)
      };
    }
    case DELETE_INTERVIEW_ERROR: {
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
    case CLEAN_SELECTED_ITEM: {
      return {
        ...state,
        selectedItem: initialState.selectedItem
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
