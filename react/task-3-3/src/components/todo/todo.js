import React from 'react';
import './todo.css';

const Todo = ({todo, onToggleTodoStatus, indexNumber}) => {
  const todoClass = !todo.completed ? 'todo' : 'todo completed';
  const number = indexNumber ? indexNumber : todo.id;

  return (
    <div className={todoClass} onClick={onToggleTodoStatus}>
      <div className='title'>{number}. {todo.title}</div>
    </div>
  )
}

export default Todo;
