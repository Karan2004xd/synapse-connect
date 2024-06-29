import { createContext, useState } from "react";

export const RoomContext = createContext({
  sessionLink: null,
  setSessionLink: () => {},
  updateSessionLink: () => {}
});

export const RoomProvider = ({ children }) => {
  const [sessionLink, setSessionLink] = useState(() => {
    sessionStorage.getItem('sessionLink');
  });

  const updateSessionLink = (sessionLink) => {
    if (sessionLink) {
      sessionStorage.setItem('sessionLink', sessionLink);
    } else {
      sessionStorage.removeItem('sessionLink');
    }
  };

  const value = {
    sessionLink,
    setSessionLink,
    updateSessionLink
  };

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>
};
