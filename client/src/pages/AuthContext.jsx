
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    const storedToken = localStorage.getItem('authToken');
    const storedCourses = localStorage.getItem('enrolledCourses');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      if (storedCourses) {
        setEnrolledCourses(JSON.parse(storedCourses));
      }
    }
  }, []);

  const isAuthenticated = !!user && !!token;

  const login = (userData, authToken, userCourses = []) => {
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('authToken', authToken);
    localStorage.setItem('enrolledCourses', JSON.stringify(userCourses));
    setUser(userData);
    setToken(authToken);
    setEnrolledCourses(userCourses);
  };

  const logout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('authToken');
    localStorage.removeItem('enrolledCourses');
    setUser(null);
    setToken(null);
    setEnrolledCourses([]);
  };

  const updateUser = (updatedUser) => {
    localStorage.setItem('userData', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const updateEnrolledCourses = (newCourses) => {
    localStorage.setItem('enrolledCourses', JSON.stringify(newCourses));
    setEnrolledCourses(newCourses);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      token,
      enrolledCourses,
      login,
      logout,
      updateUser,
      updateEnrolledCourses
    }}>
      {children}
    </AuthContext.Provider>
  );
};
