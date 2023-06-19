import { ThunkAction } from "redux-thunk";
import { PayloadAction } from "@reduxjs/toolkit";
import { RooteState } from "../store";
import { removeTask } from "../counter/taskSlice";
import { request } from "@/request/request";

interface Task {
  id: number;
}

export const taskRemove = (id: number): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<Task> 
> => async (dispatch): Promise<void> => {
  try {
    const data = await request('tasks', {id}, 'DELETE');    
    if (data === null) {
      console.log('иди отсюда');
    } else {
      dispatch(removeTask(data.task));
    }
  } catch(e) {
    return console.log(e);
  }
};