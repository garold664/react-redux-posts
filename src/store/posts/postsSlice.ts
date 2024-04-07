import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit';
import { RootState } from '../store';
// import { sub } from 'date-fns';

type Reaction = {
  cat: number;
  thumbsUp: number;
  hooray: number;
  heart: number;
  rocket: number;
  eyes: number;
};
// type Reaction = {
//   [key: 'cat' | 'thumbsUp' | 'hooray' | 'heart' | 'rocket' | 'eyes']: number;
// };

// export type ReactionKey =
//   | 'cat'
//   | 'thumbsUp'
//   | 'hooray'
//   | 'heart'
//   | 'rocket'
//   | 'eyes';
export type Post = {
  id: string;
  date: string;
  title: string;
  content: string;
  userId: string;
  reactions: Reaction;
};

type InitialState = {
  posts: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: InitialState = {
  posts: [],
  status: 'idle',
  error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch(
    'https://test-20e2d-default-rtdb.firebaseio.com/posts.json'
  );
  const data = await response.json();
  return data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },

      prepare(
        title: string,
        content: string,
        userId: string,
        reactions: Reaction
      ) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            userId: userId,
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
      const {
        postId,
        reaction,
      }: {
        postId: string;
        reaction: 'cat' | 'thumbsUp' | 'hooray' | 'heart' | 'rocket' | 'eyes';
      } = action.payload;
      const existingPost = state.posts.find(
        (post) => post.id === postId
      ) as Post;
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = state.posts.concat(action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message
          ? action.error.message
          : 'Something went wrong';
      });
  },
});

export const { addPost, updatePost, addReaction } = postsSlice.actions;

export default postsSlice.reducer;

export const selectAllPosts = (state: RootState) => state.posts.posts;

export const selectPostById = (state: RootState, postId: string) =>
  state.posts.posts.find((post: Post) => post.id === postId);
