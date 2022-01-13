import {
  loginPending,
  loginSuccess,
  loginError,
  getMePending,
  getMeSuccess,
  getMeError
} from './actions';
import firebase from 'helper/firebase';

export const login = (credentials) => {
  return (dispatch) => {
    dispatch(loginPending());
    return firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(async (response) => {
        const token = await response.user.getIdToken();
        const {
          claims: { role }
        } = await response.user.getIdTokenResult();
        return dispatch(loginSuccess({ role, token }));
      })
      .catch((error) => {
        return dispatch(loginError(error.toString()));
      });
  };
};

export const getMe = () => {
  return (dispatch) => {
    dispatch(getMePending());
    const token = sessionStorage.getItem('token');
    return fetch(`${process.env.REACT_APP_API}/auth/me`, { headers: { token } })
      .then((response) => response.json())
      .then((response) => {
        dispatch(getMeSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(getMeError(error.toString()));
      });
  };
};
