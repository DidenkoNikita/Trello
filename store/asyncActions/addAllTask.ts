import { ThunkAction } from "redux-thunk";
import { PayloadAction } from "@reduxjs/toolkit";
import { RooteState } from "../store";
import { addingManyTask } from "../counter/taskSlice";
import { request } from "@/request/request";

interface CreateTask {
  id: number;
  board_id: number;
  title: string;
  completed: boolean;
}

export const addAllTask = (): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<CreateTask[]> 
> => async (dispatch): Promise<void> => {
  try {
    const data = await request('read_tasks', {}, 'POST');
    if (data !== null) {
      dispatch(addingManyTask(data.tasks));
    }
  } catch(e) {
    return console.log(e);
  }
}