import { ThunkAction } from "redux-thunk";
import { PayloadAction } from "@reduxjs/toolkit";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

import { RooteState } from "../store";
import { taskComplete } from "../counter/taskSlice";

interface Complet {
  id: number;
  completed: boolean;
}

export const completTask = (id: number, completed: boolean, router: AppRouterInstance): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<Complet>
> => async (dispatch): Promise<void | unknown> => {
  const API_URL = process.env.API_URL;
  const ID: number = id;
  const Completed: boolean = completed;
  const user_id: number | string = JSON.parse(localStorage.getItem('user_id') || '')!;
  const refreshToken: string = JSON.parse(localStorage.getItem('refresh_token') || '');
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${refreshToken}`,
  };

  try {
    const response: Response = await fetch(`${API_URL}/tasks_completed`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ id: ID, completed: Completed, user_id})
    });
    const data = await response.json();
    const { id, completed } = data.task;
    if (response.status === 200) {
      dispatch(taskComplete({ id, completed }));
      localStorage.setItem('refresh_token', JSON.stringify(data.token));
    }

    if (response.status === 201) {
      const refreshToken = data;
      localStorage.setItem('refresh_token', JSON.stringify(refreshToken));
    }

    if (response.status === 401) {
      router.push('/401');
    }
  } catch (e) {
    return console.log(e);
  }
};