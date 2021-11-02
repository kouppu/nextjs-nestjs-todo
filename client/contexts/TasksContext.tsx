import { FC, Dispatch, createContext, useReducer, useContext } from 'react';
import { Task } from 'src/types/domain/Task';

type State = Task[];
type Action =
  | { type: 'ADD_TASKS'; value: Task[] }
  | { type: 'ADD_TASK'; value: Task }
  | { type: 'UPDATE_TASK'; value: Task }
  | { type: 'DELETE_TASK'; value: number };

type TasksDispatch = Dispatch<Action>;

const initialState: State = [];

const TasksStateContext = createContext<State>(initialState);
const TasksDispatchContext = createContext<TasksDispatch | undefined>(
  undefined
);

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'ADD_TASKS': {
      return [...state, ...action.value];
    }
    case 'ADD_TASK': {
      state.unshift(action.value);

      return [...state];
    }
    case 'UPDATE_TASK': {
      return state.map((task) => {
        if (task.id === action.value.id) {
          task = action.value;
        }

        return task;
      });
    }
    case 'DELETE_TASK': {
      state.forEach((task, index) => {
        if (task.id === action.value) {
          state.splice(index, 1);
        }
      });

      return [...state];
    }
  }
};

export const useTasksState = () => {
  const state = useContext(TasksStateContext);
  if (!state) {
    throw new Error('TasksStateContext not found');
  }

  return state;
};

export const useTasksDispatch = () => {
  const dispatch = useContext(TasksDispatchContext);
  if (!dispatch) {
    throw new Error('TasksDispatchContext not found');
  }

  return dispatch;
};

export const TasksContextProvider: FC = ({ children }) => {
  const [tasks, dispatch] = useReducer(reducer, initialState);

  return (
    <TasksDispatchContext.Provider value={dispatch}>
      <TasksStateContext.Provider value={tasks}>
        {children}
      </TasksStateContext.Provider>
    </TasksDispatchContext.Provider>
  );
};
