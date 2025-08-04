// eslint-disable-next-line no-unused-vars
import { parseInitialization, parseUrl } from './parse/config';
import { Suspense, lazy } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Spinner from './components/atoms/Spinner';
import MainPage from './components/pages/MainPage';
import { useAuth } from './store/auth-context';
import AuthContextProvider from './store/auth-context';
import LeaderboardContextProvider from './store/leaderboard-context';


const Login = lazy(() => import('./components/pages/Login'));

const queryClient = new QueryClient();

function AppContent() {
  const { sessionToken, handleLogin } = useAuth();

  if (!sessionToken) {
    return (
      <Suspense fallback={<Spinner />}>
        <Login onLogin={handleLogin} />
      </Suspense>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <MainPage />
    </QueryClientProvider>
  );
}

export default function App() {
  return (
    <AuthContextProvider>
      <LeaderboardContextProvider>
        <AppContent />
      </LeaderboardContextProvider>
    </AuthContextProvider>
  );
}
