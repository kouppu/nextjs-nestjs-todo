import React, { useEffect } from 'react';
import List from '@mui/material/List';
import TaskContent from 'components/molecules/TaskContent';
import { useTasksState, useTasksDispatch } from 'contexts/TasksContext';
import AuthService from 'src/services/AuthService';
import TaskInteractor from 'src/interactors/Task/TaskInteractor';

const TaskList = () => {
  const tasks = useTasksState();
  const dispatch = useTasksDispatch();

  useEffect(() => {
    const fetchTasks = async () => {
      const _tasks = await new TaskInteractor(
        new AuthService().getToken()
      ).getTasks();

      if (_tasks === undefined) {
        return;
      }
      dispatch({ type: 'ADD_TASKS', value: _tasks });
    };
    fetchTasks();
  }, [dispatch]);

  const completeTask = async (id: number) => {
    const result = await new TaskInteractor(
      new AuthService().getToken()
    ).updateCompleted(id);

    if (result === undefined) {
      return;
    }

    dispatch({ type: 'UPDATE_TASK', value: result });
  };

  const cancelCompletedTask = async (id: number) => {
    const result = await new TaskInteractor(
      new AuthService().getToken()
    ).initializeStatus(id);

    if (result === undefined) {
      return;
    }

    dispatch({ type: 'UPDATE_TASK', value: result });
  };

  const deleteTask = async (id: number) => {
    const result = await new TaskInteractor(
      new AuthService().getToken()
    ).deleteTask(id);

    if (result === false) {
      return;
    }

    dispatch({ type: 'DELETE_TASK', value: id });
  };

  return (
    <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {tasks.map((task) => {
        return (
          <TaskContent
            key={task.id}
            task={task}
            completeTaskEvent={completeTask}
            cancelCompletedTaskEvent={cancelCompletedTask}
            delteTaskEvent={deleteTask}
          />
        );
      })}
    </List>
  );
};

export default TaskList;
