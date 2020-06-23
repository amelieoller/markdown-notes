import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import Search from '../../components/Search';
import NoteEditor from '../../components/NoteEditor';
import Tags from '../../components/Tags';
import LectureSidebar from '../../organisms/LectureSidebar/LectureSidebar';
import { deleteNote } from '../../actions/noteActions';
import SidebarsMainTemplate from '../../templates/SidebarsMainTemplate';
import Note from '../../organisms/Note';
import { ReactComponent as Book } from '../../assets/icons/book.svg';
import { ReactComponent as GrauationCap } from '../../assets/icons/graduation-cap.svg';
import { ReactComponent as Link } from '../../assets/icons/link.svg';
import IconButton from '../../atoms/IconButton/IconButton';
import { ReactComponent as Plus } from '../../assets/icons/plus.svg';

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
  useFirestoreConnect(['lectures']);

  const dispatch = useDispatch();

  const notes = useSelector((state) => state.firestore.ordered.notes);
  const { currentNote } = useSelector((state) => state);

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

  const resetLecture = () => {
    setLinkedNotes([]);
    setSelectedNote(null);
  };

  useEffect(() => {
    if (currentNote.title) {
      setSelectedNote({ tagIds: [], noteLinkIds: [], ...currentNote });
    }
  }, [currentNote]);

  useEffect(() => {
    if (selectedNote && notes) {
      const connectedNotes = selectedNote.noteLinkIds.map((noteId) =>
        notes.find((note) => note.id === noteId),
      );

      setLinkedNotes(connectedNotes);
    }
  }, [selectedNote]);

  const handleAddLectureClick = () => {};

  const handleEditLectureClick = () => {};

  const handleDeleteNote = (noteId) => {
    dispatch(deleteNote(noteId));
    resetLecture();
  };

  const handleDeleteNoteLink = () => {
    console.log('deleteLectureNote');
  };

  const handleTopicClick = () => {
    console.log('handleTopicClick');
  };

  const updateFilteredTagIds = (tagId) => {
    if (filteredTagIds.includes(tagId)) {
      setFilteredTagIds(filteredTagIds.filter((tag) => tag !== tagId));
    } else {
      setFilteredTagIds([...filteredTagIds, tagId]);
    }
  };

  const updateFilteredNoteIds = (notes) => {
    const noteIds = notes.map((note) => note.objectID);

    if (noteIds.length === 0) {
      console.log('nothing was found');
    }

    setFilteredNoteIds(noteIds);
  };

  const handleNoteClick = (note) => {
    dispatch({ type: 'CLEAR_CURRENT_NOTE' });
    setSelectedNote(note);
  };

  const getNotesIds = (foundItems) => {
    const newFiltered = foundItems.map((item) => notes.find((i) => i.id === item.id));

    setFilteredNotes(newFiltered);
  };

  const clearNoteSearch = () => {
    setFilteredNotes(notes);
  };

  return (
    <SidebarsMainTemplate>
      <LectureSidebar
        items={notes && sortAndFilter(filteredNotes, filteredNoteIds, filteredTagIds)}
        handleAddClick={handleAddLectureClick}
        handleItemClick={handleNoteClick}
        handleDeleteItem={handleDeleteNote}
        buttonText="Add Lecture"
        dark
      >
        <>
          <span>
            <Book /> Notes
          </span>
          <IconButton
            onClick={handleAddLectureClick}
            color="onSurface"
            hoverColor="onSurfacePrimary"
          >
            <Plus />
          </IconButton>
        </>

        <Search
          setSearchResultNotes={getNotesIds}
          placeholderText="Search"
          clearSearch={clearNoteSearch}
        />
      </LectureSidebar>

      <LectureSidebar
        items={linkedNotes}
        handleAddClick={handleEditLectureClick}
        handleItemClick={handleTopicClick}
        handleDeleteItem={handleDeleteNoteLink}
        buttonText="Edit Lecture"
        showButton={selectedNote}
      >
        <>
          <span>
            <Link /> Linked Notes
          </span>

          <IconButton
            onClick={handleEditLectureClick}
            color="onSurfaceTwo"
            hoverColor="onSurfaceTwoPrimary"
          >
            <Plus />
          </IconButton>
        </>
      </LectureSidebar>

      <>
        {currentNote.title && <NoteEditor selectedNote={selectedNote} />}
        {selectedNote && <Note note={selectedNote} />}
      </>
    </SidebarsMainTemplate>
  );
};

NotesPage.propTypes = {};

export default NotesPage;
