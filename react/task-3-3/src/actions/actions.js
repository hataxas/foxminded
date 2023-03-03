const fetchPostsRequest = () => {
  return {
    type: 'FETCH_POSTS_REQUEST'
  }
}

const fetchPostsSuccess = (posts) => {
  return {
    type: 'FETCH_POSTS_SUCCESS',
    payload: posts,
  }
}

const fetchPostsFailure = (error) => {
  return {
    type: 'FETCH_POSTS_FAILURE',
    payload: error,
  }
}

const fetchTodosRequest = () => {
  return {
    type: 'FETCH_TODOS_REQUEST'
  }
}

const fetchTodosSuccess = (todos) => {
  return {
    type: 'FETCH_TODOS_SUCCESS',
    payload: todos,
  }
}

const fetchTodosFailure = (error) => {
  return {
    type: 'FETCH_TODOS_FAILURE',
    payload: error,
  }
}

const fetchUsersRequest = () => {
  return {
    type: 'FETCH_USERS_REQUEST'
  }
}

const fetchUsersSuccess = (users) => {
  return {
    type: 'FETCH_USERS_SUCCESS',
    payload: users,
  }
}

const fetchUsersFailure = (error) => {
  return {
    type: 'FETCH_USERS_FAILURE',
    payload: error,
  }
}

export const fetchPosts = (dataService, dispatch) => {
  dispatch(fetchPostsRequest());
  dataService.getPosts()
    .then((posts) => {
      dispatch(fetchPostsSuccess(posts));
    })
    .catch((error) => dispatch(fetchPostsFailure(error)));
}

export const fetchTodos = (dataService, dispatch) => {
  dispatch(fetchTodosRequest());
  dataService.getTodos()
    .then((todos) => {
      dispatch(fetchTodosSuccess(todos));
    })
    .catch((error) => dispatch(fetchTodosFailure(error)));
}

export const fetchUsers = (dataService, dispatch) => {
  dispatch(fetchUsersRequest());
  dataService.getUsers()
    .then((users) => {
      dispatch(fetchUsersSuccess(users));
    })
    .catch((error) => dispatch(fetchUsersFailure(error)));
}

export const createPostRequest = () => {
  return {
    type: 'CREATE_POST_REQUEST'
  }
}

export const createPostSuccess = (postData) => {
  return {
    type: 'CREATE_POST_SUCCESS',
    payload: postData,
  }
}

export const createPostFailure = (error) => {
  return {
    type: 'CREATE_POST_FAILURE',
    payload: error,
  }
}

export const toggleTodoStatus = (todoId) => {
  return {
    type: 'TOGGLE_TODO_STATUS',
    payload: todoId,
  }
}

export const fetchTodosByUserId = (dataService, dispatch, userId) => {
  dispatch(fetchTodosRequest());
  dataService.getTodosByUserId(userId)
    .then((todos) => {
      dispatch(fetchTodosSuccess(todos));
    })
    .catch((error) => dispatch(fetchTodosFailure(error)));
}

export const fetchPostsByUserId = (dataService, dispatch, userId) => {
  dispatch(fetchPostsRequest());
  dataService.getPostsByUserId(userId)
    .then((posts) => {
      dispatch(fetchPostsSuccess(posts));
    })
    .catch((error) => dispatch(fetchPostsFailure(error)));
}
