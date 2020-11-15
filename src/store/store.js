import { combineReducers, createStore } from 'redux';
import appReducer from './appReducer';
import loginReducer from './loginReducer';
import homeReducer from './homeReducer';

export default createStore(
  combineReducers({
    general: appReducer,
    login: loginReducer,
    home: homeReducer,
  })
);
