import { createContext, useContext, useState, useEffect } from "react";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase";

const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log(user);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });
  }, []);

  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const values = {
    user,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={values}>
      {isLoading && <h1>Loading ...</h1>}
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
