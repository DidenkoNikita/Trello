import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import { rootReducer } from "./counterSlice";
import thunk from "redux-thunk";

const middleware = [...getDefaultMiddleware(), thunk];

export const store = configureStore({
  reducer: rootReducer, 
  // middleware
})

export type RooteState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;