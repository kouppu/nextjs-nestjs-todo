import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { TasksContextProvider } from 'contexts/TasksContext';
import { useTasksDispatch } from 'contexts/TasksContext';
import TaskInteractor from 'src/interactors/Task/TaskInteractor';
import AuthService from 'src/services/AuthService';
import MeInteractor from 'src/interactors/Me/MeInteractor';
import { Me } from 'src/types/domain/Me';
import HomeTemplate from 'components/templates/HomeTemplate';

const Home: NextPage = () => {
  const router = useRouter();
  const dispatch = useTasksDispatch();
  const [user, setUser] = useState<Me | undefined>();

  useEffect(() => {
    const fetchUser = async () => {
      const _user = await new MeInteractor(
        new AuthService().getToken()
      ).getMe();
      if (_user === undefined) {
        router.push('/login');

        return;
      }
      setUser(_user);
    };
    fetchUser();
  }, [router]);

  useEffect(() => {
    if (user === undefined) {
      return;
    }

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
  }, [dispatch, user]);

  return (
    <TasksContextProvider>
      <HomeTemplate />
    </TasksContextProvider>
  );
};

export default Home;
