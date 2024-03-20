import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import postsReducer from './posts/postsSlice';
import userSlice from './posts/userSlice';

const store = configureStore({
  reducer: { counter: counterReducer, posts: postsReducer, users: userSlice },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
