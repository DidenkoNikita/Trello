import { ThunkAction } from "redux-thunk";
import { PayloadAction } from "@reduxjs/toolkit";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

import { RooteState } from "../store";
import { updateDescriptionTask } from "../counter/taskSlice";
import { request } from "@/request/request";

interface Task {
  id: number;
  title: string;
}

export const descriptionTaskUpdate = (id: number | null, title: string): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<Task>
> => async (dispatch): Promise<void> => {
  try {
    const data = await request('update_tasks', {id, title}, 'POST');
    if (data === null) {
      console.log('иди отсюда');
    } else {
      dispatch(updateDescriptionTask(data.task));
    }
  } catch(e) {
    return console.log(e);
  }
};