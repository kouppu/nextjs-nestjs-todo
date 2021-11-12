import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import AuthService from 'src/services/AuthService';
import MeInteractor from 'src/interactors/Me/MeInteractor';
import TaskInteractor from 'src/interactors/Task/TaskInteractor';
import HomeTemplate from 'components/templates/HomeTemplate';
import { useTasksDispatch } from 'contexts/TasksContext';
import { useUserDispatch } from 'contexts/UserContext';

const Home: NextPage = () => {
  const router = useRouter();
  const tasksDispatch = useTasksDispatch();
  const userDispatch = useUserDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const _user = await new MeInteractor(
        new AuthService().getToken()
      ).getMe();
      if (_user === undefined) {
        router.push('/login');

        return;
      }
      userDispatch({ type: 'ADD_USER', value: _user });
    };
    fetchUser();
  }, [userDispatch, router]);

  useEffect(() => {
    const fetchTasks = async () => {
      const _tasks = await new TaskInteractor(
        new AuthService().getToken()
      ).getTasks();

      if (_tasks === undefined) {
        return;
      }
      tasksDispatch({ type: 'ADD_TASKS', value: _tasks });
    };
    fetchTasks();
  }, [tasksDispatch]);

  return <HomeTemplate />;
};

export default Home;
