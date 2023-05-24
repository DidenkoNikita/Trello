import { ThunkAction } from "redux-thunk";
import { PayloadAction } from "@reduxjs/toolkit";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

import { RooteState } from "../store";
import { addingABoard } from "../counter/boardSlice";

interface CreateBoard {
  id: number;
  title: string;
}

export const addBoard = (id: number,title: string, router: AppRouterInstance): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<CreateBoard> 
> => async (dispatch): Promise<void | unknown> => {
  const API_URL = process.env.API_URL;
  const user_id: number | string = JSON.parse(localStorage.getItem('user_id') || '')!; 
  const refreshToken: string = JSON.parse(localStorage.getItem('refresh_token') || '');  

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${refreshToken}`,
  };

  try {
    const response: Response = await fetch(`${API_URL}/boards`, {
      method: 'POST',
      headers,
      body: JSON.stringify({title, user_id})
    });
    const data = await response.json();   
    if (response.status === 200) {
      dispatch(addingABoard(data.board));
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
}