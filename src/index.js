import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './reducers/rootReducer';
import { firebase, config } from './Firestore';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import { BrowserRouter as Router } from 'react-router-dom';

const middlewares = [thunk.withExtraArgument(getFirebase)];

const store = createStore(rootReducer, compose(applyMiddleware(...middlewares)));

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <ReactReduxFirebaseProvider
        firebase={firebase}
        config={config}
        dispatch={store.dispatch}
        createFirestoreInstance={createFirestoreInstance}
      >
        <App />
      </ReactReduxFirebaseProvider>
    </Provider>
  </Router>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
