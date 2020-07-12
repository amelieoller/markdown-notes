import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import CreateLecture from '../../components/CreateLecture';
import LectureSidebar from '../../organisms/LectureSidebar/LectureSidebar';
import Lecture from '../../organisms/Lecture';
import { deleteLecture, updateLecture } from '../../actions/lectureActions';
import SidebarsMainTemplate from '../../templates/SidebarsMainTemplate';
import IconButton from '../../atoms/IconButton/IconButton';
import { ReactComponent as Plus } from '../../assets/icons/plus.svg';
import { ReactComponent as GraduationCap } from '../../assets/icons/graduation-cap.svg';
import { ReactComponent as Link } from '../../assets/icons/link.svg';
import { ReactComponent as Edit } from '../../assets/icons/edit.svg';
import LectureSidebarDraggable from '../../organisms/LectureSidebarDragable/LectureSidebarDraggable';

const LecturesPage = () => {
  useFirestoreConnect(['lectures']);

  const dispatch = useDispatch();

  const lectures = useSelector((state) => state.firestore.ordered.lectures);
  const notes = useSelector((state) => state.firestore.ordered.notes);

  const [selectedLecture, setSelectedLecture] = useState(null);
  const [lectureNotes, setLectureNotes] = useState([]);
  const [showAddLecture, setShowAddLecture] = useState(false);

  const resetLecture = () => {
    setLectureNotes([]);
    setSelectedLecture(null);
  };

  useEffect(() => {
    if (selectedLecture && notes) {
      const hydrateNotesIds = (noteIds) =>
        noteIds.map((noteId) => notes.find((note) => note.id === noteId));

      setLectureNotes(hydrateNotesIds(selectedLecture.noteIds));
      setShowAddLecture(false);
    }
  }, [selectedLecture]);

  const handleNoteReorder = (newNotesOrder) => {
    setLectureNotes(newNotesOrder);
    // persist new order
    dispatch(
      updateLecture({ noteIds: newNotesOrder.map((note) => note.id), id: selectedLecture.id }),
    );
  };

  const handleAddLectureClick = () => {
    setShowAddLecture(true);
    resetLecture();
  };

  const handleEditLectureClick = () => {
    setShowAddLecture(true);
  };

  const handleDeleteLecture = (lectureId) => {
    dispatch(deleteLecture(lectureId));
    resetLecture();
  };

  const handleDeleteLectureNote = (noteId) => {
    const newNoteIds = selectedLecture.noteIds.filter((id) => id !== noteId);
    setLectureNotes(lectureNotes.filter((note) => note.id !== noteId));
    dispatch(updateLecture({ id: selectedLecture.id, noteIds: newNoteIds }));
  };

  const handleTopicClick = () => {
    console.log('handleTopicClick');
  };

  const updateCurrentLecture = (lecture) => {
    setSelectedLecture(lecture);
  };

  return (
    <SidebarsMainTemplate>
      <LectureSidebar
        items={lectures}
        handleAddClick={handleAddLectureClick}
        handleItemClick={setSelectedLecture}
        handleDeleteItem={handleDeleteLecture}
        buttonText="Add Lecture"
        dark
      >
        <>
          <GraduationCap />
          <span>Lectures</span>

          <IconButton
            onClick={handleAddLectureClick}
            color="onSurface"
            hoverColor="onSurfacePrimary"
          >
            <Plus />
          </IconButton>
        </>
      </LectureSidebar>

      <LectureSidebarDraggable
        items={lectureNotes}
        handleAddClick={handleEditLectureClick}
        handleItemClick={handleTopicClick}
        handleDeleteItem={handleDeleteLectureNote}
        buttonText="Edit Lecture"
        showButton={selectedLecture}
        handleNoteReorder={handleNoteReorder}
      >
        <>
          <Link />
          <span>Linked Notes</span>

          <IconButton
            onClick={handleEditLectureClick}
            color="onSurfaceTwo"
            hoverColor="onSurfaceTwoPrimary"
          >
            <Edit />
          </IconButton>
        </>
      </LectureSidebarDraggable>

      <div>
        {showAddLecture && (
          <CreateLecture
            selectedLecture={selectedLecture}
            updateCurrentLecture={updateCurrentLecture}
          />
        )}
        {selectedLecture && !showAddLecture && (
          <Lecture lecture={selectedLecture} notes={lectureNotes} />
        )}
      </div>
    </SidebarsMainTemplate>
  );
};

LecturesPage.propTypes = {};

export default LecturesPage;
