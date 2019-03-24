import React from 'react';
import Notes from './components/Notes';
import Tags from './components/Tags';
import Search from './components/Search';
import NewNote from './components/NewNote';
import './App.css';

const App = () => (
  <div className="app-wrapper">
    <Search />
    <Tags />
    <NewNote />
    <Notes />
  </div>
);

export default App;
