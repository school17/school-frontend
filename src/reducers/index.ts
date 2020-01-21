
import { combineReducers } from 'redux';
import postsReducer from './post-reducers';
import syllabusReducer from './syllabus-reducers';
import syllabusModalReducer from './syllabus-modal-reducers';

const reducers = {
  postStore: postsReducer,
  syllabusStore: syllabusReducer,
  syllabusModalStore: syllabusModalReducer
}

const rootReducer = combineReducers(reducers);
export default rootReducer;