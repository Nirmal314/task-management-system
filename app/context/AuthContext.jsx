import { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ! methods

  const googleSignin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
    } catch (e) {
      console.log(e);
    }
  };

  const userSignin = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      return res;
    } catch (e) {
      console.log(typeof e.code.split("/").pop());
      return { error: true, errorMessage: e.code.split("/").pop() };
    }
  };

  const userSignup = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).then((user) => {
        user.updateProfile({ displayName: name });
      });

      return res;
    } catch (e) {
      console.log(typeof e.code.split("/").pop());
      return { error: true, errorMessage: e.code.split("/").pop() };
    }
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
      console.log("current user: ", currUser);
    });
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        googleSignin,
        logOut,
        userSignin,
        userSignup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => useContext(AuthContext);
