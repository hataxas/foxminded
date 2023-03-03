import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import { Outlet} from "react-router-dom";
import withDataService from '../../hocs/with-data-service';
import { fetchUsers} from '../../actions/actions';
import Spinner from '../../common/spinner/spinner';
import ErrorIndicator from '../../common/error-indicator/error-indicator';
import User from '../user/user';
import './user-list.css';

function UserList({dataService}) {
  const userList = useSelector((state) => state.userList);
  const dispatch = useDispatch();

  useEffect(() => fetchUsers(dataService, dispatch), []);

  if (userList.loading) {
    return <Spinner/>
  }

  if (userList.error) {
    return <ErrorIndicator/>
  }
  return (
    <div className='flex'>
      <div className='users'>
        {userList.users.map((user) => {
          return <User key={user.id} user={user}/>
        })}
      </div>
      <div id="detail">
        <Outlet context={[userList]}/>
      </div>
    </div>
  )
}

export default withDataService()(UserList);
