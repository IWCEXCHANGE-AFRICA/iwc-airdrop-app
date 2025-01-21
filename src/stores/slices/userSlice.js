import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  grosspointbalance: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token, grosspointbalance } = action.payload;
      state.user = user;
      state.token = token;
      state.grosspointbalance = grosspointbalance;
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      state.grosspointbalance = null;
    },
    updateGrossPointBalance: (state, action) => {
      state.grosspointbalance = action.payload;
    }
  }
});

export const { setUser, clearUser, updateGrossPointBalance } =
  userSlice.actions;
export default userSlice.reducer;
