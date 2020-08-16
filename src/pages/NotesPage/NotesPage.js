import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import NoteEditor from '../../organisms/NoteEditor.js';
import LectureSidebar from '../../organisms/LectureSidebar/LectureSidebar';
import { deleteNote, updateNote } from '../../actions/noteActions';
import SidebarsMainTemplate from '../../templates/SidebarsMainTemplate';
import { ReactComponent as Book } from '../../assets/icons/book.svg';
import { ReactComponent as Link } from '../../assets/icons/link.svg';
import IconButton from '../../atoms/IconButton/IconButton';
import { ReactComponent as Plus } from '../../assets/icons/plus.svg';
import Filter from '../../organisms/Filter/Filter';
import { sortByDate } from '../../components/utils';
import NoteSearch from '../../components/NoteSearch';

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

  const [searchText, setSearchText] = useState('');
  const [tagFilterId, setTagFilterId] = useState('filter');

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

  const handleDeleteNoteLink = (noteId) => {
    const newNoteIds = selectedNote.noteLinkIds.filter((id) => id !== noteId);

    dispatch(updateNote({ id: selectedNote.id, noteLinkIds: newNoteIds }));
  };

  const handleTopicClick = (note) => {
    console.log('handleTopicClick');
    dispatch({ type: 'SET_CURRENT_NOTE', note });
  };

  const handleNoteClick = (note) => {
    console.log('handleNoteClick');

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
      searchText.split(' ').every((word) => n.textContent.toLowerCase().includes(word)),
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
