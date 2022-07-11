import { combineReducers } from 'redux';
import auth from './auth';

const appReducer = combineReducers({
  auth,
});

const rootReducer = (state, action) => {
  if (action.type === 'logout') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
