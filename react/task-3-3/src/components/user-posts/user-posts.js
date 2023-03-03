import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import './user-posts.css';
import withDataService from '../../hocs/with-data-service'
import {fetchPostsByUserId} from '../../actions/actions';
import Spinner from '../../common/spinner/spinner';
import ErrorIndicator from '../../common/error-indicator/error-indicator';
import Post from '../post/post';

function UserPosts({dataService}) {
  const [user] = useOutletContext();
  const postList = useSelector((state) => state.postList);
  const dispatch = useDispatch();

  useEffect(() => fetchPostsByUserId(dataService, dispatch, user.id), []);

  if (postList.loading) {
    return <Spinner/>
  }

  if (postList.error) {
    return <ErrorIndicator/>
  }

  return (
    <div className='posts'>
      {postList.posts.map((post) => {
        return <Post key={post.id} post={post} />
      })}
    </div>
  )
}

export default withDataService()(UserPosts);
