import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: '0', name: 'John Wick' },
  { id: '1', name: 'Tomas Anderson' },
  { id: '2', name: 'John Constantin' },
];

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
