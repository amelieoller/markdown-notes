const initState = {};

const notesReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_NOTE':
      console.log('Created note: ', action.note);
      return state;
    case 'CREATE_NOTE_ERROR':
      console.log('Create note error: ', action.err);
      return state;
    case 'UPDATE_NOTE':
      console.log('Updated note: ', action.note);
      return state;
    case 'UPDATE_NOTE_ERROR':
      console.log('Update note error: ', action.err);
      return state;
    case 'DELETE_NOTE':
      console.log('Deleted note: ', action.key);
      return state;
    case 'DELETE_NOTE_ERROR':
      console.log('Delete note error: ', action.err);
      return state;
    default:
      return state;
  }
};

export default notesReducer;
