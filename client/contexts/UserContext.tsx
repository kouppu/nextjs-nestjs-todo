import { FC, Dispatch, createContext, useReducer, useContext } from 'react';
import { User } from 'src/types/domain/User';

type State = User | undefined;
type Action = { type: 'ADD_USER'; value: User } | { type: 'DELETE_USER' };

type UserDispatch = Dispatch<Action>;

const initialState: State = undefined;
const initalDispatcn = () => {
  return;
};

const UserStateContext = createContext<State>(initialState);
const UserDispatchContext = createContext<UserDispatch>(initalDispatcn);

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'ADD_USER': {
      return action.value;
    }
    case 'DELETE_USER': {
      return undefined;
    }
    default:
      state;
  }
};

export const useUserState = () => {
  const state = useContext(UserStateContext);

  return state;
};

export const useUserDispatch = () => {
  const dispatch = useContext(UserDispatchContext);
  if (!dispatch) {
    throw new Error('UserDispatchContext not found');
  }

  return dispatch;
};

export const UserContextProvider: FC = ({ children }) => {
  const [user, dispatch] = useReducer(reducer, initialState);

  return (
    <UserDispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={user}>
        {children}
      </UserStateContext.Provider>
    </UserDispatchContext.Provider>
  );
};
