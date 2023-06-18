import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    setUsers: (state, action) => {
      return action.payload;
    },
    blockUser: (state, action) => {
      const { userId, isBlock } = action.payload;
      return state.map((user) =>
        user._id === userId ? { ...user, isBlock } : user
      );
    },
    unblockUser: (state, action) => {
      const { userId, isBlock } = action.payload;
      return state.map((user) =>
        user._id === userId ? { ...user, isBlock } : user
      );
    },
  },
});

export const { setUsers, blockUser, unblockUser } = userSlice.actions;
export default userSlice.reducer;
