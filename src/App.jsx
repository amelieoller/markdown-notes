import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import './App.css';
import Search from './components/Search';
import CreateNote from './components/CreateNote';
import Tags from './components/Tags';
import Notes from './components/Notes';
import { createNote, updateNote } from './actions/noteActions';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      tagIds: [],
      edit: false,
      tagFilter: [],
    };
  }

  setTagFilter = (tagId) => {
    const { tagFilter } = this.state;

    if (tagFilter.includes(tagId)) {
      this.setState({
        tagFilter: tagFilter.filter(tag => tag !== tagId),
      });
    } else {
      this.setState({
        tagFilter: [...tagFilter, tagId],
      });
    }
  };

  setEditNote = (note) => {
    const { content, tagIds, id } = note;
    this.setState({
      content,
      tagIds,
      id,
      edit: true,
    });
  };

  handleNoteChange = (e) => {
    this.setState({ content: e.target.value });
  };

  addTag = (id) => {
    const { tagIds } = this.state;

    if (tagIds.includes(id)) {
      this.setState({
        tagIds: tagIds.filter(tag => tag !== id),
      });
    } else {
      this.setState({
        tagIds: [...tagIds, id],
      });
    }
  };

  handleNoteClear = () => {
    this.setState({ content: '', tagIds: [], edit: false });
  };

  handleNoteSubmit = () => {
    const {
      edit, content, tagIds, id,
    } = this.state;

    if (content === '') return;

    const note = {
      content,
      updated: firebase.firestore.FieldValue.serverTimestamp(),
      tagIds,
    };

    if (edit) {
      note.id = id;
      this.props.updateNote(note);
    } else {
      note.created = firebase.firestore.FieldValue.serverTimestamp();
      this.props.createNote(note);
    }

    this.handleNoteClear();
  };

  render() {
    const { tagFilter } = this.state;
    const { tags } = this.props;

    return (
      <div className="app-wrapper">
        <Search />
        <Tags setTagFilter={this.setTagFilter} filteredTags={tagFilter} />
        <CreateNote
          editNote={this.state}
          addTag={this.addTag}
          handleNoteChange={this.handleNoteChange}
          handleNoteSubmit={this.handleNoteSubmit}
          handleNoteClear={this.handleNoteClear}
          tags={tags}
        />
        <Notes setEditNote={this.setEditNote} tagFilter={tagFilter} />
      </div>
    );
  }
}

App.propTypes = {
  createNote: PropTypes.func.isRequired,
  updateNote: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  createNote: note => dispatch(createNote(note)),
  updateNote: note => dispatch(updateNote(note)),
});

const mapStateToProps = state => ({
  tags: state.firestore.ordered.tags,
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  firestoreConnect([{ collection: 'tags' }]),
)(App);
