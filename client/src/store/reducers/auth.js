// our packages
import * as ActionTypes from '../actionTypes';

const getUser = () => {
  const storedUser = localStorage.getItem('user.data');
  // parse use from stored string
  let user;
  try {
    user = JSON.parse(storedUser);
  } catch (e) {
    console.error('Error parsing user data', e);
  }
  return user;
};

const initialState = { token: localStorage.getItem('user.token'),user: JSON.parse(localStorage.getItem('user.data')),};



export const auth = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.INIT_AUTH_SUCCESS:
      return {
        ...action.payload,
      };
    case ActionTypes.REGISTER_SUCCESS:
      return {
        redirectToLogin: true,
      };
    case ActionTypes.LOGIN_SUCCESS:
      localStorage.setItem('user.token', action.payload.token);
      localStorage.setItem('user.data', JSON.stringify(action.payload.user));
      return {
        ...action.payload,
      };
    case ActionTypes.LOGIN_ERROR:
    case ActionTypes.REGISTER_ERROR:
      // TODO: probably necessary in the future
      return state;
    case ActionTypes.DO_LOGOUT:
      localStorage.removeItem('user.token');
      localStorage.removeItem('user.data');
      return {...state, user: null, token: null};
    case ActionTypes.CHANGE_NAV:

      const user= Object.assign({}, {token: state.token}, {user: action.payload.user});
      return{...state, user: action.payload.user}

      case ActionTypes.UPDATE_USER_SUCCESS:
        const local = JSON.parse(localStorage.getItem('user.data'));
        local.login = action.payload.user.login;
        localStorage.setItem('user.data', null);
        localStorage.setItem('user.data',JSON.stringify(local));
      return{...state}
    default:
      return state;
  }
};
