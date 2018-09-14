import * as actions from '../actions/actionTypes';

const initialState = {
  token: null,
  userID: null,
  loading: false,
  success: false,
  expiresOn: null,
  error: null
};

const authInit = (state) => {
  return {
    ...state,
    loading: true,
    error: null
  }
}

const authSuccess = (state, action) => {
  return {
    ...state,
    token: action.token,
    userID: action.userID,
    expiresOn: action.expiresOn,
    loading: false,
    success: true
  }
}

const authFail = (state, action) => {
  return {
    ...state,
    loading: false,
    success: false,
    error: action.error
  }
}

const logout = state => {
  return {
    ...state,
    token: null,
    userID: null,
    expiresOn: null
  }
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actions.AUTH_INIT:
      return authInit(state);
    case actions.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actions.AUTH_FAIL:
      return authFail(state, action);
    case actions.LOGOUT:
      return logout(state);
    default:
      return state;
  }
};

export default reducer;
