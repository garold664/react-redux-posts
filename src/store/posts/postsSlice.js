import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns';

const initialState = {
  posts: [
    {
      id: '1',
      title: 'First Post!',
      content:
        'This is my first post. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi quas, maiores saepe culpa modi deleniti fugit! Ad autem ipsa sed molestiae eveniet optio ea corrupti, unde ducimus, aliquid eum dolor? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi quas, maiores saepe culpa modi deleniti fugit! Ad autem ipsa sed molestiae eveniet optio ea corrupti, unde ducimus, aliquid eum dolor?',
      userId: '0',
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
      content:
        'This is my second post. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi quas, maiores saepe culpa modi deleniti fugit! Ad autem ipsa sed molestiae eveniet optio ea corrupti, unde ducimus, aliquid eum dolor? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi quas, maiores saepe culpa modi deleniti fugit! Ad autem ipsa sed molestiae eveniet optio ea corrupti, unde ducimus, aliquid eum dolor?',
      userId: '0',
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
  ],
  status: 'idle',
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },

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
      const existingPost = state.posts.find((post) => post.id === id);

      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
    addReaction(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
});

export const { addPost, updatePost, addReaction } = postsSlice.actions;

export default postsSlice.reducer;

export const selectAllPosts = (state) => state.posts.posts;

export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId);
