// context/UserContext.js

import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function ContextProvider({ children }) {
  const [currentChecklist, setCurrentChecklist] = useState({});
  
  return (
    <UserContext.Provider value={{ currentChecklist, setCurrentChecklist }}>
      {children}
    </UserContext.Provider>
  );
}

export function myContext() {
  return useContext(UserContext);
}
