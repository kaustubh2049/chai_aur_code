import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";

const NavBar = () => {
  const navigate = useNavigate();
  const { isloggedin, userData } = useContext(AppContent);

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      <img
        src={assets.logo}
        alt="Logo"
        onClick={() => navigate("/")}
        className="w-28 sm:w-32 cursor-pointer"
      />

      {isloggedin ? (
        <div className="flex items-center gap-3 text-gray-800">
          <span className="text-sm sm:text-base font-medium">
            {userData?.name}
          </span>
          {userData?.isAccountVerified && (
            <img
              src={assets.verified_icon}
              alt="Verified"
              className="w-5 sm:w-6"
            />
          )}
        </div>
      ) : (
        <button
          onClick={() => navigate("/Login")}
          className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all"
        >
          Login
          <img src={assets.arrow_icon} alt="Arrow" />
        </button>
      )}
    </div>
  );
};

export default NavBar;
