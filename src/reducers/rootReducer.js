import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import notesReducer from './notesReducer';
import tagsReducer from './tagsReducer';

const rootReducer = combineReducers({
  notes: notesReducer,
  tags: tagsReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default rootReducer;
