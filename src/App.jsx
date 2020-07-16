import React from 'react';
import { ThemeProvider } from 'styled-components/macro';
import { useFirestoreConnect } from 'react-redux-firebase';
import { Switch, Route, Redirect } from 'react-router';

import Navigation from './organisms/Navigation';
import LecturesPage from './pages/LecturesPage';
import InfoPage from './pages/InfoPage';
import NotesPage from './pages/NotesPage';
import { theme } from './theme';
import GlobalStyle from './GlobalStyle';

const App = () => {
  useFirestoreConnect(['tags']);
  useFirestoreConnect(['notes']);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Navigation />
      <Switch>
        <Route path="/notes" component={NotesPage} />
        <Route path="/lectures" component={LecturesPage} />
        <Route path="/info" component={InfoPage} />
        <Redirect to="/notes" />
      </Switch>
    </ThemeProvider>
  );
};

App.propTypes = {};

export default App;
