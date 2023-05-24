interface Task {
  id: number;
  completed: boolean 
  title: string;
  board_id: number;
}

interface Board {
  id: number;
  title: string;
}

interface State {
  boards: Board[];
  tasks: Task[];
}


export const initialState: State = {
  boards: [],
  tasks: [],
};