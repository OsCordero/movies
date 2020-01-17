import dbmovie from '../apis/dbmovie';
import moviesConstants from '../constants/moviesConstants';
export const fetchMovies = () => {
  return async function(dispatch) {
    const response = await dbmovie.get('/movie/popular');
    console.log(response);

    dispatch({ type: moviesConstants.FETCH_SUCCEEDED, payload: response.data });
  };
};
