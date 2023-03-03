import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from '../home-page/home-page';
import TodoList from '../todo-list/todo-list';
import PostsList from '../posts-list/posts-list';
import UserList from '../user-list/user-list';
import UserInfo from '../user-info/user-info';
import UserTodos from '../user-todos/user-todos';
import UserPosts from '../user-posts/user-posts';

import './app.css';
import Navigation from '../navigation/navigation';
import Tabs from '../tabs/tabs';


function App() {
  return (
    <div>
      <Navigation/>
      <Routes>
        <Route index path='/' element={<Home />}/>
        <Route path='posts' element={<PostsList />}/>
        <Route path='todos' element={<TodoList />}/>
        <Route path='users' element={<UserList />}>
          <Route path=':userId' element={<Tabs/>}>
            <Route index element={<UserInfo/>}/>
            <Route path='info' element={<UserInfo/>}/>
            <Route path='todos' element={<UserTodos/>}/>
            <Route path='posts' element={<UserPosts/>}/>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
