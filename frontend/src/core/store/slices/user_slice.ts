import { createSlice } from "@reduxjs/toolkit";
import { getUserSession } from "../../utilities";

const initialState = {
  user: getUserSession(),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      // state.user = "";
      window.localStorage.removeItem("u_user");
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
