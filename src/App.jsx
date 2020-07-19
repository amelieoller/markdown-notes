import React from 'react';
import { ThemeProvider } from 'styled-components/macro';
import { Switch, Route, Redirect } from 'react-router';
import { useSelector } from 'react-redux';

import Navigation from './organisms/Navigation';
import LecturesPage from './pages/LecturesPage';
import InfoPage from './pages/InfoPage';
import NotesPage from './pages/NotesPage';
import { theme } from './theme';
import GlobalStyle from './GlobalStyle';
import LoginPage from './pages/LoginPage';

const App = () => {
  const { auth } = useSelector((state) => state.firebase);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {auth.isLoaded ? (
        <>
          {auth.uid && <Navigation />}

          {auth.uid ? (
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
        </>
      ) : (
        <div>loading....</div>
      )}
    </ThemeProvider>
  );
};

App.propTypes = {};

export default App;
