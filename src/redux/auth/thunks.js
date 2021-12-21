import { loginPending, loginSuccess, loginError } from './actions';
import firebase from 'helper/firebase';

export const login = (credentials) => {
  return (dispatch) => {
    dispatch(loginPending());
    return firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(async (response) => {
        const token = await response.user.getIdToken();
        sessionStorage.setItem('token', token);
        return dispatch(loginSuccess());
      })
      .catch((error) => {
        return dispatch(loginError(error.toString()));
      });
  };
};
