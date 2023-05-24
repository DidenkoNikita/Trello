import { ThunkAction } from "redux-thunk";
import { PayloadAction } from "@reduxjs/toolkit";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

import { RooteState } from "../store";
import { removeBoard } from "../counter/boardSlice";

interface Board {
  id: number;
}

export const boardRemove = (id: number, router: AppRouterInstance): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<Board> 
> => async (dispatch): Promise<void | unknown> => {
  const API_URL = process.env.API_URL;
  const Id: number = id;  
  const user_id: number | string = JSON.parse(localStorage.getItem('user_id') || '')!;
  const refreshToken: string = JSON.parse(localStorage.getItem('refresh_token') || '');

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${refreshToken}`,
  };

  try {
    const response: Response = await fetch(`${API_URL}/boards`, {
      method: 'DELETE',
      headers,
      body: JSON.stringify({id: Id, user_id})
    });
    const data = await response.json();    
    const {id} = data; 
    if (response.status === 200) {
      dispatch(removeBoard({id}));
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