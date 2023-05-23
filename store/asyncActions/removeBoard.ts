import { ThunkAction } from "redux-thunk";
import { PayloadAction } from "@reduxjs/toolkit";

import { RooteState } from "../store";
import { removeBoard } from "../counter/boardSlice";
import { BoardsUrl } from "@/url/boardsUrl";

interface Board {
  id: number;
}

export const boardRemove = (id: number): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<Board> 
> => async (dispatch): Promise<void | unknown> => {
  const Id: number = id;  
  const user_id: number | string = JSON.parse(localStorage.getItem('user_id') || '')!;
  const refreshToken: string = JSON.parse(localStorage.getItem('refresh_token') || '');

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${refreshToken}`,
  };

  try {
    const response: Response = await fetch(`${BoardsUrl}`, {
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
      alert('Попробуй ещё раз');
    }

    if (response.status === 401) {
      window.location.assign('/');
    }
  } catch (e) {
    return console.log(e);
  }
};