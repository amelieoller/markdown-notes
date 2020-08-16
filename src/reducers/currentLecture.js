const initialLecture = { title: 'New Lecture', noteIds: [] };

const currentLecture = (state = initialLecture, action) => {
  switch (action.type) {
    case 'SET_CURRENT_LECTURE':
      return action.lecture;
    case 'CLEAR_CURRENT_LECTURE':
      return initialLecture;
    default:
      return state;
  }
};

export default currentLecture;
