
import axios from 'axios';
import { Dispatch } from 'redux';

export enum PostsActionTypes {
  FETCH_POSTS = 'FETCH_POSTS',
  FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS',
  FETCH_POSTS_FAIL = 'FETCH_POSTS_FAIL',
}

interface FetchPosts {
  type: PostsActionTypes.FETCH_POSTS;
}

interface FetchPostsSuccess {
  type: PostsActionTypes.FETCH_POSTS_SUCCESS;
  payload: [];
}

interface FetchPostsFail {
  type: PostsActionTypes.FETCH_POSTS_FAIL;
}


export const fecthPosts = () => {
  return async (dispatch:any) => {
    handleFetchPosts(dispatch);
    try{
      const response: any = await axios.get('https://jsonplaceholder.typicode.com/posts');
      handleFetchPostsSuccess(dispatch,response)
    }catch(error) {
      handleFetchPostsFail(dispatch)
    }
  }
}

export const handleFetchPosts = (dispatch: Dispatch<FetchPosts>) => {
  dispatch({ type: PostsActionTypes.FETCH_POSTS });
};

export const handleFetchPostsSuccess = (
  dispatch: Dispatch<FetchPostsSuccess>,
  response:any
) => {
  dispatch({
      type: PostsActionTypes.FETCH_POSTS_SUCCESS,
      payload: response.data
  });
};

export const handleFetchPostsFail = (dispatch: Dispatch<FetchPostsFail>) => {
  dispatch({
      type: PostsActionTypes.FETCH_POSTS_FAIL
  });
};