import { combineReducers } from 'redux';
import auth, { LOG_OUT } from './auth';

const appReducer = combineReducers({
  auth,
});

const rootReducer = (state, action) => {
  if (action.type === LOG_OUT) {
    return appReducer(state, action);
  }
};

export default rootReducer;
