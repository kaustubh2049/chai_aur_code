import { createContext, useState } from "react";
export const AppContent = createContext();
export const Appcontextprovider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isloggedin, setIsloggedin] = useState(false);
  const [userData, setuserdata] = useState(false);
  const value = {
    backendUrl,
    isloggedin,
    setIsloggedin,
    userData,
    setuserdata,
  };

  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};
