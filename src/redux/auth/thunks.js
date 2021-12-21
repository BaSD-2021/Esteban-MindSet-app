import { loginPending, loginSuccess, loginError } from './actions';

export const login = (credentials) => {
  return (dispatch) => {
    dispatch(loginPending());
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    };
    return fetch(`${process.env.REACT_APP_API}/auth/login`, options)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        sessionStorage.setItem('token', response.data.token);
        dispatch(loginSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(loginError(error.toString()));
      });
  };
};
