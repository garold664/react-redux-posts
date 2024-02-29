import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: '0', name: 'John Wick' },
  { id: '1', name: 'Tomas Anderson' },
  { id: '2', name: 'John Constantin' },
];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export default usersSlice.reducer;
