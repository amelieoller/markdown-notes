import { initialNote } from '../initialNote';

const currentNote = (state = initialNote, action) => {
  switch (action.type) {
    case 'SET_CURRENT_NOTE':
      return action.note;
    case 'CLEAR_CURRENT_NOTE':
      return initialNote;
    default:
      return state;
  }
};

export default currentNote;
