import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import postsReducer from './posts/postsSlice';
import userSlice from './posts/userSlice';

export default configureStore({
  reducer: { counter: counterReducer, posts: postsReducer, users: userSlice },
});
