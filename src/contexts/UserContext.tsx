import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, UserContextType } from "../types";
import Cookies from "js-cookie";

const FAKE_USER: User = {
  firstName: "John",
  lastName: "Doe",
  birthDate: new Date(
    "Sun Nov 08 1998 00:00:00 GMT-0500 (Eastern Standard Time)"
  ),
  city: "San Francisco",
  state: "CA",
  character: "Elsa",
  movie: "Frozen",
  park: "Florida",
  lastUpdate: new Date(
    "Tue Jul 04 2023 00:00:00 GMT-0400 (Eastern Daylight Time)"
  ),
};

// Create the UserContext with a default value of undefined
const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      try {
        const parsedUser = JSON.parse(userCookie) as User;
        setUserState(parsedUser);
      } catch (error) {
        console.error("Failed to parse user data from cookie:", error);
      }
      // if doesn't exist, create the fake user
    } else {
      setUser(FAKE_USER);
    }
  }, []);

  const setUser = (newUser: User) => {
    setUserState(newUser);
    Cookies.set("user", JSON.stringify(newUser));
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
