import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { TasksContextProvider } from 'contexts/TasksContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TasksContextProvider>
      <Component {...pageProps} />
    </TasksContextProvider>
  );
}
export default MyApp;
