import { combineReducers } from 'redux';
import qiuzReducer from './quiz';
import createReducer from './createQuiz';
import authReducer from './auth';

export default combineReducers({
  quiz: qiuzReducer,
  create: createReducer,
  auth: authReducer
});
