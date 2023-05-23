import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { initialState } from "../initialState";

export interface Task {
  id: number;
  board_id: number;
  title: string;
  completed: boolean;
}

export const taskSlice = createSlice({
  name: 'task',
  initialState: initialState.tasks,
  reducers: {
    addingATask: (state, action: PayloadAction<Task>): void => {
      state.push(action.payload);
    },
    addingManyTask: (state, action: PayloadAction<Task[]>): void => {
      const { payload } = action;
      payload.forEach((task) => {
        if (!state.find((t) => t.id === task.id)) {
          state.push(task);
        }
      });
    },
    removeTask: (state, action: PayloadAction<{ id: number }>): Task[] => {
      const { payload } = action;
      state = state.filter((task) => task.id !== payload.id);
      return state;
    },
    taskComplete: (state, action: PayloadAction<{ id: number, completed: boolean }>): Task[] => {
      const { payload } = action;
      state = state.map((task) => (task.id === payload.id ? { ...task, completed: payload.completed } : task));
      state.sort((a, b) => a.id - b.id);
      return state;
    },
    updateDescriptionTask: (state, action: PayloadAction<{ id: number, title: string }>): Task[] => {
      const { payload } = action;
      state = state.map((task) => (task.id === payload.id ? { ...task, title: payload.title } : task));
      state.sort((a, b) => a.id - b.id);
      return state;
    }
  },
});


export const {
  addingATask,
  addingManyTask,
  removeTask,
  taskComplete,
  updateDescriptionTask
} = taskSlice.actions;