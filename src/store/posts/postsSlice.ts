import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type Reaction = {
  cat: number;
  thumbsUp: number;
  hooray: number;
  heart: number;
  rocket: number;
  eyes: number;
};

export type Post = {
  id: string;
  date: string;
  title: string;
  content: string;
  userId: string;
  reactions: Reaction;
  imageLink: string;
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

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (initialPost: {
    id: string;
    title: string;
    content: string;
    imageLink?: string;
  }) => {
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
      `https://test-20e2d-default-rtdb.firebaseio.com/posts/${post.id}.json`,
      {
        method: 'PUT',
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

export const addReaction = createAsyncThunk(
  'posts/addReaction',

  async ({
    postId,
    reaction,
    reactionValue,
  }: {
    postId: string;
    reaction: keyof Reaction;
    reactionValue: number;
  }) => {
    const response = await fetch(
      `https://test-20e2d-default-rtdb.firebaseio.com/posts/${postId}/reactions/${reaction}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(reactionValue + 1),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    await response.json();
    return { postId, reaction, reactionValue };
  }
);

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (initialPost: {
    title: string;
    content: string;
    userId: string;
    imageLink: string | undefined;
  }) => {
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
  reducers: {},

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
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        let currentPostIndex = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        if (currentPostIndex !== -1) {
          state.posts[currentPostIndex] = {
            ...state.posts[currentPostIndex],
            ...action.payload,
          };
        }
      })
      .addCase(addReaction.fulfilled, (state, action) => {
        let currentPostIndex = state.posts.findIndex(
          (post) => post.id === action.payload.postId
        );
        if (currentPostIndex !== -1) {
          state.posts[currentPostIndex].reactions[action.payload.reaction] =
            action.payload.reactionValue + 1;
        }
      });
  },
});

export default postsSlice.reducer;

export const selectAllPosts = (state: RootState) => state.posts.posts;

export const selectPostById = (state: RootState, postId: string) =>
  state.posts.posts.find((post: Post) => {
    return post.id.toString() === postId;
  });
