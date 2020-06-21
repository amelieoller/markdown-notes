const initState = {};

const lectureReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_LECTURE':
      return state;
    case 'CREATE_LECTURE_ERROR':
      return state;
    case 'UPDATE_LECTURE':
      return state;
    case 'UPDATE_LECTURE_ERROR':
      return state;
    case 'DELETE_LECTURE':
      return state;
    case 'DELETE_LECTURE_ERROR':
      return state;
    default:
      return state;
  }
};

export default lectureReducer;
