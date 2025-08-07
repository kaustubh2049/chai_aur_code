import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/verifyemail";
import { AppContent } from "./context/AppContext";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const { backendUrl, setIsloggedin, setuserdata } = useContext(AppContent);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.post(`${backendUrl}/api/auth/isAuth`);
        if (data.success) {
          setIsloggedin(true);
          const res = await axios.get(`${backendUrl}/api/user/data`);
          if (res.data.success) {
            setuserdata(res.data.userData);
            // Redirect to verify page if not verified
            if (!res.data.userData.isAccountVerified) {
              navigate("/verifyemail");
            }
          }
        } else {
          setIsloggedin(false);
        }
      } catch (error) {
        setIsloggedin(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/Login" element={<Login />} />
        <Route path="/Resetpassword" element={<ResetPassword />} />
        <Route path="/verifyemail" element={<VerifyEmail />} />
      </Routes>
    </>
  );
};

export default App;
