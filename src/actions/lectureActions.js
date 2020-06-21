export const createLecture = (lecture) => (dispatch, getState, getFirebase) => {
  const firestore = getFirebase().firestore();

  firestore
    .collection('lectures')
    .add(lecture)
    .then(() => {
      dispatch({ type: 'CREATE_LECTURE', lecture });
    })
    .catch((err) => {
      dispatch({ type: 'CREATE_LECTURE_ERROR', err });
    });
};

export const updateLecture = (lecture) => (dispatch, getState, getFirebase) => {
  const firestore = getFirebase().firestore();

  dispatch({ type: 'CLEAR_CURRENT_LECTURE' });

  firestore
    .collection('lectures')
    .doc(lecture.id)
    .update(lecture)
    .then(() => {
      dispatch({ type: 'UPDATE_LECTURE', lecture });
    })
    .catch((err) => {
      dispatch({ type: 'UPDATE_LECTURE_ERROR', err });
    });
};

export const deleteLecture = (key) => (dispatch, getState, getFirebase) => {
  const firestore = getFirebase().firestore();

  firestore
    .collection('lectures')
    .doc(key)
    .delete()
    .then(() => {
      dispatch({ type: 'DELETE_LECTURE', key });
    })
    .catch((err) => {
      dispatch({ type: 'DELETE_LECTURE_ERROR', err });
    });
};
