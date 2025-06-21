import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [cartCourses, setCartCourses] = useState([]);

  const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);
  const [cartCourseIds, setCartCourseIds] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    const storedToken = localStorage.getItem('authToken');
    const storedProfile = localStorage.getItem('userProfile');
    const storedCourses = localStorage.getItem('enrolledCourses');
    const storedCart = localStorage.getItem('cartCourses');
    const storedCourseIds = localStorage.getItem('enrolledCourseIds');
    const storedCartIds = localStorage.getItem('cartCourseIds');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      if (storedProfile) setUserProfile(JSON.parse(storedProfile));
      if (storedCourses) setEnrolledCourses(JSON.parse(storedCourses));
      if (storedCart) setCartCourses(JSON.parse(storedCart));
      if (storedCourseIds) setEnrolledCourseIds(JSON.parse(storedCourseIds));
      if (storedCartIds) setCartCourseIds(JSON.parse(storedCartIds));
    }
  }, []);

  const isAuthenticated = !!user && !!token;

  const login = (
    userData,
    authToken,
    userCourses = [],
    cart = [],
    profile = null
  ) => {
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('authToken', authToken);
    localStorage.setItem('enrolledCourses', JSON.stringify(userCourses));
    localStorage.setItem('cartCourses', JSON.stringify(cart));

    const courseIds = userCourses.map((c) => c._id);
    const cartIds = cart.map((c) => c._id);

    localStorage.setItem('enrolledCourseIds', JSON.stringify(courseIds));
    localStorage.setItem('cartCourseIds', JSON.stringify(cartIds));

    setUser(userData);
    setToken(authToken);
    setUserProfile(profile || null);
    setEnrolledCourses(userCourses);
    setCartCourses(cart);
    setEnrolledCourseIds(courseIds);
    setCartCourseIds(cartIds);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setToken(null);
    setUserProfile(null);
    setEnrolledCourses([]);
    setCartCourses([]);
    setEnrolledCourseIds([]);
    setCartCourseIds([]);
  };

  const updateUser = (updatedUser) => {
    localStorage.setItem('userData', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const updateUserProfile = (profile) => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setUserProfile(profile);
  };

  const updateEnrolledCourses = (newCourses) => {
    localStorage.setItem('enrolledCourses', JSON.stringify(newCourses));
    setEnrolledCourses(newCourses);

    const ids = newCourses.map((c) => c._id);
    localStorage.setItem('enrolledCourseIds', JSON.stringify(ids));
    setEnrolledCourseIds(ids);
  };

  const updateCartCourses = (newCart) => {
    localStorage.setItem('cartCourses', JSON.stringify(newCart));
    setCartCourses(newCart);

    const ids = newCart.map((c) => c._id);
    localStorage.setItem('cartCourseIds', JSON.stringify(ids));
    setCartCourseIds(ids);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
        userProfile,
        enrolledCourses,
        cartCourses,
        enrolledCourseIds,
        cartCourseIds,
        login,
        logout,
        updateUser,
        updateUserProfile,
        updateEnrolledCourses,
        updateCartCourses,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
