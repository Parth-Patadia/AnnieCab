import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: { user: null },
  reducers: {
    user_data: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { user_data } = authSlice.actions;
export const selectUser = (state) => state.auth.user;
