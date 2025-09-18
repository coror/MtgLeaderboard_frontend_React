import { createContext, useContext } from 'react';
import useAuthState from '../hooks/useAuthState';

type AuthStateProps = {
  sessionToken: string | null;
  userRole: string | null;
  login: (email: string, password: string) => Promise<void>;
  handleLogout: () => void;
};

export const AuthContext = createContext<AuthStateProps>({
  sessionToken: null,
  userRole: null,
  login: async () => {}, // Provide a default empty function
  handleLogout: () => {}, // Provide a default empty function
});

export default function AuthContextProvider({ children }) {
  const auth = useAuthState();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
