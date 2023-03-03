import React from 'react';
import { Link } from 'react-router-dom';
import './user.css';

const User = ({user}) => {
  return (
    <Link to={`${user.id}`} className='user'>
      <div className='name'>{user.name}</div>
    </Link>
  )
}

export default User;
