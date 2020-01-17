import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './userReducer';
import moviesReducer from './moviesReducer';

export default combineReducers({
  form: formReducer,
  user: userReducer,
  movies: moviesReducer,
});
