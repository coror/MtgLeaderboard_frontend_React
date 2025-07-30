import { createContext, useContext } from 'react';
import useAuthState from '../hooks/useAuthState';

export const AuthContext = createContext({});

export default function AuthContextProvider({ children }) {
  const auth = useAuthState();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
