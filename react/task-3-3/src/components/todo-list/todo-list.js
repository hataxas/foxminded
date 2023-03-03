import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import withDataService from '../../hocs/with-data-service';
import { fetchTodos, toggleTodoStatus} from '../../actions/actions';
import Spinner from '../../common/spinner/spinner';
import ErrorIndicator from '../../common/error-indicator/error-indicator';
import Todo from '../todo/todo';
import './todo-list.css';

function TodoList({dataService}) {
  const todoList = useSelector((state) => state.todoList);
  const dispatch = useDispatch();

  useEffect(() => fetchTodos(dataService, dispatch), []);

  if (todoList.loading) {
    return <Spinner/>
  }

  if (todoList.error) {
    return <ErrorIndicator/>
  }
  return (
    <div className='todos'>
      <h1>Todo List</h1>
      {todoList.todos.map((todo) => {
        return <Todo key={todo.id} todo={todo} onToggleTodoStatus={() => dispatch(toggleTodoStatus(todo.id))}/>
      })}
    </div>
  )
}

export default withDataService()(TodoList);
