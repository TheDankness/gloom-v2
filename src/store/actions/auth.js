import * as actions from './actionTypes';
import axios from 'axios';
import api_key from '../../keys';

export const authInit = () => {
  return {
    type: actions.AUTH_INIT
  }
}

export const authSuccess = (token, userID, expiresOn) => {
  return {
    type: actions.AUTH_SUCCESS,
    token: token,
    userID: userID,
    expiresOn: expiresOn
    /* NEW USER ??? */
    /* Pass to Auth component and redirect accordingly */
  }
}

export const authFail = (err) => {
  return {
    type: actions.AUTH_FAIL,
    error: err
  }
}

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userID');
  localStorage.removeItem('expiresOn');
  localStorage.removeItem('refreshToken');
  return {
    type: actions.LOGOUT
  }
}

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authInit());

    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }

    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + api_key;
    
    if (isSignUp) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + api_key;
    }

    axios.post(url, authData)
      .then(res => {
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('userID', res.data.localId);
        const expiration = new Date(new Date().getTime() + res.data.expiresIn * 1000);
        localStorage.setItem('expiresOn', expiration);
        localStorage.setItem('refreshToken', res.data.refreshToken);

        dispatch(authSuccess(res.data.idToken, res.data.localId, expiration));
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error.message));
      })
  }
}

export const isLoggedIn = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expiresOn = localStorage.getItem('expiresOn');
      if (new Date().getTime() > new Date(expiresOn).getTime()) {
        dispatch(logout());
      } else {
        const userID = localStorage.getItem('userID');
        dispatch(authSuccess(token, userID, expiresOn));
      }
    }
  }
}