import { createContext, useEffect, useState } from "react"
import { createUserDocumentFromUser, onAuthStateChangeListener } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,

  email: null,
  setEmail: () => {},

  displayName: null,
  setDisplayName: () => {} 
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [displayName, setDisplayName] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChangeListener((user) => {
      console.log(user)
      if (user) {
        createUserDocumentFromUser(user);
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value = { 
    currentUser, 
    setCurrentUser, 

    email, 
    setEmail,

    displayName, 
    setDisplayName
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};
