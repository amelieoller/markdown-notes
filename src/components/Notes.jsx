import React, { Component } from 'react';
import db from '../Firestore';
import Note from './Note';

class Notes extends Component {
  constructor() {
    super();

    this.state = {
      notes: [],
    };
  }

  componentDidMount = () => {
    const newNotes = [];
    db.collection('notes')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          newNotes.push({ id: doc.id, ...{ ...doc.data() } });
        });
        this.setState({
          notes: newNotes,
        });
      });
  };

  render() {
    const { notes } = this.state;

    return (
      <div className="notes">
        {notes && notes.map(note => <Note key={note.id} note={note} />)}
      </div>
    );
  }
}

export default Notes;
