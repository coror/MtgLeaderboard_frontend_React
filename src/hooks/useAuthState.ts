import Parse from 'parse/dist/parse.min.js';
import { useEffect, useState } from 'react';

interface AuthState {
  sessionToken: string | null;
  userRole: string | null;
}

export default function useAuthState() {
  const [state, setState] = useState<AuthState>({
    sessionToken: localStorage.getItem('sessionToken') || null,
    userRole: null,
  });

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const user = await Parse.User.logIn(email, password);
      const token = user.getSessionToken();
      localStorage.setItem('sessionToken', token);
      setState({
        sessionToken: token,
        userRole: user.get('roleName') || null,
      });
    } catch (error) {
      throw new Error(
        `Invalid email or password: ${(error as Error).message || error}`
      );
    }
  };

  const handleLogout = (): void => {
    setState({
      sessionToken: null,
      userRole: null,
    });
    localStorage.removeItem('sessionToken');
    Parse.User.logOut();
  };

  const fetchUserRole = async (): Promise<void> => {
    try {
      const user = Parse.User.current();
      if (user) {
        await user.fetch();
        const role = user.get('roleName');
        setState((prev) => ({ ...prev, userRole: role }));
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };

  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem('sessionToken');
      if (token && !Parse.User.current()) {
        try {
          const user = await Parse.User.become(token);
          setState({
            sessionToken: token,
            userRole: user.get('roleName') || null,
          });
        } catch (err) {
          console.error('Failed to restore session:', err);
          handleLogout();
        }
      }
    };
    restoreSession();
  }, []);

  useEffect(() => {
    if (state.sessionToken && !state.userRole) {
      fetchUserRole();
    }
  }, [state.sessionToken, state.userRole]);

  return { ...state, login, handleLogout };
}
