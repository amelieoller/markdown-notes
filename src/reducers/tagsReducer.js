const initState = {};

const tagsReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_TAG':
      console.log('Created tag: ', action.tag);
      return state;
    case 'CREATE_TAG_ERROR':
      console.log('Create tag error: ', action.err);
      return state;
    case 'UPDATE_TAG':
      console.log('Updated tag: ', action.tag);
      return state;
    case 'UPDATE_TAG_ERROR':
      console.log('Update tag error: ', action.err);
      return state;
    case 'DELETE_TAG':
      console.log('Deleted tag: ', action.key);
      return state;
    case 'DELETE_TAG_ERROR':
      console.log('Delete tag error: ', action.err);
      return state;
    default:
      return state;
  }
};

export default tagsReducer;
