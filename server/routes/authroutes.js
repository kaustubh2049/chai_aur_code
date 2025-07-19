import express from "express";
import {
    isAuthenticated,
  login,
  logout,
  register,
  resetpassword,
  sendresetOTP,
  sendverifyOTP,
  verifyEmail,
} from "../controllers/authcontroller.js";
import userauth from "../middleware/userauth.js";

const authrouter = express.Router();

authrouter.post("/register", register);
authrouter.post("/login", login);
authrouter.post("/logout", logout);
authrouter.post("/sendresetotp", sendresetOTP);
authrouter.post("/resetpassword", resetpassword);
authrouter.post("/verifyaccount", userauth, verifyEmail); // fixed name here
authrouter.post("/isAuth", userauth, isAuthenticated); // fixed name here
authrouter.post("/send-verify-otp", userauth, sendverifyOTP);

export default authrouter;
