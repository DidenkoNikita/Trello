import { ThunkAction } from "redux-thunk";
import { PayloadAction } from "@reduxjs/toolkit";

import { RooteState } from "../store";
import { addingManyTask } from "../counter/taskSlice";
import { ReadTasksUrl } from "@/url/readTasksUrl";

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
> => async (dispatch): Promise<void | unknown> => {
  const user_id: number | string = JSON.parse(localStorage.getItem('user_id') || "")!; 
  const refreshToken: string = JSON.parse(localStorage.getItem('refresh_token') || '');

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${refreshToken}`,
  };

  try {
    const response: Response = await fetch(`${ReadTasksUrl}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({user_id})
    });
    const data = await response.json();   
    if (response.status === 200) {
      dispatch(addingManyTask(data.tasks));
      localStorage.setItem('refresh_token', JSON.stringify(data.token));
    }
    
    if (response.status === 201) {
      const refreshToken = data;
      localStorage.setItem('refresh_token', JSON.stringify(refreshToken));
      window.location.reload();
    }

    if (response.status === 401) {
      window.location.assign('/');
    }
  } catch (e) {
    return console.log(e);
  }
}