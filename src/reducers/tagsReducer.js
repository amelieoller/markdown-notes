const initState = {};

const tagsReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_TAG':
      return state;
    case 'CREATE_TAG_ERROR':
      return state;
    case 'UPDATE_TAG':
      return state;
    case 'UPDATE_TAG_ERROR':
      return state;
    case 'DELETE_TAG':
      return state;
    case 'DELETE_TAG_ERROR':
      return state;
    default:
      return state;
  }
};

export default tagsReducer;
