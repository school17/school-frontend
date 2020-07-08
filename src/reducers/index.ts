import { gradeDashboardActions } from './../actions/grade-dashboard-actions';


import { combineReducers } from 'redux';
import postsReducer from './post-reducers';
import syllabusReducer from './syllabus-reducers';
import syllabusModalReducer from './syllabus-modal-reducers';
import addressFromReucer from './addressForm-reducers';
import loginReducer from './login-reducers';
import userDetailsReducer from './user-details-reducers';
import teacherReducer from './teachers-reducers';
import classReducer from './class-reducers';
import studentReducer from './students-reducers';
import attendanceReducer from "./attendance-reducers";
import loggedinUserReducer from "./loggedin-user-detail-reducer";
import notificationReducer from "./notification-reducers";
import gradeDashboardReducer from "./grade-dashboard-reducer";
import testReducer from "./test-reducers";

const reducers = {
  postStore: postsReducer,
  syllabusStore: syllabusReducer,
  syllabusModalStore: syllabusModalReducer,
  addressFormStore: addressFromReucer,
  loginReducer: loginReducer,
  userDetailsReducer: userDetailsReducer,
  teacherReducer: teacherReducer,
  classReducer: classReducer,
  studentReducer: studentReducer,
  attendanceReducer: attendanceReducer,
  loggedinUserReducer:loggedinUserReducer,
  notificationReducer:notificationReducer,
  gradeDashboardReducer:gradeDashboardReducer,
  testReducer:testReducer
}

const rootReducer = combineReducers(reducers);
export default rootReducer;