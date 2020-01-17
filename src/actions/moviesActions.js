import dbmovie from '../apis/dbmovie';
import moviesConstants from '../constants/moviesConstants';

export const fetchMovies = () => async dispatch => {
  dispatch({ type: moviesConstants.FETCH_REQUEST });
  const response = await dbmovie.get('/movie/popular');
  dispatch({ type: moviesConstants.FETCH_SUCCEEDED, payload: response.data.results });
};
