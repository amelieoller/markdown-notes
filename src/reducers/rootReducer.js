import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

import notesReducer from './notesReducer';
import tagsReducer from './tagsReducer';
import currentNote from './currentNote';
import currentLecture from './currentLecture';
import lectureReducer from './lectureReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  notes: notesReducer,
  tags: tagsReducer,
  currentNoteToEdit: currentNote,
  currentLecture: currentLecture,
  lectures: lectureReducer,
  user: userReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default rootReducer;
