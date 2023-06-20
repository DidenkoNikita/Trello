import { ThunkAction } from "redux-thunk";
import { PayloadAction } from "@reduxjs/toolkit";
import { RooteState } from "../store";
import { addingManyBoard } from "../counter/boardSlice";
import { request } from "@/request/request";

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
  try {
    const data = await request('read_boards', {}, 'POST');
    if (data !== null) {      
      dispatch(addingManyBoard(data.boards));
    }
  } catch(e) {
    return console.log(e);
  }
};