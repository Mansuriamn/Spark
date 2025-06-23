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

  // Debug state
  const [debugInfo, setDebugInfo] = useState([]);

  // Helper function to add debug information
  const addDebugInfo = (message, data = null) => {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = data ? `${message} - Data: ${JSON.stringify(data, null, 2)}` : message;
    console.log(`[AuthContext] ${logMessage}`);
    setDebugInfo(prev => [...prev, `${timestamp}: ${message}`].slice(-20));
  };

  // Enhanced logging function for course operations
  const logCourseOperation = (operation, courseData) => {
    console.log(`[${operation}] Course Data:`, {
      id: courseData?._id,
      title: courseData?.title,
      type: typeof courseData?._id,
      allKeys: courseData ? Object.keys(courseData) : 'no data'
    });
  };

  useEffect(() => {
    addDebugInfo("AuthProvider initializing...");
    
    try {
      const storedUser = localStorage.getItem('userData');
      const storedToken = localStorage.getItem('authToken');
      const storedProfile = localStorage.getItem('userProfile');
      const storedCourses = localStorage.getItem('enrolledCourses');
      const storedCart = localStorage.getItem('cartCourses');
      const storedCourseIds = localStorage.getItem('enrolledCourseIds');
      const storedCartIds = localStorage.getItem('cartCourseIds');

      addDebugInfo(`Found stored data`, {
        user: !!storedUser,
        token: !!storedToken,
        profile: !!storedProfile,
        courses: !!storedCourses,
        cart: !!storedCart,
        courseIds: !!storedCourseIds,
        cartIds: !!storedCartIds
      });

      if (storedUser && storedToken) {
        try {
          const userData = JSON.parse(storedUser);
          addDebugInfo(`Parsed user data: ${userData.email || userData.username || 'no identifier'}`);
          
          setUser(userData);
          setToken(storedToken);
          
          if (storedProfile) {
            try {
              const profileData = JSON.parse(storedProfile);
              setUserProfile(profileData);
              addDebugInfo("User profile loaded successfully", profileData);
            } catch (profileError) {
              addDebugInfo(`Error parsing user profile: ${profileError.message}`);
            }
          }
          
          if (storedCourses) {
            try {
              const courses = JSON.parse(storedCourses);
              setEnrolledCourses(courses);
              addDebugInfo(`Loaded enrolled courses`, {
                count: courses.length,
                firstCourseId: courses[0]?._id,
                firstCourseIdType: typeof courses[0]?._id,
                allIds: courses.map(c => ({ id: c._id, type: typeof c._id }))
              });
              
              // Log each course for debugging
              courses.forEach((course, index) => {
                logCourseOperation(`ENROLLED_COURSE_${index}`, course);
              });
              
            } catch (coursesError) {
              addDebugInfo(`Error parsing enrolled courses: ${coursesError.message}`);
            }
          }
          
          if (storedCart) {
            try {
              const cart = JSON.parse(storedCart);
              setCartCourses(cart);
              addDebugInfo(`Loaded cart courses`, {
                count: cart.length,
                firstCourseId: cart[0]?._id,
                allIds: cart.map(c => ({ id: c._id, type: typeof c._id }))
              });
            } catch (cartError) {
              addDebugInfo(`Error parsing cart courses: ${cartError.message}`);
            }
          }
          
          if (storedCourseIds) {
            try {
              const courseIds = JSON.parse(storedCourseIds);
              setEnrolledCourseIds(courseIds);
              addDebugInfo(`Loaded enrolled course IDs`, {
                count: courseIds.length,
                ids: courseIds,
                types: courseIds.map(id => typeof id)
              });
            } catch (idsError) {
              addDebugInfo(`Error parsing enrolled course IDs: ${idsError.message}`);
            }
          }
          
          if (storedCartIds) {
            try {
              const cartIds = JSON.parse(storedCartIds);
              setCartCourseIds(cartIds);
              addDebugInfo(`Loaded cart course IDs`, {
                count: cartIds.length,
                ids: cartIds,
                types: cartIds.map(id => typeof id)
              });
            } catch (cartIdsError) {
              addDebugInfo(`Error parsing cart course IDs: ${cartIdsError.message}`);
            }
          }
          
          addDebugInfo("Authentication state restored successfully");
        } catch (userError) {
          addDebugInfo(`Error parsing stored user data: ${userError.message}`);
          // Clear corrupted data
          localStorage.removeItem('userData');
          localStorage.removeItem('authToken');
        }
      } else {
        addDebugInfo("No stored authentication data found");
      }
    } catch (storageError) {
      addDebugInfo(`Error accessing localStorage: ${storageError.message}`);
    }
    
    addDebugInfo("AuthProvider initialization complete");
  }, []);

  const isAuthenticated = !!user && !!token;

  const login = (
    userData,
    authToken,
    userCourses = [],
    cart = [],
    profile = null
  ) => {
    try {
      addDebugInfo(`Login attempt for user: ${userData.email || userData.username || 'unknown'}`);
      
      // Log incoming course data
      addDebugInfo('Login course data received', {
        enrolledCount: userCourses.length,
        cartCount: cart.length,
        enrolledIds: userCourses.map(c => ({ id: c._id, type: typeof c._id })),
        cartIds: cart.map(c => ({ id: c._id, type: typeof c._id }))
      });

      // Ensure all IDs are strings for consistency
      const normalizedUserCourses = userCourses.map(course => ({
        ...course,
        _id: String(course._id) // Convert to string
      }));
      
      const normalizedCart = cart.map(course => ({
        ...course,
        _id: String(course._id) // Convert to string
      }));

      const courseIds = normalizedUserCourses.map((c) => String(c._id));
      const cartIds = normalizedCart.map((c) => String(c._id));

      addDebugInfo('Normalized IDs', {
        courseIds,
        cartIds,
        courseIdTypes: courseIds.map(id => typeof id),
        cartIdTypes: cartIds.map(id => typeof id)
      });

      // Store in localStorage
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('enrolledCourses', JSON.stringify(normalizedUserCourses));
      localStorage.setItem('cartCourses', JSON.stringify(normalizedCart));
      localStorage.setItem('enrolledCourseIds', JSON.stringify(courseIds));
      localStorage.setItem('cartCourseIds', JSON.stringify(cartIds));

      if (profile) {
        localStorage.setItem('userProfile', JSON.stringify(profile));
      }

      // Update state
      setUser(userData);
      setToken(authToken);
      setUserProfile(profile || null);
      setEnrolledCourses(normalizedUserCourses);
      setCartCourses(normalizedCart);
      setEnrolledCourseIds(courseIds);
      setCartCourseIds(cartIds);
      
      addDebugInfo(`Login successful`, {
        enrolledCount: normalizedUserCourses.length,
        cartCount: normalizedCart.length,
        finalEnrolledIds: courseIds,
        finalCartIds: cartIds
      });
    } catch (error) {
      addDebugInfo(`Login error: ${error.message}`);
      throw error;
    }
  };

  const logout = () => {
    try {
      addDebugInfo("Logout initiated");
      
      localStorage.clear();
      setUser(null);
      setToken(null);
      setUserProfile(null);
      setEnrolledCourses([]);
      setCartCourses([]);
      setEnrolledCourseIds([]);
      setCartCourseIds([]);
      
      addDebugInfo("Logout completed - all data cleared");
    } catch (error) {
      addDebugInfo(`Logout error: ${error.message}`);
    }
  };

  const updateUser = (updatedUser) => {
    try {
      addDebugInfo(`Updating user data for: ${updatedUser.email || updatedUser.username || 'unknown'}`);
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      setUser(updatedUser);
      addDebugInfo("User data updated successfully");
    } catch (error) {
      addDebugInfo(`Error updating user: ${error.message}`);
    }
  };

  const updateUserProfile = (profile) => {
    try {
      addDebugInfo("Updating user profile", profile);
      localStorage.setItem('userProfile', JSON.stringify(profile));
      setUserProfile(profile);
      addDebugInfo("User profile updated successfully");
    } catch (error) {
      addDebugInfo(`Error updating user profile: ${error.message}`);
    }
  };

  const updateEnrolledCourses = (newCourses) => {
    try {
      addDebugInfo(`Updating enrolled courses: ${newCourses.length} courses`);
      
      // Normalize course IDs to strings
      const normalizedCourses = newCourses.map(course => ({
        ...course,
        _id: String(course._id)
      }));
      
      const ids = normalizedCourses.map((c) => String(c._id));
      
      addDebugInfo('Normalized enrolled course update', {
        courseCount: normalizedCourses.length,
        ids: ids,
        idTypes: ids.map(id => typeof id)
      });

      localStorage.setItem('enrolledCourses', JSON.stringify(normalizedCourses));
      localStorage.setItem('enrolledCourseIds', JSON.stringify(ids));
      
      setEnrolledCourses(normalizedCourses);
      setEnrolledCourseIds(ids);
      
      addDebugInfo("Enrolled courses updated successfully");
    } catch (error) {
      addDebugInfo(`Error updating enrolled courses: ${error.message}`);
    }
  };

  const updateCartCourses = (newCart) => {
    try {
      addDebugInfo(`Updating cart courses: ${newCart.length} courses`);
      
      // Normalize course IDs to strings
      const normalizedCart = newCart.map(course => ({
        ...course,
        _id: String(course._id)
      }));
      
      const ids = normalizedCart.map((c) => String(c._id));
      
      addDebugInfo('Normalized cart course update', {
        courseCount: normalizedCart.length,
        ids: ids,
        idTypes: ids.map(id => typeof id)
      });

      localStorage.setItem('cartCourses', JSON.stringify(normalizedCart));
      localStorage.setItem('cartCourseIds', JSON.stringify(ids));
      
      setCartCourses(normalizedCart);
      setCartCourseIds(ids);
      
      addDebugInfo("Cart courses updated successfully");
    } catch (error) {
      addDebugInfo(`Error updating cart courses: ${error.message}`);
    }
  };

  // Helper function to check if course is enrolled (with debugging)
  const isCourseEnrolled = (courseId) => {
    const normalizedCourseId = String(courseId);
    const isEnrolled = enrolledCourseIds.includes(normalizedCourseId);
    
    console.log('[ENROLLMENT_CHECK]', {
      inputId: courseId,
      inputType: typeof courseId,
      normalizedId: normalizedCourseId,
      enrolledIds: enrolledCourseIds,
      enrolledIdTypes: enrolledCourseIds.map(id => typeof id),
      isEnrolled
    });
    
    return isEnrolled;
  };

  // Helper function to check if course is in cart (with debugging)
  const isCourseInCart = (courseId) => {
    const normalizedCourseId = String(courseId);
    const isInCart = cartCourseIds.includes(normalizedCourseId);
    
    console.log('[CART_CHECK]', {
      inputId: courseId,
      inputType: typeof courseId,
      normalizedId: normalizedCourseId,
      cartIds: cartCourseIds,
      cartIdTypes: cartCourseIds.map(id => typeof id),
      isInCart
    });
    
    return isInCart;
  };

  // Helper function to get debug info (for development)
  const getDebugInfo = () => debugInfo;

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
        // New helper functions for debugging
        isCourseEnrolled,
        isCourseInCart,
        // Debug helpers (remove in production)
        getDebugInfo,
        debugInfo
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};