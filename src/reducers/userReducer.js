import userConstants from '../constants/userConstants';

const initState = { isLoading: false, user: {}, userError: false };

export default (state = initState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return { ...state, isLoading: true };
    case userConstants.LOGIN_SUCCEEDED:
      return { ...state, isLoading: false, userError: false, user: action.payload };
    case userConstants.LOGIN_FAILED:
      return { ...state, isLoading: false, userError: true };
    case userConstants.REGISTER_REQUEST:
      return { ...state, isLoading: true };
    case userConstants.REGISTER_SUCCEEDED:
      return { ...state, isLoading: false, userError: false };
    case userConstants.REGISTER_FAILED:
      return { ...state, isLoading: false, userError: true };
    case userConstants.LOGOUT:
      return { ...state, initState };
    default:
      return state;
  }
};
