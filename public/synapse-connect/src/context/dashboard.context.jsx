import { createContext, useState } from "react";

export const DashboardContext = createContext({
  showPopup: false,
  setShowPopup: () => {}
});

export const DashboardProvider = ({ children }) => {
  const [showPopup, setShowPopup] = useState(false);

  const value = {
    showPopup,
    setShowPopup
  };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
};
