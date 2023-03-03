export const updatePostList = (state, action) => {
  if (state === undefined) {
    return {
      posts: [],
      loading: true,
      error: null,
    }
  }
  switch(action.type) {
    case 'FETCH_POSTS_REQUEST':
      return {
        posts: [],
        loading: true,
        error: null,
      }
    case 'FETCH_POSTS_SUCCESS':
      return {
        posts: action.payload,
        loading: false,
        error: null,
      }
    case 'FETCH_POSTS_FAILURE':
      return {
        posts: [],
        loading: false,
        error: action.payload,
      }
    case 'CREATE_POST_REQUEST':
      return {
        ...state.postList,
        loading: true,
        error: null,
      }
    case 'CREATE_POST_SUCCESS':
      const newPost = action.payload;

      return {
        ...state.postList,
        posts: [newPost, ...state.postList.posts],
        loading: false,
        error: null,
      }

    case 'CREATE_POST_FAILURE':
      return {
        posts: [],
        loading: false,
        error: action.payload,
      }
    // case 'ADD_NEW_POST':
    //   const newPost = action.payload;

    //   console.log(state.postList)

    //   return {
    //     ...state.postList,
    //     loading: false,
    //     posts: [newPost, ...state.postList.posts]
    //   }

    default:
      return state.postList;
  }
}
