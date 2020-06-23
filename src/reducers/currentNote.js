const initState = { title: '', content: '', tagIds: [], language: 'code' };

const currentNote = (state = initState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_NOTE':
      return action.note;
    case 'CLEAR_CURRENT_NOTE':
      return { title: '', content: '', tagIds: [], language: 'code' };
    default:
      return state;
  }
};

export default currentNote;
