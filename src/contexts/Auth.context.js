const { createContext, useState, useContext } = require("react");

const initalValue = {
  isLoggedIn: false,
  signIn: () => {},
  logOut: () => {},
};

const AuthContext = createContext(initalValue);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const signIn = () => setIsLoggedIn(true);
  const logOut = () => setIsLoggedIn(false);
  const value = {
    isLoggedIn,
    signIn,
    logOut,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
