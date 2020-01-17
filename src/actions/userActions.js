import userConstants from '../constants/userConstants';
import reqres from '../apis/reqres';
import { history } from './../helpers/history';

export const login = (email, password) => async dispatch => {
  dispatch({ type: userConstants.LOGIN_REQUEST });

  try {
    const response = await reqres.post('/login', { email, password });
    dispatch({ type: userConstants.LOGIN_SUCCEEDED, payload: response.data });
    localStorage.setItem('authToken', JSON.stringify(response.data.token));
    history.push('/');
  } catch (err) {
    dispatch({ type: userConstants.LOGIN_FAILED });
  }
};

export const logout = () => async dispatch => {
  localStorage.removeItem('authToken');
  window.location.reload();
  dispatch({ type: userConstants.LOGOUT });
};

export const register = (email, password) => async dispatch => {
  dispatch({ type: userConstants.REGISTER_REQUEST });

  try {
    const response = await reqres.post('/register', { email, password });

    dispatch({ type: userConstants.REGISTER_SUCCEEDED, payload: response.data });
    history.push('/login');
  } catch (err) {
    dispatch({ type: userConstants.REGISTER_FAILED });
  }
};
