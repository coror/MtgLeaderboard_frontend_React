import Parse from 'parse';
import { useEffect, useState } from 'react';

export default function useAuthState() {
  const [state, setState] = useState({
    sessionToken: localStorage.getItem('sessionToken') || null,
    userRole: null,
  });

  const handleLogin = async (token) => {
    setState((prev) => ({ ...prev, sessionToken: token }));

    await fetchUserRole()
  };

  const handleLogout = () => {
    setState({
      sessionToken: null,
      userRole: null,
    });

    localStorage.removeItem('sessionToken');
    Parse.User.logOut();
  };

  const fetchUserRole = async () => {
    try {
      const user = Parse.User.current();
      if (user) {
       await user.fetch();
       const role = user.get('roleName')
        setState((prev) => ({ ...prev, userRole: role }));
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };

useEffect(() => {
  if (state.sessionToken) {
    fetchUserRole()
  }
}, [state.sessionToken])

  return { ...state, handleLogin, handleLogout };
}
