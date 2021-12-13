import {
  GET_PROFILES_PENDING,
  GET_PROFILES_SUCCESS,
  GET_PROFILES_ERROR,
  GET_PROFILE_BY_ID_PENDING,
  GET_PROFILE_BY_ID_SUCCESS,
  GET_PROFILE_BY_ID_ERROR,
  CREATE_PROFILE_PENDING,
  CREATE_PROFILE_SUCCESS,
  CREATE_PROFILE_ERROR,
  UPDATE_PROFILE_PENDING,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
  DELETE_PROFILE_PENDING,
  DELETE_PROFILE_SUCCESS,
  DELETE_PROFILE_ERROR,
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
    case GET_PROFILES_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: initialState.error
      };
    }
    case GET_PROFILES_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        list: action.payload
      };
    }
    case GET_PROFILES_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    }
    case GET_PROFILE_BY_ID_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: initialState.error,
        selectedItem: initialState.selectedItem
      };
    }
    case GET_PROFILE_BY_ID_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        selectedItem: action.payload
      };
    }
    case GET_PROFILE_BY_ID_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    }
    case CREATE_PROFILE_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: initialState.error
      };
    }
    case CREATE_PROFILE_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        list: [...state.list, action.payload]
      };
    }
    case CREATE_PROFILE_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    }
    case UPDATE_PROFILE_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: initialState.error
      };
    }
    case UPDATE_PROFILE_SUCCESS: {
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
    case UPDATE_PROFILE_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    }
    case DELETE_PROFILE_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: initialState.error
      };
    }
    case DELETE_PROFILE_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        list: state.list.filter((item) => item._id !== action.payload)
      };
    }
    case DELETE_PROFILE_ERROR: {
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
