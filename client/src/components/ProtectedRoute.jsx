import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";

const ProtectedRoute = ({ children }) => {
  const { isloggedin } = useContext(AppContent);
  return isloggedin ? children : <Navigate to="/Login" />;
};

export default ProtectedRoute;
