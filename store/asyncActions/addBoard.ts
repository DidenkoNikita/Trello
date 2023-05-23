import { ThunkAction } from "redux-thunk";
import { PayloadAction } from "@reduxjs/toolkit";

import { RooteState } from "../store";
import { addingABoard } from "../counter/boardSlice";
import { BoardsUrl } from "@/url/boardsUrl";

interface CreateBoard {
  id: number;
  title: string;
}

export const addBoard = (id : null, title: string): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<CreateBoard> 
> => async (dispatch): Promise<void | unknown> => {
  const user_id: number | string = JSON.parse(localStorage.getItem('user_id') || '')!; 
  const refreshToken: string = JSON.parse(localStorage.getItem('refresh_token') || '');

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${refreshToken}`,
  };

  try {
    const response: Response = await fetch(`${BoardsUrl}`, {
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
      alert('Попробуй ещё раз');
    }

    if (response.status === 401) {
      window.location.assign('/');
    }
  } catch (e) {
    return console.log(e);
  }
}