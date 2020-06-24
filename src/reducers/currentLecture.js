const initState = { title: '', content: '', noteIds: [], language: 'code' };

const currentLecture = (state = initState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_LECTURE':
      return action.lecture;
    case 'CLEAR_CURRENT_LECTURE':
      return { title: '', content: '', tagIds: [], language: 'code' };
    default:
      return state;
  }
};

export default currentLecture;
