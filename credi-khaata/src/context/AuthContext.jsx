import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Check if user is already logged in (from localStorage)
//     const user = localStorage.getItem('user');
//     if (user) {
//       setCurrentUser(JSON.parse(user));
//     }
//     setLoading(false);
//   }, []);
useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const user = localStorage.getItem('user');
    if (user && user !== 'undefined' && user !== 'null') {
      try {
        setCurrentUser(JSON.parse(user));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user'); // Clear invalid data
      }
    }
    setLoading(false);
  }, []);

  // Mock login function
  const login = (email, password) => {
    // In a real app, you would call your API here
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const user = { id: '1', email, name: email.split('@')[0] };
          setCurrentUser(user);
          localStorage.setItem('user', JSON.stringify(user));
          toast.success('Logged in successfully!');
          resolve(user);
        } else {
          toast.error('Invalid credentials');
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  // Mock signup function
  const signup = (email, password, name) => {
    // In a real app, you would call your API here
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password && name) {
          const user = { id: '1', email, name };
          setCurrentUser(user);
          localStorage.setItem('user', JSON.stringify(user));
          toast.success('Account created successfully!');
          resolve(user);
        } else {
          toast.error('Invalid information');
          reject(new Error('Invalid information'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
    toast.info('Logged out successfully');
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
