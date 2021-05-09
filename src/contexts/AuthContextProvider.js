import jwtDecode from "jwt-decode";
import { useState, createContext } from "react";
import localStorageService from "../services/localStorageService";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  //   const [isAuthenticated, setIsAuthenticated] = useState(
  //     localStorageService.getToken()
  // //   );
  // const [isAdmin, setIsAdmin] = useState();
  const [auth, setAuth] = useState(decodeToken());
  // const [role, setRole] = useState("");
  // const [user, setUser] = useState({});
  // const [admin, setAdmin] = useState({});
  // // console.log(`isAdmin`, auth);

  function decodeToken() {
    try {
      return jwtDecode(localStorageService.getToken());
    } catch (err) {
      console.error(err);
    }
  }

  console.log("auth", decodeToken());
  return (
    <AuthContext.Provider
      value={{
        // isAuthenticated,
        // setIsAuthenticated,
        // user,
        // setUser,
        // role,
        // setRole,
        // isAdmin,
        // setIsAdmin,
        auth,
        setAuth,
        // admin,
        // setAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContextProvider;
