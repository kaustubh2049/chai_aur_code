import React, { useState, useContext } from "react";
import axios from "axios";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const { backendUrl } = useContext(AppContent);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerify = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        `${backendUrl}/api/auth/verifyaccount`,
        { otp }
      );
      if (data.success) {
        toast.success("Email verified successfully!");
        navigate("/"); // back to home
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error verifying email");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-300 to-indigo-300">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-semibold mb-4">Verify Your Email</h2>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="border px-3 py-2 rounded mb-4 w-full"
        />
        <button
          onClick={handleVerify}
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
