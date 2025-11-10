import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);

  // Load users from localStorage on mount
  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }

    const storedCurrentUser = localStorage.getItem('currentUser');
    if (storedCurrentUser) {
      setCurrentUser(JSON.parse(storedCurrentUser));
    }
  }, []);

  // Save users to localStorage whenever they change
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, [users]);

  // Register new user
  const register = (userData) => {
    const userExists = users.find((u) => u.email === userData.email);
    if (userExists) {
      throw new Error('User already exists with this email');
    }

    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString(),
    };

    setUsers([...users, newUser]);
    return newUser;
  };

  // Login user
  const login = (email, password) => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      throw new Error('Invalid email or password');
    }

    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  };

  // Logout user
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  // Update user profile
  const updateProfile = (updatedData) => {
    const updatedUsers = users.map((u) =>
      u.id === currentUser.id ? { ...u, ...updatedData } : u
    );

    setUsers(updatedUsers);

    const updatedCurrentUser = { ...currentUser, ...updatedData };
    setCurrentUser(updatedCurrentUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        register,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
