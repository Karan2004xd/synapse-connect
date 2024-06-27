import { createContext, useState } from "react"

export const UserContext = createContext({
  email: null,
  setEmail: () => {},
  updateEmail: () => {},

  displayName: null,
  setDisplayName: () => {}, 
  updateDisplayName: () => {},

  id: null,
  setId: () => {},
  updateId: () => {},

  isAuthenticated: () => {}
});

export const UserProvider = ({ children }) => {
  const [email, setEmail] = useState(() => 
    localStorage.getItem('email')
  );

  const [displayName, setDisplayName] = useState(() =>
    localStorage.getItem('displayName')
  );

  const [id, setId] = useState(() => 
    localStorage.getItem('id')
  );

  const updateEmail = (email) => {
    setEmail(email);

    if (email) {
      localStorage.setItem('email', email);
    } else {
      localStorage.removeItem('email');
    }
  };

  const updateDisplayName = (displayName) => {
    setDisplayName(displayName);

    if (displayName) {
      localStorage.setItem('displayName', displayName);
    } else {
      localStorage.removeItem('displayName');
    }
  };

  const updateId = (id) => {
    setId(id);

    if (id) {
      localStorage.setItem('id', id);
    } else {
      localStorage.removeItem('id');
    }
  };

  const isAuthenticated = () => id;

  const value = { 
    email, 
    setEmail,
    updateEmail,

    displayName, 
    setDisplayName,
    updateDisplayName,

    id,
    setId,
    updateId,

    isAuthenticated
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};
