import { configureStore, combineReducers } from "@reduxjs/toolkit";
import user from "./slices/user_slice";

const reducer = combineReducers({
  user,
});

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
