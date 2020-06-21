import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

import notesReducer from './notesReducer';
import tagsReducer from './tagsReducer';
import currentNote from './currentNote';
import lectureReducer from './lectureReducer';

const rootReducer = combineReducers({
  notes: notesReducer,
  tags: tagsReducer,
  currentNote: currentNote,
  lectures: lectureReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default rootReducer;
