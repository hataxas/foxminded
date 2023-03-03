import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './posts-list.css';
import withDataService from '../../hocs/with-data-service'
import {fetchPosts} from '../../actions/actions';
import AddNewPostForm from '../forms/add-new-post-form';
import Spinner from '../../common/spinner/spinner';
import ErrorIndicator from '../../common/error-indicator/error-indicator';
import Post from '../post/post';

function PostsList({dataService}) {
  const postList = useSelector((state) => state.postList);
  const dispatch = useDispatch();

  useEffect(() => fetchPosts(dataService, dispatch), []);

  if (postList.loading) {
    return <Spinner/>
  }

  if (postList.error) {
    return <ErrorIndicator/>
  }

  return (
    <div className='posts'>
      <h1>Posts List</h1>
      <AddNewPostForm/>
      {postList.posts.map((post) => {
        return <Post key={post.id} post={post} />
      })}
    </div>
  )
}

export default withDataService()(PostsList);
