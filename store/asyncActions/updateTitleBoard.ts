import { ThunkAction } from "redux-thunk";
import { PayloadAction } from "@reduxjs/toolkit";

import { RooteState } from "../store";
import { updateTitleBoard } from "../counter/boardSlice";
import { request } from "@/request/request";

interface Board {
  id: number;
  title: string
}

export const titleBoardUpdate = (id: number, title: string): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<Board>
> => async (dispatch): Promise<void> => {
  try {
    const data = await request('update_boards', {id, title}, 'POST');
    if (data === null) {
      console.log('иди отсюда');
    } else {
      dispatch(updateTitleBoard(data.board));
    }
  } catch(e) {
    return console.log(e);
  }
};