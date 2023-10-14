// context/UserContext.js

import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();
import io from "socket.io-client";
import { baseUrl } from "@/config/baseInfos";

export function ContextProvider({ children }) {
    const [currentChecklist, setCurrentChecklist] = useState({});
    const [socket, setSocket] = useState(null);
    const [isClient, setIsClient] = useState(false)
 
    
   useEffect(() => {
    
    const newSocket = io(`${baseUrl}`, {
      withCredentials: true, // Permite compartilhar cookies/credenciais com o servidor
    });
    newSocket.on("connect", () => {
      console.log("Conectado ao servidor Socket.io");
    });
    setSocket(newSocket);
    setIsClient(true)
   
   }, []);

  
   

    return ( isClient ? <UserContext.Provider value={{ currentChecklist, setCurrentChecklist, socket, setSocket }}>{children}</UserContext.Provider> : null);
}

export function myContext() {
    return useContext(UserContext);
}
