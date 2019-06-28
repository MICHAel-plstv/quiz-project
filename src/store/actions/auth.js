import axios from 'axios';
import { AUTH_SUCCESS, AUTH_LOGOUT } from './actionTypes';

export function auth(email, password, isLogin) {
  return async dispatch => {
    const authData = {
      email,
      password,
      returnSecureToken: true
    };

    let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDyXEodjwKiy1okAj170IP1fwOv8Xbz2dU`;

    if (isLogin) {
      url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDyXEodjwKiy1okAj170IP1fwOv8Xbz2dU`;
    }

    const response = await axios.post(url, authData);

    const { idToken, expiresIn, localId } = response.data;

    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

    localStorage.setItem('token', idToken);
    localStorage.setItem('userId', localId);
    localStorage.setItem('expirationDate', expirationDate);

    dispatch(authSuccess(idToken));
    dispatch(autoLogout(expiresIn));
  };
}

export function autoLogout(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  };
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');

  return {
    type: AUTH_LOGOUT
  };
}

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token
  };
}
export function autoLogin() {
  return dispatch => {
    const token = localStorage.getItem('token');

    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));

      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(
          autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
  };
}
