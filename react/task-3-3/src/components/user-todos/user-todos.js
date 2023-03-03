import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import withDataService from '../../hocs/with-data-service';
import { fetchTodosByUserId} from '../../actions/actions';
import Spinner from '../../common/spinner/spinner';
import ErrorIndicator from '../../common/error-indicator/error-indicator';
import Todo from '../todo/todo';
import './user-todos.css';

function UserTodos({dataService}) {
  const [user] = useOutletContext();
  const todoList = useSelector((state) => state.todoList);
  const dispatch = useDispatch();

  useEffect(() => fetchTodosByUserId(dataService, dispatch, user.id), []);

  if (todoList.loading) {
    return <Spinner/>
  }

  if (todoList.error) {
    return <ErrorIndicator/>
  }
  return (
    <div className='todos'>
      {todoList.todos.map((todo) => {
        const indexNumber = todoList.todos.indexOf(todo) + 1;
        return <Todo key={todo.id} todo={todo} indexNumber={indexNumber}/>
      })}
    </div>
  )
}

export default withDataService()(UserTodos);
