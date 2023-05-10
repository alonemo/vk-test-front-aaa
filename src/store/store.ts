import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from './slices/posts';
import { usersReducer } from './slices/users';
const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
  },
});

export default store;
