export const updateTodoList = (state, action) => {
  if (state === undefined) {
    return {
      todos: [],
      loading: true,
      error: null,
    }
  }

  switch(action.type) {
    case 'FETCH_TODOS_REQUEST':
      return {
        todos: [],
        loading: true,
        error: null,
      }
    case 'FETCH_TODOS_SUCCESS':
      return {
        todos: action.payload,
        loading: false,
        error: null,
      }
    case 'FETCH_TODOS_FAILURE':
      return {
        todos: [],
        loading: false,
        error: action.payload,
      }
    case 'TOGGLE_TODO_STATUS':
      const todoId = action.payload;
      const todoIndex = state.todoList.todos.findIndex((todo) => {
        return todo.id === todoId;
      });
      const todo = state.todoList.todos[todoIndex];

      let newTodo = {
        ...todo,
        completed: !todo.completed,
      }

      const updatedTodos = state.todoList.todos.map(
        (todo) => todo.id === newTodo.id
          ? newTodo
          : todo
      );

      return {
        ...state.todoList,
        todos: [
          ...updatedTodos
        ]
      }
    default:
      return state.todoList;
  }
}
