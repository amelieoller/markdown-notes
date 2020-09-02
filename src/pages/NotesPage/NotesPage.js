import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';

import NoteEditor from '../../organisms/NoteEditor.js';
import LectureSidebar from '../../organisms/LectureSidebar/LectureSidebar';
import { deleteNote, updateNote } from '../../actions/noteActions';
import SidebarsMainTemplate from '../../templates/SidebarsMainTemplate';
import { ReactComponent as Book } from '../../assets/icons/book.svg';
import { ReactComponent as Link } from '../../assets/icons/link.svg';
import IconButton from '../../atoms/IconButton/IconButton';
import { ReactComponent as Plus } from '../../assets/icons/plus.svg';
import Filter from '../../organisms/Filter/Filter';
import { sortByDate, addOrRemoveFromArr } from '../../components/utils';
import NoteSearch from '../../components/NoteSearch';
import LinkNotes from '../../components/LinkNotes.js';

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
  const firestore = useFirestore();
  const today = firestore.Timestamp.now();

  const notes = useSelector((state) => state.firestore.ordered.notes);
  const { currentNoteToEdit } = useSelector((state) => state);

  const [linkedNotes, setLinkedNotes] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [tagFilterId, setTagFilterId] = useState('filter');

  useEffect(() => {
    if (!currentNoteToEdit.id) {
      setLinkedNotes([]);

      return;
    }

    if (notes && currentNoteToEdit) {
      const connectedNotes = currentNoteToEdit.noteLinkIds
        .map((noteId) => notes.find((note) => note.id === noteId))
        .filter((note) => !!note);

      setLinkedNotes(connectedNotes);
    }
  }, [currentNoteToEdit]);

  const dispatchUpdateCurrentNote = (newNoteObj) => {
    const newNote = { ...currentNoteToEdit, ...newNoteObj };

    if (newNote.title) {
      if (newNote.id) {
        dispatch(
          updateNote({
            ...currentNoteToEdit,
            ...newNoteObj,
            updated: today,
          }),
        );
      }
      // else {
      //   dispatch(
      //     createNote({
      //       ...newLecture,
      //       userId: currentUser.uid,
      //       created: today,
      //       updated: today,
      //     }),
      //   );
      // }
    }
  };

  const updateLectureNoteLinkIds = (noteId) => {
    const newNoteIds = addOrRemoveFromArr(currentNoteToEdit.noteLinkIds, noteId);

    dispatch({ type: 'SET_CURRENT_NOTE', note: { ...currentNoteToEdit, noteLinkIds: newNoteIds } });
    dispatchUpdateCurrentNote({ noteLinkIds: newNoteIds });
  };

  const handleAddNoteClick = () => {
    dispatch({ type: 'CLEAR_CURRENT_NOTE' });
  };

  const handleNoteClick = (note) => {
    dispatch({ type: 'SET_CURRENT_NOTE', note });
  };

  const handleDeleteNote = (noteId) => {
    dispatch(deleteNote(noteId));
    dispatch({ type: 'CLEAR_CURRENT_NOTE' });
  };

  // Search and Filter
  const separateByLecture = (notesToSeparate) => {
    const [isWithLecture, isWithoutLecture] = notesToSeparate.reduce(
      (result, el) => {
        result[el.lectureId ? 0 : 1].push(el);
        return result;
      },
      [[], []],
    );

    return [isWithoutLecture, isWithLecture];
  };

  const filterNotesByTag = () =>
    tagFilterId === 'filter' ? notes : notes.filter((n) => n.tagIds.includes(tagFilterId));

  const filterNotesBySearchText = (notesToFilter) => {
    return notesToFilter.filter((n) =>
      searchText
        .split(' ')
        .every((word) => n.textContent && n.textContent.toLowerCase().includes(word)),
    );
  };

  const filterAndSort = () => {
    const tagFilteredNotes = filterNotesByTag();
    const searchFilteredNotes = filterNotesBySearchText(tagFilteredNotes);
    const sortedNotes = sortByDate(searchFilteredNotes, 'updated');

    return sortedNotes;
  };

  return (
    <SidebarsMainTemplate>
      <LectureSidebar
        items={notes && separateByLecture(filterAndSort())}
        handleAddClick={handleAddNoteClick}
        handleItemClick={handleNoteClick}
        currentActiveItem={currentNoteToEdit}
        buttonText="Add Lecture"
        dark
        isOpen
        nestedArray
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
        <NoteSearch
          placeholderText="Search"
          searchText={searchText}
          setSearchText={setSearchText}
        />
        <Filter setTagFilterId={setTagFilterId} />
      </LectureSidebar>

      <LectureSidebar
        items={linkedNotes}
        handleItemClick={handleNoteClick}
        handleDeleteItem={updateLectureNoteLinkIds}
        buttonText="Edit Lecture"
        showButton={currentNoteToEdit}
        isOpen={false}
        deleteIcon
      >
        <div>
          <span>
            <Link />
            <h1>Linked Notes</h1>
          </span>
        </div>

        <LinkNotes
          addNoteIdLink={updateLectureNoteLinkIds}
          linkIds={currentNoteToEdit.noteLinkIds}
        />
      </LectureSidebar>

      {currentNoteToEdit.content && (
        <NoteEditor
          currentNoteToEdit={currentNoteToEdit}
          linkedNotes={linkedNotes}
          handleDelete={handleDeleteNote}
        />
      )}
    </SidebarsMainTemplate>
  );
};

NotesPage.propTypes = {};

export default React.memo(NotesPage);
