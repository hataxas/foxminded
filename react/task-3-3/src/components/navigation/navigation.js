import React from 'react';
import { Link } from 'react-router-dom';
import './navigation.css';

function Navigation() {
  return (
    <nav className='navigation'>
      <Link className='link' to="/">Home</Link>
      <Link className='link' to="/posts">Posts List</Link>
      <Link className='link' to="/todos">Todo List</Link>
      <Link className='link' to="/users">User List</Link>
    </nav>
  )
}

export default Navigation;
