import { useState, createContext } from "react";
import localStorageService from "../services/localStorageService";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorageService.getToken()
  );
  const [isAdmin, setIsAdmin] = useState(localStorageService.getToken());
  const [role, setRole] = useState("");
  const [user, setUser] = useState({});

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        role,
        setRole,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContextProvider;
