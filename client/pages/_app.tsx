import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { TasksContextProvider } from 'contexts/TasksContext';
import { UserContextProvider } from 'contexts/UserContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <TasksContextProvider>
        <Component {...pageProps} />
      </TasksContextProvider>
    </UserContextProvider>
  );
}
export default MyApp;
