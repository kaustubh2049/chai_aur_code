import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import verifyemail from './pages/verifyemail'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const { backendUrl, setIsloggedin, setuserdata } = useContext(AppContent);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.post(`${backendUrl}/api/auth/isAuth`);
        if (data.success) {
          setIsloggedin(true);
          // get user data
          const res = await axios.get(`${backendUrl}/api/user/data`);
          if (res.data.success) {
            setuserdata(res.data.userData);
          }
        } else {
          setIsloggedin(false);
        }
      } catch (error) {
        setIsloggedin(false);
      }
    };
    checkAuth();
  }, []);

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
