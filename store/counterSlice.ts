import { combineReducers } from 'redux';

import { boardSlice } from './counter/boardSlice';
import { taskSlice } from './counter/taskSlice';

export const rootReducer = combineReducers({
  boards: boardSlice.reducer,
  tasks: taskSlice.reducer,
});