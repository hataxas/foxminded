export const updateUserList = (state, action) => {
  if (state === undefined) {
    return {
      users: [],
      loading: true,
      error: null,
    }
  }

  switch(action.type) {
    case 'FETCH_USERS_REQUEST':
      return {
        users: [],
        loading: true,
        error: null,
      }
    case 'FETCH_USERS_SUCCESS':
      return {
        users: action.payload,
        loading: false,
        error: null,
      }
    case 'FETCH_USERS_FAILURE':
      return {
        users: [],
        loading: false,
        error: action.payload,
      }
    default:
      return state.userList;
  }
}
