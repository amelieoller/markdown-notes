export const createTag = (tag) => (dispatch, getState, getFirebase) => {
  const firestore = getFirebase().firestore();

  firestore
    .collection('tags')
    .add(tag)
    .then(() => {
      dispatch({ type: 'CREATE_TAG', tag });
    })
    .catch((err) => {
      dispatch({ type: 'CREATE_TAG_ERROR', err });
    });
};

export const updateTag = (tag) => (dispatch, getState, getFirebase) => {
  const firestore = getFirebase().firestore();

  firestore
    .collection('tags')
    .doc(tag.id)
    .update(tag)
    .then(() => {
      dispatch({ type: 'UPDATE_TAG', tag });
    })
    .catch((err) => {
      dispatch({ type: 'UPDATE_TAG_ERROR', err });
    });
};

export const deleteTag = (key) => (dispatch, getState, getFirebase) => {
  const firestore = getFirebase().firestore();

  firestore
    .collection('tags')
    .doc(key)
    .delete()
    .then(() => {
      dispatch({ type: 'DELETE_TAG', key });
    })
    .catch((err) => {
      dispatch({ type: 'DELETE_TAG_ERROR', err });
    });
};
