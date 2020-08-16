import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';

import LectureSidebar from '../../organisms/LectureSidebar/LectureSidebar';
import Lecture from '../../organisms/Lecture';
import { updateLecture, createLecture } from '../../actions/lectureActions';
import SidebarsMainTemplate from '../../templates/SidebarsMainTemplate';
import IconButton from '../../atoms/IconButton/IconButton';
import { ReactComponent as Plus } from '../../assets/icons/plus.svg';
import { ReactComponent as GraduationCap } from '../../assets/icons/graduation-cap.svg';
import { ReactComponent as Link } from '../../assets/icons/link.svg';
import LectureSidebarDraggable from '../../organisms/LectureSidebarDragable/LectureSidebarDraggable';

const LecturesPage = () => {
  const currentUser = useSelector((state) => state.firebase.auth);
  const { currentLectureToEdit } = useSelector((state) => state);

  useFirestoreConnect([
    {
      collection: 'tags',
      where: [['userId', '==', currentUser.uid]],
    },
  ]);

  useFirestoreConnect([
    {
      collection: 'lectures',
      where: [['userId', '==', currentUser.uid]],
      orderBy: ['updated', 'desc'],
    },
  ]);

  useFirestoreConnect([
    {
      collection: 'notes',
      where: [['userId', '==', currentUser.uid]],
    },
  ]);

  const dispatch = useDispatch();

  const lectures = useSelector((state) => state.firestore.ordered.lectures);
  const notes = useSelector((state) => state.firestore.ordered.notes);

  const firestore = useFirestore();
  const today = firestore.Timestamp.now();

  const [selectedLecture, setSelectedLecture] = useState(null);
  const [linkedLectureNotes, setLinkedLectureNotes] = useState([]);

  const resetLecture = () => {
    setLinkedLectureNotes([]);
  };

  useEffect(() => {
    if (selectedLecture && notes) {
      const hydrateNotesIds = (noteIds) =>
        noteIds.map((noteId) => notes.find((note) => note.id === noteId));

      setLinkedLectureNotes(hydrateNotesIds(selectedLecture.noteIds));
    }
  }, [selectedLecture]);

  useEffect(() => {
    if (currentLectureToEdit) {
      setSelectedLecture(currentLectureToEdit);
    }
  }, [currentLectureToEdit]);

  const handleNoteReorder = (newNotesOrder) => {
    setLinkedLectureNotes(newNotesOrder);
    // persist new order
    dispatch(
      updateLecture({
        noteIds: newNotesOrder.map((note) => note.id),
        id: selectedLecture.id,
        updated: today,
      }),
    );
  };

  const handleAddLectureClick = () => {
    dispatch({ type: 'CLEAR_CURRENT_LECTURE' });

    resetLecture();
  };

  const handleDeleteLectureNote = (noteId) => {
    const newNoteIds = selectedLecture.noteIds.filter((id) => id !== noteId);
    setLinkedLectureNotes(linkedLectureNotes.filter((note) => note.id !== noteId));
    dispatch(updateLecture({ id: selectedLecture.id, noteIds: newNoteIds, updated: today }));
  };

  const handleTopicClick = () => {
    console.log('handleTopicClick');
  };

  const updateCurrentLecture = (newLectureObj) => {
    const newLecture = { ...selectedLecture, ...newLectureObj, updated: today };

    if (newLecture.title) {
      if (newLecture.id) {
        dispatch(updateLecture(newLecture));
      } else {
        dispatch(
          createLecture({
            ...newLecture,
            userId: currentUser.uid,
            created: today,
            updated: today,
          }),
        );
      }

      setSelectedLecture(newLecture);
    }
  };

  const addNoteLinkToLecture = (noteId) => {
    const newLectureNoteIds = [
      ...linkedLectureNotes.filter((n) => n).map((note) => note.id),
      noteId,
    ];

    dispatch(
      updateLecture({
        noteIds: newLectureNoteIds,
        id: selectedLecture.id,
        updated: today,
      }),
    );

    setSelectedLecture({ ...selectedLecture, noteIds: newLectureNoteIds });
  };

  const selectLecture = (lecture) => {
    dispatch({ type: 'SET_CURRENT_LECTURE', lecture });
  };

  return (
    <SidebarsMainTemplate>
      <LectureSidebar
        items={lectures}
        handleAddClick={handleAddLectureClick}
        handleItemClick={selectLecture}
        buttonText="Add Lecture"
        dark
        isOpen={true}
      >
        <div>
          <span>
            <GraduationCap />
            <h1>Lectures</h1>
          </span>

          <IconButton
            onClick={handleAddLectureClick}
            color="onSurface"
            hoverColor="onSurfacePrimary"
          >
            <Plus />
          </IconButton>
        </div>
      </LectureSidebar>

      <LectureSidebarDraggable
        items={linkedLectureNotes}
        handleItemClick={handleTopicClick}
        handleDeleteItem={handleDeleteLectureNote}
        buttonText="Edit Lecture"
        showButton={selectedLecture}
        handleNoteReorder={handleNoteReorder}
        isOpen={false}
        deleteIcon
      >
        <div>
          <span>
            <Link />
            <h1>Linked Notes</h1>
          </span>
        </div>
      </LectureSidebarDraggable>

      {selectedLecture && (
        <div>
          <Lecture
            currentLectureToEdit={selectedLecture}
            notes={linkedLectureNotes}
            addNoteLinkToLecture={addNoteLinkToLecture}
            updateCurrentLecture={updateCurrentLecture}
          />
        </div>
      )}
    </SidebarsMainTemplate>
  );
};

LecturesPage.propTypes = {};

export default LecturesPage;
