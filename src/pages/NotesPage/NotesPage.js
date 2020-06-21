import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import Search from '../../components/Search';
import NoteEditor from '../../components/NoteEditor';
import Tags from '../../components/Tags';
import Notes from '../../components/Notes';
import LectureSidebar from '../../organisms/LectureSidebar/LectureSidebar';
import Lecture from '../../organisms/Lecture';
import { deleteNote } from '../../actions/noteActions';
import SidebarsMainTemplate from '../../templates';
import Note from '../../organisms/Note';

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
  const [lectureNotes, setLectureNotes] = useState([]);
  const [showAddLecture, setShowAddLecture] = useState(false);

  const [filteredTagIds, setFilteredTagIds] = useState([]);
  const [filteredNoteIds, setFilteredNoteIds] = useState([]);

  const resetLecture = () => {
    setLectureNotes([]);
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

      setLectureNotes(connectedNotes);
    }
  }, [selectedNote]);

  const handleAddLectureClick = () => {
    setShowAddLecture(true);
    resetLecture();
  };

  const handleEditLectureClick = () => {
    setShowAddLecture(true);
  };

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

  return (
    // <StyledNotesPage>
    //   <NoteEditor />

    //   <SearchAndFilter>
    //     <Search setSearchResultNotes={updateFilteredNoteIds} placeholderText="Search Notes" />
    //     <Tags updateFilteredTagIds={updateFilteredTagIds} filteredTagIds={filteredTagIds} />
    //   </SearchAndFilter>
    //   <Notes filteredTagIds={filteredTagIds} filteredNoteIds={filteredNoteIds} />
    // </StyledNotesPage>

    <SidebarsMainTemplate>
      <LectureSidebar
        sidebarTitle="Notes"
        items={notes && sortAndFilter(notes, filteredNoteIds, filteredTagIds)}
        handleAddClick={handleAddLectureClick}
        handleItemClick={setSelectedNote}
        handleDeleteItem={handleDeleteNote}
        buttonText="Add Lecture"
        dark
      />

      <LectureSidebar
        sidebarTitle={selectedNote ? selectedNote.title : 'Select a note'}
        items={lectureNotes}
        handleAddClick={handleEditLectureClick}
        handleItemClick={handleTopicClick}
        handleDeleteItem={handleDeleteNoteLink}
        buttonText="Edit Lecture"
        showButton={selectedNote}
      />

      <>
        {showAddLecture && <NoteEditor selectedNote={selectedNote} />}
        {selectedNote && <Note note={selectedNote} setShowAddLecture={setShowAddLecture} />}
      </>
    </SidebarsMainTemplate>
  );
};

NotesPage.propTypes = {};

export default NotesPage;
