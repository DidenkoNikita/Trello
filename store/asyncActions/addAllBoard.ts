import { ThunkAction } from "redux-thunk";
import { PayloadAction } from "@reduxjs/toolkit";

import { RooteState } from "../store";
import { addingManyBoard } from "../counter/boardSlice";
import { ReadBoardsUrl } from "@/url/readBoardsUrl";

interface Board {
  id: number;
  title: string;
}

export const addAllBoard = (): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<Board[]> 
> => async (dispatch): Promise<void | unknown> => {
  const user_id: number | string = JSON.parse(localStorage.getItem('user_id') || '')!;
  const refreshToken: string = JSON.parse(localStorage.getItem('refresh_token') || '');
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${refreshToken}`,
  };

  try {
    const response: Response = await fetch(`${ReadBoardsUrl}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({user_id})
    });
    const data = await response.json();       
    if(response.status === 200) {
      dispatch(addingManyBoard(data.boards));
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
};