/* eslint-disable @typescript-eslint/no-unused-vars */
import { User, UserContextType } from "../types";

// UserContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';


// Create the UserContext with a default value of undefined
const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);

  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      try {
        const parsedUser = JSON.parse(userCookie) as User;
        setUserState(parsedUser);
      } catch (error) {
        console.error('Failed to parse user data from cookie:', error);
      }
    }
  }, []);

  const setUser = (newUser: User) => {
    setUserState(newUser);
    Cookies.set('user', JSON.stringify(newUser));
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

