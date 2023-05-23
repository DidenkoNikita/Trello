import { ThunkAction } from "redux-thunk";
import { PayloadAction } from "@reduxjs/toolkit";

import { RooteState } from "../store";
import { updateTitleBoard } from "../counter/boardSlice";
import { UpdateTitleBoardUrl } from "@/url/updateTitleBoardUrl";

interface Board {
  id: number;
  title: string
}

export const titleBoardUpdate = (selectId: number | null, selectTitle: string): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<Board>
> => async (dispatch): Promise<void | unknown> => {
  const user_id: number | string = JSON.parse(localStorage.getItem('user_id') || '')!;
  const refreshToken: string = JSON.parse(localStorage.getItem('refresh_token') || '');

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${refreshToken}`,
  };

  try {
    const response: Response = await fetch(`${UpdateTitleBoardUrl}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ id: selectId, title: selectTitle, user_id })
    });
    const data = await response.json();
    const { id, title } = data.board;
    if (response.status === 200) {
      dispatch(updateTitleBoard({ id, title }));
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