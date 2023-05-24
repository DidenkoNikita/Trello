import { ThunkAction } from "redux-thunk";
import { PayloadAction } from "@reduxjs/toolkit";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

import { RooteState } from "../store";
import { addingManyBoard } from "../counter/boardSlice";

interface Board {
  id: number;
  title: string;
}

export const addAllBoard = (router: AppRouterInstance): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<Board[]> 
> => async (dispatch): Promise<void | unknown> => {

  const API_URL = process.env.API_URL;
  const user_id = localStorage.getItem('user_id');
  const refreshToken = localStorage.getItem('refresh_token');

  if (!user_id || !refreshToken) {
    router.push('/401');
  } else {
    const id = JSON.parse(user_id || '');
    const token = JSON.parse(refreshToken || '');

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  
    try {
      const response: Response = await fetch(`${API_URL}/read_boards`, {
        method: 'POST',
        headers,
        body: JSON.stringify({user_id: id})
      });
      const data = await response.json();       
      if(response.status === 200) {
        dispatch(addingManyBoard(data.boards));
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
};