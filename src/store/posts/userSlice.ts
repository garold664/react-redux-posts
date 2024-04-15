import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type User = {
  id: string;
  name: string;
};

const initialState: User[] = [];

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch(
    'https://test-20e2d-default-rtdb.firebaseio.com/users.json'
  );
  const data = await response.json();
  return data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (_state, action) => {
      return action.payload;
    });
  },
});

export default usersSlice.reducer;
