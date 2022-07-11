const initialState = {
  id: null,
  user_name: null,
  first_name: null,
  last_name: null,
  email: null,
  phone_number: null,
  city: null,
  type: null,
  access: null,
  refresh: null,
  isAuthenticated: false,
  expoToken: null,
};

export const LOGIN = 'login';
export const REFRESH = 'refresh';
export const LOG_OUT = 'logout';
export const REGISTER = 'register';
export const SET_TOKEN = 'token';
export const SET_INSCRIPTION = 'inscription';

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    case REFRESH:
      return {
        ...state,
        ...action.payload,
      };
    case REGISTER:
      return {
        ...state,
        ...action.payload,
      };
    case LOG_OUT:
      return {
        ...state,
        id: null,
        user_name: null,
        first_name: null,
        last_name: null,
        email: null,
        phone_number: null,
        city: null,
        type: null,
        access: null,
        refresh: null,
        isAuthenticated: false,
      };
    case SET_TOKEN:
      return {
        ...state,
        ...action.payload,
      };
    case SET_INSCRIPTION:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
