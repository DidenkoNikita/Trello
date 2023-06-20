import { ThunkAction } from "redux-thunk";
import { PayloadAction } from "@reduxjs/toolkit";
import { RooteState } from "../store";
import { taskComplete } from "../counter/taskSlice";
import { request } from "@/request/request";

interface Complet {
  id: number;
  completed: boolean;
}

export const completTask = (id: number, completed: boolean): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<Complet>
> => async (dispatch): Promise<void> => {
  try {
    const data = await request('tasks_completed', {id, completed}, 'POST');
    if (data !== null) {      
      dispatch(taskComplete(data.task));
    }
  } catch(e) {
    return console.log(e);
  }
};