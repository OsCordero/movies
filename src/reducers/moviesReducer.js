import moviesConstants from '../constants/moviesConstants';

const initState = { isLoading: false, moviesList: [], moviesError: false };

export default (state = initState, action) => {
  switch (action.type) {
    case moviesConstants.FETCH_REQUEST:
      return { ...state, isLoading: true };
    case moviesConstants.FETCH_SUCCEEDED:
      return { ...state, isLoading: false, moviesError: false, moviesList: action.payload };
    case moviesConstants.FETCH_FAILED:
      return { ...state, isLoading: false, moviesError: true };
    default:
      return state;
  }
};
