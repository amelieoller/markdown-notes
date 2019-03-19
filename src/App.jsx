import React from 'react';
import Markdown from 'react-markdown/with-html';
import firebase from 'firebase';
import Editor from './components/Editor';
import CodeBlock from './components/CodeBlock';
import db from './Firestore';
import Notes from './components/Notes';
import './App.css';

class App extends React.PureComponent {
  constructor(props) {
    super(props);

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
      <div className="demo">
        <div className="editor-wrapper">
          <div className="editor-pane">
            <Editor
              value={noteContent}
              onChange={this.handleMarkdownChange}
            />
            <button type="submit" onClick={() => this.handleSubmit()}>Save Note</button>
          </div>

          <div className="result-pane">
            <Markdown
              className="result"
              source={noteContent}
              renderers={{ code: CodeBlock }}
            />
          </div>
        </div>
        <Notes />
      </div>
    );
  }
}

export default App;
