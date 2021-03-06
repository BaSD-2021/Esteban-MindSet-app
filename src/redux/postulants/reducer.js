import {
  GET_POSTULANTS_FETCHING,
  GET_POSTULANTS_FULFILLED,
  GET_POSTULANTS_REJECTED,
  GET_POSTULANTS_BY_ID_FETCHING,
  GET_POSTULANTS_BY_ID_FULFILLED,
  GET_POSTULANTS_BY_ID_REJECTED,
  ADD_POSTULANTS_FETCHING,
  ADD_POSTULANTS_FULFILLED,
  ADD_POSTULANTS_REJECTED,
  UPDATE_POSTULANTS_FETCHING,
  UPDATE_POSTULANTS_FULFILLED,
  UPDATE_POSTULANTS_REJECTED,
  DELETE_POSTULANTS_FETCHING,
  DELETE_POSTULANTS_FULFILLED,
  DELETE_POSTULANTS_REJECTED,
  SET_PROFILE_POSTULANT_FETCHING,
  SET_PROFILE_POSTULANT_FULFILLED,
  SET_PROFILE_POSTULANT_REJECTED,
  CLEAR_POSTULANT,
  CLEAN_ERROR
} from './constants';

const initialState = {
  isLoading: false,
  list: [],
  selectedPostulant: undefined,
  error: false
};

export const postulantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTULANTS_FETCHING:
    case SET_PROFILE_POSTULANT_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case GET_POSTULANTS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case GET_POSTULANTS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case GET_POSTULANTS_BY_ID_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case GET_POSTULANTS_BY_ID_FULFILLED:
      return {
        ...state,
        isLoading: false,
        selectedPostulant: action.payload
      };
    case GET_POSTULANTS_BY_ID_REJECTED:
    case SET_PROFILE_POSTULANT_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case ADD_POSTULANTS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_POSTULANTS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: [...state.list, action.payload]
      };
    case ADD_POSTULANTS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case UPDATE_POSTULANTS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_POSTULANTS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: state.list.map((item) => {
          if (item._id === action.payload._id) {
            item = action.payload;
          }

          return item;
        })
      };
    case SET_PROFILE_POSTULANT_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: state.list.map((item) =>
          item._id === action.payload[0].postulants ? action.payload : item
        )
      };
    case UPDATE_POSTULANTS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case DELETE_POSTULANTS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_POSTULANTS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        // list: action.payload
        list: state.list.filter((postulant) => postulant._id !== action.payload)
      };
    case DELETE_POSTULANTS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case CLEAR_POSTULANT:
      return {
        ...state,
        selectedPostulant: initialState.selectedPostulant
      };
    case CLEAN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: false
      };
    default:
      return state;
  }
};
