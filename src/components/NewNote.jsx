import React, { Component } from 'react';
import Markdown from 'react-markdown/with-html';
import firebase from 'firebase';
import Editor from './Editor';
import CodeBlock from './CodeBlock';
import db from '../Firestore';

class NewNote extends Component {
  constructor() {
    super();

    this.handleMarkdownChange = this.handleMarkdownChange.bind(this);
    this.state = {
      noteContent: '',
    };
  }

  handleMarkdownChange(evt) {
    this.setState({ noteContent: evt });
  }

  handleSubmit() {
    const { noteContent } = this.state;

    if (noteContent === '') return;

    db.collection('notes')
      .add({
        content: noteContent,
        created: firebase.firestore.Timestamp.fromDate(new Date()),
      })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  }

  render() {
    const { noteContent } = this.state;

    return (
      <div className="new-note-wrapper">
        <div className="note-input">
          <Editor value={noteContent} onChange={this.handleMarkdownChange} />
          <span>
            <button type="submit" onClick={() => this.handleSubmit()}>
              Save Note
            </button>
          </span>
        </div>

        {noteContent !== '' && (
          <div className="note-result">
            <Markdown className="result" source={noteContent} renderers={{ code: CodeBlock }} />
          </div>
        )}
      </div>
    );
  }
}

export default NewNote;
