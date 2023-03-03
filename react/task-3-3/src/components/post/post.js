import React from 'react';
import './post.css';

const Post = ({post}) => {
  return (
    <div className='post'>
      <div className='title'>Title: {post.title}</div>
      <div className='body'>{post.body}</div>
    </div>
  )
}

export default Post;
