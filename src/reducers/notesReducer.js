const initState = {};

const notesReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_NOTE':
      return state;
    case 'CREATE_NOTE_ERROR':
      return state;
    case 'UPDATE_NOTE':
      return state;
    case 'UPDATE_NOTE_ERROR':
      return state;
    case 'DELETE_NOTE':
      return state;
    case 'DELETE_NOTE_ERROR':
      return state;
    default:
      return state;
  }
};

export default notesReducer;
