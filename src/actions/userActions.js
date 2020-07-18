export const createUser = (user) => (dispatch) => {
  dispatch({ type: 'CREATE_USER', user });
};

export const deleteUser = () => (dispatch) => {
  dispatch({ type: 'DELETE_USER' });
};
