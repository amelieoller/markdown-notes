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

  const [linkedLectureNotes, setLinkedLectureNotes] = useState([]);

  useEffect(() => {
    if (!currentLectureToEdit.id) {
      setLinkedLectureNotes([]);

      return;
    }
  }, [currentLectureToEdit]);

  useEffect(() => {
    if (notes && currentLectureToEdit) {
      const connectedNotes = currentLectureToEdit.noteIds
        .map((noteId) => notes.find((note) => note.id === noteId))
        .filter((note) => !!note);

      setLinkedLectureNotes(connectedNotes);
    }
  }, [notes, currentLectureToEdit]);

  const dispatchUpdateLecture = (updateObject) => {
    dispatch(
      updateLecture({
        ...currentLectureToEdit,
        ...updateObject,
        updated: today,
      }),
    );
  };

  const handleNoteReorder = (newNotesOrder) => {
    setLinkedLectureNotes(newNotesOrder);
    dispatchUpdateLecture({ noteIds: newNotesOrder.map((note) => note.id) });
  };

  const handleAddLectureClick = () => {
    dispatch({ type: 'CLEAR_CURRENT_LECTURE' });
  };

  const handleDeleteLectureNote = (noteId) => {
    const newNoteIds = currentLectureToEdit.noteIds.filter((id) => id !== noteId);

    setLinkedLectureNotes(linkedLectureNotes.filter((note) => note.id !== noteId));
    dispatchUpdateLecture({ noteIds: newNoteIds });
  };

  const handleTopicClick = () => {
    console.log('handleTopicClick');
  };

  const updateCurrentLecture = (newLectureObj) => {
    const newLecture = { ...currentLectureToEdit, ...newLectureObj };

    if (newLecture.title) {
      if (newLecture.id) {
        dispatchUpdateLecture(newLectureObj);
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
    }
  };

  const addNoteLinkToLecture = (noteId) => {
    const newLectureNoteIds = [
      ...linkedLectureNotes.filter((n) => n).map((note) => note.id),
      noteId,
    ];

    dispatchUpdateLecture({ noteIds: newLectureNoteIds });
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
        currentActiveItem={currentLectureToEdit}
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
        showButton={currentLectureToEdit}
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

      {currentLectureToEdit && (
        <div>
          <Lecture
            currentLectureToEdit={currentLectureToEdit}
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
