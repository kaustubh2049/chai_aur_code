import React, { useState, useContext } from "react";
import axios from "axios";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContent);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/sendresetotp`, {
        email,
      });
      if (data.success) {
        toast.success("OTP sent to your email");
        setStep(2);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error sending OTP");
    }
  };

  const resetPassword = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/resetpassword`,
        { email, otp, newpassword: newPassword }
      );
      if (data.success) {
        toast.success("Password reset successfully");
        navigate("/Login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error resetting password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-200 to-blue-200">
      <div className="bg-white p-8 rounded shadow-md text-center w-80">
        {step === 1 && (
          <>
            <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border px-3 py-2 rounded mb-4 w-full"
            />
            <button
              onClick={sendOtp}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Send OTP
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <h2 className="text-xl font-semibold mb-4">
              Enter OTP & New Password
            </h2>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border px-3 py-2 rounded mb-3 w-full"
            />
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border px-3 py-2 rounded mb-4 w-full"
            />
            <button
              onClick={resetPassword}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
