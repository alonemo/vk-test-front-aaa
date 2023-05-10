import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  changeLikes,
  createPost,
  getFriendsPosts,
  getPostsByUser,
} from '../../utils/axios';
import { IPost, IPosts } from '../../types/interfaces';

export const fetchPostsByUser: any = createAsyncThunk(
  'users/fetchUserById',
  async (userId: number) => {
    const response = await getPostsByUser(userId);
    return response;
  }
);

export const updatePostLikes: any = createAsyncThunk(
  'posts/updateLikes',
  async (postId: number) => {
    const response = await changeLikes(postId);
    return response;
  }
);

export const fecthPostsByFriends: any = createAsyncThunk(
  'posts/friendsPosts',
  async () => {
    const response = await getFriendsPosts();
    return response;
  }
);

export const createPostAndUpdate: any = createAsyncThunk(
  'post/create',
  async (postData: IPost) => {
    const response = await createPost(postData);
    return response;
  }
);

interface initPosts {
  items: IPosts;
  status: string;
}

export interface postsState {
  posts: initPosts;
}

const initialState: postsState = {
  posts: {
    items: [],
    status: 'loading',
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPostsByUser.pending]: state => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchPostsByUser.fulfilled]: (state, action) => {
      state.posts.status = 'loaded';
      state.posts.items = action.payload;
    },
    [fetchPostsByUser.rejected]: state => {
      state.posts.items = [];
      state.posts.status = 'error';
    },
    [updatePostLikes.fulfilled]: (state: any, action) => {
      const post: any = action.payload;
      const postIndex = state.posts.items.findIndex(
        (p: any) => p._id === post._id
      );
      state.posts.items[postIndex] = post;
    },
    [fecthPostsByFriends.pending]: state => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fecthPostsByFriends.fulfilled]: (state, action) => {
      state.posts.status = 'loaded';
      state.posts.items = action.payload;
    },
    [fecthPostsByFriends.rejected]: state => {
      state.posts.items = [];
      state.posts.status = 'error';
    },
    [createPostAndUpdate.fulfilled]: (state: any, action) => {
      state.posts.items = [action.payload, ...state.posts.items];
    },
  },
});

export const postsReducer = postsSlice.reducer;
