import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import Search from '../../components/Search';
import NoteEditor from '../../organisms/NoteEditor.js';
import LectureSidebar from '../../organisms/LectureSidebar/LectureSidebar';
import { deleteNote, updateNote } from '../../actions/noteActions';
import SidebarsMainTemplate from '../../templates/SidebarsMainTemplate';
import { ReactComponent as Book } from '../../assets/icons/book.svg';
import { ReactComponent as Link } from '../../assets/icons/link.svg';
import IconButton from '../../atoms/IconButton/IconButton';
import { ReactComponent as Plus } from '../../assets/icons/plus.svg';
import Filter from '../../organisms/Filter/Filter';

const filterBy = (notes, filterArr) =>
  filterArr.length !== 0 ? notes.filter((note) => filterArr.includes(note.id)) : notes;

const sortAndFilter = (notes, filteredNoteIds, filteredTagIds) => {
  return filterBy(notes, filteredNoteIds)
    .filter((note) => filteredTagIds.every((tagId) => note.tagIds.includes(tagId)))
    .sort(
      (a, b) =>
        (b.updated ? b.updated.toDate() : new Date()) -
        (a.updated ? a.updated.toDate() : new Date()),
    );
};

const NotesPage = () => {
  const currentUser = useSelector((state) => state.firebase.auth);

  useFirestoreConnect([
    {
      collection: 'tags',
      where: [['userId', '==', currentUser.uid]],
    },
  ]);

  useFirestoreConnect([
    {
      collection: 'notes',
      where: [['userId', '==', currentUser.uid]],
    },
  ]);

  const dispatch = useDispatch();

  const notes = useSelector((state) => state.firestore.ordered.notes);
  const { currentNoteToEdit } = useSelector((state) => state);

  const [selectedNote, setSelectedNote] = useState(null);
  const [linkedNotes, setLinkedNotes] = useState([]);

  const [filteredTagIds, setFilteredTagIds] = useState([]);
  const [filteredNoteIds, setFilteredNoteIds] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    if (notes) {
      setFilteredNotes(notes);
    }
  }, [notes]);

  useEffect(() => {
    if (currentNoteToEdit.title) {
      setSelectedNote({ ...currentNoteToEdit });
    }
  }, [currentNoteToEdit]);

  useEffect(() => {
    if (!currentNoteToEdit.id) {
      setLinkedNotes([]);

      return;
    }

    if (selectedNote && notes) {
      const connectedNotes = selectedNote.noteLinkIds
        .map((noteId) => notes.find((note) => note.id === noteId))
        .filter((note) => !!note);

      setLinkedNotes(connectedNotes);
    }
  }, [currentNoteToEdit, selectedNote]);

  const handleAddNoteClick = () => {
    dispatch({ type: 'CLEAR_CURRENT_NOTE' });
  };

  const handleEditLectureClick = () => {
    dispatch({ type: 'SET_CURRENT_NOTE', note: selectedNote });
  };

  const handleDeleteNoteLink = (noteId) => {
    const newNoteIds = selectedNote.noteLinkIds.filter((id) => id !== noteId);

    dispatch(updateNote({ id: selectedNote.id, noteLinkIds: newNoteIds }));
  };

  const handleTopicClick = (note) => {
    dispatch({ type: 'SET_CURRENT_NOTE', note });
  };

  const handleNoteClick = (note) => {
    dispatch({ type: 'SET_CURRENT_NOTE', note });
  };

  const getNotesIds = (foundItems) => {
    const newFiltered = foundItems.map((item) => notes.find((i) => i.id === item.id));

    setFilteredNotes(newFiltered);
  };

  const resetNotes = () => {
    setFilteredNotes(notes);
  };

  const handleDeleteNote = (noteId) => {
    dispatch(deleteNote(noteId));
    dispatch({ type: 'CLEAR_CURRENT_NOTE' });
  };

  const filterTags = (tagId) => {
    if (tagId === 'filter') {
      resetNotes();
    } else {
      const newFiltered = notes.filter((n) => n.tagIds.includes(tagId));

      setFilteredNotes(newFiltered);
    }
  };

  return (
    <SidebarsMainTemplate>
      <LectureSidebar
        items={notes && sortAndFilter(filteredNotes, filteredNoteIds, filteredTagIds)}
        handleAddClick={handleAddNoteClick}
        handleItemClick={handleNoteClick}
        currentActiveItem={currentNoteToEdit}
        buttonText="Add Lecture"
        dark
        isOpen={true}
      >
        <div>
          <span>
            <Book />
            <h1>Notes</h1>
          </span>
          <IconButton onClick={handleAddNoteClick} color="onSurface" hoverColor="onSurfacePrimary">
            <Plus />
          </IconButton>
        </div>
        <Search
          setSearchResultNotes={getNotesIds}
          placeholderText="Search"
          clearSearch={resetNotes}
        />
        <Filter filterTags={filterTags} />
      </LectureSidebar>

      <LectureSidebar
        items={linkedNotes}
        handleItemClick={handleTopicClick}
        handleDeleteItem={handleDeleteNoteLink}
        buttonText="Edit Lecture"
        showButton={selectedNote}
        isOpen={false}
        deleteIcon
      >
        <div>
          <span>
            <Link />
            <h1>Linked Notes</h1>
          </span>
        </div>
      </LectureSidebar>

      <NoteEditor
        currentNoteToEdit={currentNoteToEdit}
        linkedNotes={linkedNotes}
        handleDelete={handleDeleteNote}
      />
    </SidebarsMainTemplate>
  );
};

NotesPage.propTypes = {};

export default NotesPage;
