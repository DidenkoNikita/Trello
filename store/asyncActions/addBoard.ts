import { ThunkAction } from "redux-thunk";
import { PayloadAction } from "@reduxjs/toolkit";
import { RooteState } from "../store";
import { addingABoard } from "../counter/boardSlice";
import { request } from "@/request/request";

interface CreateBoard {
  id: number;
  title: string;
}

export const addBoard = (id: number,title: string): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<CreateBoard> 
> => async (dispatch): Promise<void> => {
  try {
    const data = await request('boards', {id, title}, 'POST');
    if (data === null) {
      console.log('иди отсюда');
    } else {
      dispatch(addingABoard(data.board));
    }
  } catch(e) {
    return console.log(e);
  }
}