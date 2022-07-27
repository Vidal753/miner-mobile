import { combineReducers } from 'redux';
import auth from './auth';
import rastra from './rastra';

const appReducer = combineReducers({
  auth,
  rastra,
});

const rootReducer = (state, action) => {
  if (action.type === 'logout') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
