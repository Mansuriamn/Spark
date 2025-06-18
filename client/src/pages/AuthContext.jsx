import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [cartCourses, setCartCourses] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    const storedToken = localStorage.getItem('authToken');
    const storedCourses = localStorage.getItem('enrolledCourses');
    const storedCart = localStorage.getItem('cartCourses');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      if (storedCourses) {
        setEnrolledCourses(JSON.parse(storedCourses));
      }
      if (storedCart) {
        setCartCourses(JSON.parse(storedCart));
      }
    }
  }, []);

  const isAuthenticated = !!user && !!token;

  const login = (userData, authToken, userCourses = [], cart = []) => {
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('authToken', authToken);
    localStorage.setItem('enrolledCourses', JSON.stringify(userCourses));
    localStorage.setItem('cartCourses', JSON.stringify(cart));
    setUser(userData);
    setToken(authToken);
    setEnrolledCourses(userCourses);
    setCartCourses(cart);
  };

  const logout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('authToken');
    localStorage.removeItem('enrolledCourses');
    localStorage.removeItem('cartCourses');
    setUser(null);
    setToken(null);
    setEnrolledCourses([]);
    setCartCourses([]);
  };

  const updateUser = (updatedUser) => {
    localStorage.setItem('userData', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const updateEnrolledCourses = (newCourses) => {
    localStorage.setItem('enrolledCourses', JSON.stringify(newCourses));
    setEnrolledCourses(newCourses);
  };

  const updateCartCourses = (newCart) => {
    localStorage.setItem('cartCourses', JSON.stringify(newCart));
    setCartCourses(newCart);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
        enrolledCourses,
        cartCourses,
        login,
        logout,
        updateUser,
        updateEnrolledCourses,
        updateCartCourses,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
