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

  const [currentLessonId, setCurrentLessonId] = useState(""); 

  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    const storedToken = localStorage.getItem('authToken');
    const storedProfile = localStorage.getItem('userProfile');
    const storedCourses = localStorage.getItem('enrolledCourses');
    const storedCart = localStorage.getItem('cartCourses');
    const storedCourseIds = localStorage.getItem('enrolledCourseIds');
    const storedCartIds = localStorage.getItem('cartCourseIds');
    const storedLessonId = localStorage.getItem('currentLessonId');

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);

        if (storedProfile) {
          setUserProfile(JSON.parse(storedProfile));
        }
        if (storedCourses) {
          setEnrolledCourses(JSON.parse(storedCourses));
        }
        if (storedCart) {
          setCartCourses(JSON.parse(storedCart));
        }
        if (storedCourseIds) {
          setEnrolledCourseIds(JSON.parse(storedCourseIds));
        }
        if (storedCartIds) {
          setCartCourseIds(JSON.parse(storedCartIds));
        }
        if (storedLessonId) {
          setCurrentLessonId(storedLessonId);
        }
      } catch (err) {
        localStorage.clear();
      }
    }
  }, []);

  const isAuthenticated = !!user && !!token;

  const login = (userData, authToken, userCourses = [], cart = [], profile = null) => {
    const normalizedUserCourses = userCourses.map(course => ({
      ...course,
      _id: String(course._id)
    }));
    const normalizedCart = cart.map(course => ({
      ...course,
      _id: String(course._id)
    }));

    const courseIds = normalizedUserCourses.map(c => String(c._id));
    const cartIds = normalizedCart.map(c => String(c._id));

    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('authToken', authToken);
    localStorage.setItem('enrolledCourses', JSON.stringify(normalizedUserCourses));
    localStorage.setItem('cartCourses', JSON.stringify(normalizedCart));
    localStorage.setItem('enrolledCourseIds', JSON.stringify(courseIds));
    

    localStorage.setItem('cartCourseIds', JSON.stringify(cartIds));
    if (profile) {
      localStorage.setItem('userProfile', JSON.stringify(profile));
    }

    setUser(userData);
    setToken(authToken);
    setUserProfile(profile || null);
    setEnrolledCourses(normalizedUserCourses);
    setCartCourses(normalizedCart);
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
    setCurrentLessonId(null);
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
    const normalizedCourses = newCourses.map(course => ({
      ...course,
      _id: String(course._id)
    }));
    const ids = normalizedCourses.map(c => String(c._id));

    localStorage.setItem('enrolledCourses', JSON.stringify(normalizedCourses));
    localStorage.setItem('enrolledCourseIds', JSON.stringify(ids));
    setEnrolledCourses(normalizedCourses);
    setEnrolledCourseIds(ids);
  };

  const updateCartCourses = (newCart) => {
    const normalizedCart = newCart.map(course => ({
      ...course,
      _id: String(course._id)
    }));
    const ids = normalizedCart.map(c => String(c._id));

    localStorage.setItem('cartCourses', JSON.stringify(normalizedCart));
    localStorage.setItem('cartCourseIds', JSON.stringify(ids));
    setCartCourses(normalizedCart);
    setCartCourseIds(ids);
  };

  const isCourseEnrolled = (courseId) => {
    return enrolledCourseIds.includes(String(courseId));
  };

  const isCourseInCart = (courseId) => {
    return cartCourseIds.includes(String(courseId));
  };

  const updateCurrentLessonId = (lessonId) => {
    setCurrentLessonId(lessonId);
    localStorage.setItem('currentLessonId', lessonId);
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
        currentLessonId,
        updateCurrentLessonId,
        login,
        logout,
        updateUser,
        updateUserProfile,
        updateEnrolledCourses,
        updateCartCourses,
        isCourseEnrolled,
        isCourseInCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
