import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AuthService from 'src/services/AuthService';
import MeInteractor from 'src/interactors/Me/MeInteractor';
import TaskInteractor from 'src/interactors/Task/TaskInteractor';
import { Me } from 'src/types/domain/Me';
import HomeTemplate from 'components/templates/HomeTemplate';
import { useTasksDispatch } from 'contexts/TasksContext';

const Home: NextPage = () => {
  const router = useRouter();
  const tasksDispatch = useTasksDispatch();
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
