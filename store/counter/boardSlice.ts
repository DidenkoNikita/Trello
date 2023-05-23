import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { initialState } from "../initialState";

interface Board {
  id: number;
  title: string;
}

export const boardSlice = createSlice({
  name: 'board',
  initialState: initialState.boards,
  reducers: {
    addingABoard: (state, action: PayloadAction<Board>): void => {
      state.push(action.payload);
    },
    addingManyBoard: (state, action: PayloadAction<Board[]>): void => {
      const { payload } = action;
      payload.forEach((board) => {
        if (!state.find((b) => b.id === board.id)) {
          state.push(board);
        }
      });
    },
    removeBoard: (state, action: PayloadAction<{ id: number }>): Board[] => {
      const { payload } = action;
      state = state.filter((board) => board.id !== payload.id);
      return state;
    },
    updateTitleBoard: (state, action: PayloadAction<{ id: number, title: string }>): Board[] => {
      const { payload } = action;
      state = state.map((board) => (board.id === payload.id ? { ...board, title: payload.title } : board));
      state.sort((a, b) => a.id - b.id);
      return state;
    },
  },
});

export const {
  addingABoard,
  addingManyBoard,
  removeBoard,
  updateTitleBoard
} = boardSlice.actions;