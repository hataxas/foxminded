import { updatePostList } from "./post-list";
import { updateTodoList } from "./todo-list";
import { updateUserList } from "./users";

const initialState = {
  postList: {
    posts: [
      {
        userId: 1,
        id: 1,
        title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body: `quia et suscipit
              suscipit recusandae consequuntur expedita et cum
              reprehenderit molestiae ut ut quas totam
              nostrum rerum est autem sunt rem eveniet architecto`
      },
      {
        userId: 1,
        id: 2,
        title: "qui est esse",
        body: `est rerum tempore vitae
              sequi sint nihil reprehenderit dolor beatae ea dolores neque
              fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis
              qui aperiam non debitis possimus qui neque nisi nulla`
      }
    ],
    loading: true,
    error: null,
  },
  todoList: {
    todos: [
      {
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: false
      },
      {
        userId: 1,
        id: 2,
        title: "quis ut nam facilis et officia qui",
        completed: false
      },
    ],
    loading: true,
    error: null,
  },
  userList: {
    users: [
      {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
      },
      {
        id: 2,
        name: "Ervin Howell",
        username: "Antonette",
      },
    ],
    loading: true,
    error: null,
  },
}

const reducer = (state = initialState, action) => {
  return {
    postList: updatePostList(state, action),
    todoList: updateTodoList(state, action),
    userList: updateUserList(state, action),
  }
}

export default reducer;
