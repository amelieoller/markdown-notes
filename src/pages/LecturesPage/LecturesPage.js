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

  const initialLecture = { title: '', content: '', noteIds: [], language: 'code' };

  const [selectedLecture, setSelectedLecture] = useState(initialLecture);
  const [lectureNotes, setLectureNotes] = useState([]);
  const [showAddLecture, setShowAddLecture] = useState(true);
  const [showAddLectureNote, setShowAddLectureNote] = useState(true);

  const resetLecture = () => {
    setLectureNotes([]);
    setSelectedLecture(initialLecture);
  };

  useEffect(() => {
    if (selectedLecture.id && notes) {
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
    // resetLecture();
  };

  const handleEditLectureClick = () => {
    setShowAddLecture(true);
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

  const addNoteLinkToLecture = (noteId) => {
    const newLectureNoteIds = [...lectureNotes.filter((n) => n).map((note) => note.id), noteId];
    dispatch(
      updateLecture({
        noteIds: newLectureNoteIds,
        id: selectedLecture.id,
      }),
    );

    setSelectedLecture({ ...selectedLecture, noteIds: [...selectedLecture.noteIds, noteId] });
    dispatch({ type: 'CLEAR_CURRENT_NOTE' });
  };

  return (
    <SidebarsMainTemplate>
      <LectureSidebar
        items={lectures}
        handleAddClick={handleAddLectureClick}
        handleItemClick={setSelectedLecture}
        buttonText="Add Lecture"
        dark
        isOpen={true}
      >
        <div>
          <span>
            <GraduationCap />
            <h4>Lectures</h4>
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
        items={lectureNotes}
        handleAddClick={handleEditLectureClick}
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
            <h4>Linked Notes</h4>
          </span>

          <IconButton
            onClick={handleEditLectureClick}
            color="onSurfaceTwo"
            hoverColor="onSurfaceTwoPrimary"
          >
            <Edit />
          </IconButton>
        </div>
      </LectureSidebarDraggable>

      <div>
        {showAddLecture && (
          <CreateLecture
            selectedLecture={selectedLecture}
            updateCurrentLecture={updateCurrentLecture}
          />
        )}
        {selectedLecture && !showAddLecture && (
          <Lecture
            lecture={selectedLecture}
            notes={lectureNotes}
            addNoteLinkToLecture={addNoteLinkToLecture}
          />
        )}
      </div>
    </SidebarsMainTemplate>
  );
};

LecturesPage.propTypes = {};

export default LecturesPage;
