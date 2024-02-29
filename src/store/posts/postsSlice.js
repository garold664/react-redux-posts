import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns';

const initialState = [
  {
    id: '1',
    title: 'First Post!',
    content: 'This is my first post',
    userId: '0',
    // date: '2023-07-12T14:09:07.763Z',
    date: sub(new Date(), { hours: 3, minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 3,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
      cat: 0,
    },
  },
  {
    id: '2',
    title: 'Second Post!',
    content: 'This is my second post',
    userId: '0',
    // date: '2022-12-12T14:09:07.763Z',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 2,
      cat: 0,
    },
  },
];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // addPost: (state, action) => {
    //   state.push(action.payload);
    // },

    // ! Preparing Action Payloads: https://redux.js.org/tutorials/essentials/part-4-using-data#preparing-action-payloads
    // % Reducers should never calculate random values
    // ! that's why we never should assign ids in reducers!

    // Now our component doesn't have to worry about what the payload object looks like:
    addPost: {
      reducer(state, action) {
        state.push(action.payload);
      },
      // !The "prepare callback" function can take multiple arguments, generate random values like unique IDs, and run whatever other synchronous logic is needed
      prepare(title, content, userId, reactions) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions,
          },
        };
      },
    },

    updatePost: (state, action) => {
      const { id, title, content } = action.payload;
      const existingPost = state.find((post) => post.id === id);

      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
    addReaction(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
});

export const { addPost, updatePost, addReaction } = postsSlice.actions;

export default postsSlice.reducer;
