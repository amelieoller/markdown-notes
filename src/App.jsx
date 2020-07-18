import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components/macro';
import { Switch, Route, Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import Navigation from './organisms/Navigation';
import LecturesPage from './pages/LecturesPage';
import InfoPage from './pages/InfoPage';
import NotesPage from './pages/NotesPage';
import { theme } from './theme';
import GlobalStyle from './GlobalStyle';
import LoginPage from './pages/LoginPage';
import { createUser } from './actions/userActions';
import { config } from './Firestore';

const App = () => {
  const { user } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    const userStr = window.sessionStorage.getItem(`firebase:authUser:${config.apiKey}:[DEFAULT]`);

    if (userStr) {
      const user = JSON.parse(userStr);

      dispatch(
        createUser({
          email: user.email,
          id: user.uid,
          photo: user.photoURL,
          displayName: user.displayName,
        }),
      );
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {user.id && <Navigation />}

      {user.id ? (
        <Switch>
          <Route path="/notes" component={NotesPage} />
          <Route path="/lectures" component={LecturesPage} />
          <Route path="/info" component={InfoPage} />
          <Redirect to="/notes" />
        </Switch>
      ) : (
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Redirect to="/login" />
        </Switch>
      )}
    </ThemeProvider>
  );
};

App.propTypes = {};

export default App;
