import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { TasksContextProvider } from 'contexts/TasksContext';
import AuthService from 'src/services/AuthService';
import MeInteractor from 'src/interactors/Me/MeInteractor';
import { Me } from 'src/types/domain/Me';
import HomeTemplate from 'components/templates/HomeTemplate';

const Home: NextPage = () => {
  const router = useRouter();
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

  return (
    <TasksContextProvider>
      <HomeTemplate />
    </TasksContextProvider>
  );
};

export default Home;
