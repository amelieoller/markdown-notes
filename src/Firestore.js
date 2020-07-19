import firebase from 'firebase/app';
import 'firebase/firestore';
import { actionTypes } from 'redux-firestore';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: 'amelie-notes',
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  onAuthStateChanged: (authData, firebase, dispatch) => {
    // Clear redux-firestore state if auth does not exist (i.e logout)
    if (!authData) {
      dispatch({ type: actionTypes.CLEAR_DATA });
    }
  },
};

firebase.initializeApp(config);
firebase.firestore();

export { firebase, config };
