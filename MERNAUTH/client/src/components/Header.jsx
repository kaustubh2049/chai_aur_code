import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";

const Header = () => {
  const navigate = useNavigate();
  const { isloggedin, userData } = useContext(AppContent);

  const handleGetStarted = () => {
    if (!isloggedin) {
      navigate("/Login");
    } else if (userData && !userData.isAccountVerified) {
      navigate("/verifyemail");
    } else {
      // maybe scroll or do nothing; for now, navigate to home
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col items-center mt-20 px-4 text-center text-gray-800">
      <img src={assets.header_img} className="w-36 h-36 rounded-full mb-6" />
      <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-8">
        hey developer
        <img src={assets.hand_wave} className="w-8 aspect-square" />
      </h1>
      <h2 className="text-3xl sm:text-5xl font-semibold mb-4">
        welcome to our app
      </h2>
      <p className="mb-8 max-w-md">
        Lets start with a quick product tour and we will have you up and running
        in no time!
      </p>
      <button
        onClick={handleGetStarted}
        className="border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all"
      >
        Get started
      </button>
    </div>
  );
};

export default Header;
