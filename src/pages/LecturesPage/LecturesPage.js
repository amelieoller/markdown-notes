import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import CreateLecture from '../../components/CreateLecture';
import LectureSidebar from '../../organisms/LectureSidebar/LectureSidebar';
import Lecture from '../../organisms/Lecture';
import { deleteLecture } from '../../actions/lectureActions';
import SidebarsMainTemplate from '../../templates';

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
      const connectedNotes = selectedLecture.noteIds.map((noteId) =>
        notes.find((note) => note.id === noteId),
      );

      setLectureNotes(connectedNotes);
      setShowAddLecture(false);
    }
  }, [selectedLecture]);

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

  const handleDeleteLectureNote = () => {
    console.log('deleteLectureNote');
  };

  const handleTopicClick = () => {
    console.log('handleTopicClick');
  };

  return (
    <SidebarsMainTemplate>
      <LectureSidebar
        sidebarTitle="Lectures"
        items={lectures}
        handleAddClick={handleAddLectureClick}
        handleItemClick={setSelectedLecture}
        handleDeleteItem={handleDeleteLecture}
        buttonText="Add Lecture"
        dark
      />

      <LectureSidebar
        sidebarTitle={selectedLecture ? selectedLecture.title : 'Select a lecture'}
        items={lectureNotes}
        handleAddClick={handleEditLectureClick}
        handleItemClick={handleTopicClick}
        handleDeleteItem={handleDeleteLectureNote}
        buttonText="Edit Lecture"
        showButton={selectedLecture}
      />

      <>
        {showAddLecture && <CreateLecture lecture={selectedLecture} />}
        {selectedLecture && <Lecture lecture={selectedLecture} notes={lectureNotes} />}
      </>
    </SidebarsMainTemplate>
  );
};

LecturesPage.propTypes = {};

export default LecturesPage;
