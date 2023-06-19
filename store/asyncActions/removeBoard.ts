import { ThunkAction } from "redux-thunk";
import { PayloadAction } from "@reduxjs/toolkit";

import { removeBoard } from "../counter/boardSlice";
import { RooteState } from "../store";
import { request } from "@/request/request";

interface Board {
  id: number;
}

export const boardRemove = (id: number): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<Board> 
> => async (dispatch): Promise<void> => {
  try {
    const data = await request('boards', {id}, 'DELETE');
    if (data === null) {
      console.log('иди отсюда');
    } else {
      dispatch(removeBoard(data));
    }
  } catch(e) {
    return console.log(e);
  }
};