import React from 'react';
import { useSelector } from 'react-redux';
import {useDispatch} from 'react-redux';
import { useForm } from "react-hook-form";
import './add-new-post-form.css';
import {createPostSuccess, createPostRequest, createPostFailure} from '../../actions/actions';
import withDataService from '../../hocs/with-data-service';
import Spinner from '../../common/spinner/spinner';
import ErrorIndicator from '../../common/error-indicator/error-indicator';

function AddNewPostForm({dataService}) {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      title: '',
      body: '',
    }
  });
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.postList);

  const onSubmit = (formData) => {
    const postData = {
      userId: 1,
      title: formData.title,
      body: formData.body,
    }

    dispatch(createPostRequest());
    dataService.createPost(postData)
      .then((newPost) => {
        // A hack to always have unique IDs
        const newPostId = postList.posts.length + 1;
        newPost.id = newPostId;
        dispatch(createPostSuccess(newPost));
        setValue("title", "");
        setValue("body", "");
      })
      .catch((error) => dispatch(createPostFailure(error)));
  }

  if (postList.loading) {
    return <Spinner/>
  }

  if (postList.error) {
    return <ErrorIndicator/>
  }

  return (
    <form className='new-post' onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("title", { required: true, maxLength: 80 }) }
        type='text' placeholder='enter new post title'
      />
      <textarea
        {...register("body", { required: true, maxLength: 1000 })}
        rows="2" cols="5" placeholder='enter new post text'
      >
      </textarea>
      <button type="submit">
        Add Post
      </button>
    </form>
  )
}

export default withDataService()(AddNewPostForm);
