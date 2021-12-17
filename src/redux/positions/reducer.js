import {
  GET_POSITIONS_PENDING,
  GET_POSITIONS_SUCCESS,
  GET_POSITIONS_ERROR,
  GET_POSITION_BY_ID_PENDING,
  GET_POSITION_BY_ID_SUCCESS,
  GET_POSITION_BY_ID_ERROR,
  CREATE_POSITION_PENDING,
  CREATE_POSITION_SUCCESS,
  CREATE_POSITION_ERROR,
  UPDATE_POSITION_PENDING,
  UPDATE_POSITION_SUCCESS,
  UPDATE_POSITION_ERROR,
  DELETE_POSITION_PENDING,
  DELETE_POSITION_SUCCESS,
  DELETE_POSITION_ERROR,
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
    case GET_POSITIONS_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: initialState.error
      };
    }
    case GET_POSITIONS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        list: action.payload
      };
    }
    case GET_POSITIONS_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    }
    case GET_POSITION_BY_ID_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: initialState.error,
        selectedItem: initialState.selectedItem
      };
    }
    case GET_POSITION_BY_ID_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        selectedItem: action.payload
      };
    }
    case GET_POSITION_BY_ID_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    }
    case CREATE_POSITION_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: initialState.error
      };
    }
    case CREATE_POSITION_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        list: [...state.list, action.payload]
      };
    }
    case CREATE_POSITION_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    }
    case UPDATE_POSITION_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: initialState.error
      };
    }
    case UPDATE_POSITION_SUCCESS: {
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
    case UPDATE_POSITION_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    }
    case DELETE_POSITION_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: initialState.error
      };
    }
    case DELETE_POSITION_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        list: state.list.filter((item) => item._id !== action.payload)
      };
    }
    case DELETE_POSITION_ERROR: {
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
