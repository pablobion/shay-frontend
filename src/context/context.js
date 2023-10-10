// context/UserContext.js

import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function ContextProvider({ children }) {
  const [currentChecklist, setCurrentChecklist] = useState({});
  const [socket, setSocket] = useState(null);
  
  return (
    <UserContext.Provider value={{ currentChecklist, setCurrentChecklist, socket, setSocket }}>
      {children}
    </UserContext.Provider>
  );
}

export function myContext() {
  return useContext(UserContext);
}
