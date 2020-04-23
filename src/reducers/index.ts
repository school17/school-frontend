

import { combineReducers } from 'redux';
import postsReducer from './post-reducers';
import syllabusReducer from './syllabus-reducers';
import syllabusModalReducer from './syllabus-modal-reducers';
import addressFromReucer from './addressForm-reducers';
import loginReducer from './login-reducers';
import userDetailsReducer from './user-details-reducers';
import teacherReducer from './teachers-reducers';

const reducers = {
  postStore: postsReducer,
  syllabusStore: syllabusReducer,
  syllabusModalStore: syllabusModalReducer,
  addressFormStore: addressFromReucer,
  loginReducer: loginReducer,
  userDetailsReducer: userDetailsReducer,
  teacherReducer: teacherReducer
}

const rootReducer = combineReducers(reducers);
export default rootReducer;