import { ThunkAction } from "redux-thunk";
import { PayloadAction } from "@reduxjs/toolkit";
import { RooteState } from "../store";
import { addingATask } from "../counter/taskSlice";
import { request } from "@/request/request";

interface CreateTask {
  id: number;
  board_id: number;
  title: string;
  completed: boolean;
}

export const addTask = (id: number | null, description: string): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<CreateTask> 
> => async (dispatch): Promise<void> => {
  try {
    const data = await request('tasks', {id, description}, 'POST');
    if (data !== null) {
      dispatch(addingATask(data.task));
    }
  } catch(e) {
    return console.log(e);
  }
}