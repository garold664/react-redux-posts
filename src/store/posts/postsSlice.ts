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

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (initialPost: {}) => {
    const post = {
      ...initialPost,
      date: new Date().toISOString(),
      reactions: {
        cat: 0,
        thumbsUp: 0,
        hooray: 0,
        heart: 0,
        rocket: 0,
        eyes: 0,
      },
    };
    const response = await fetch(
      'https://test-20e2d-default-rtdb.firebaseio.com/posts.json',
      {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    await response.json();
    return post;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
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
      .addCase(fetchPosts.pending, (state, _action) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const posts: Post[] = [];
        Object.entries(action.payload).forEach(([key, value]) => {
          const post = value as Post;
          post.id = key;
          posts.push(post);
        });
        state.posts = state.posts.concat(posts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message
          ? action.error.message
          : 'Something went wrong';
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload as Post);
      });
  },
});

export const { updatePost, addReaction } = postsSlice.actions;

export default postsSlice.reducer;

export const selectAllPosts = (state: RootState) => state.posts.posts;

export const selectPostById = (state: RootState, postId: string) =>
  state.posts.posts.find((post: Post) => {
    return post.id.toString() === postId;
  });
