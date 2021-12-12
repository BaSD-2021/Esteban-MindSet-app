import {
  getPostulantsFetching,
  getPostulantsFulfilled,
  getPostulantsRejected
  // getPostulantsByIdFetching,
  // getPostulantsByIdFulfilled,
  // getPostulantsByIdRejected,
  // addPostulantsFetching,
  // addPostulantsFulfilled,
  // addPostulantsRejected,
  // updatePostulantsFetching,
  // updatePostulantsFulfilled,
  // updatePostulantsRejected,
  // deletePostulantsFetching,
  // deletePostulantsFulfilled,
  // deletePostulantsRejected,
  // clearError
} from './actions';

// const URL = `${process.env.REACT_APP_API}/postulants`;

export const getPostulants = () => {
  return (dispatch) => {
    dispatch(getPostulantsFetching());
    fetch(`${process.env.REACT_APP_API}/postulants`)
      .then((response) => response.json())
      .then((response) => {
        dispatch(getPostulantsFulfilled(response.data));
      })
      .catch((error) => {
        dispatch(getPostulantsRejected(error.toString()));
      });
  };
};

// export const getPostulantById = (id) => {
//   return (dispatch) => {
//     dispatch()
//   }

// }

// // VER IMPORTS DE DISPATCHER EN CONTROLES/POSTULANTS
// VER GETPOSTULATSBYID
