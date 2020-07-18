const initState = {};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_USER':
      return action.user;
    case 'CREATE_USER_ERROR':
      return state;
    case 'DELETE_USER':
      window.sessionStorage.clear();

      return {};
    case 'DELETE_USER_ERROR':
      return state;
    default:
      return state;
  }
};

export default userReducer;
