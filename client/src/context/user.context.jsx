
import React, {
  createContext,
  useState,
} from 'react';

export const UserContext = createContext({
  setCurrentUserToken: () => null,
  currentUserToken: null,
});

export function UserProvider({ children }) {
  const [currentUserToken, setCurrentUserToken] = useState(null);
  const  value = { currentUserToken, setCurrentUserToken };
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}