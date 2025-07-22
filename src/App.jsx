import { Suspense, lazy } from 'react';

import Spinner from './components/UI/Spinner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { parseInitialization, parseUrl } from './parse/config';
import MainPage from './components/MainPage';
import useAuthState from './parse/useAuthState';

const Login = lazy(() => import('./components/UserLogin/Login'));

const queryClient = new QueryClient();

function App() {
  const { sessionToken, handleLogin } = useAuthState();

  if (!sessionToken) {
    return (
      <>
        {!sessionToken && (
          <Suspense fallback={<Spinner />}>
            <Login onLogin={handleLogin} />
          </Suspense>
        )}
      </>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <MainPage />
    </QueryClientProvider>
  );
}

export default App;
