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

interface User {
  user_id: number;
  full_name: string;
  refresh_token: string;
}

interface State {
  boards: Board[];
  tasks: Task[];
  user: User[]
}


export const initialState: State = {
  boards: [],
  tasks: [],
  user: []
};