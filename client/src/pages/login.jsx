import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate(); // ✅ call useNavigate to get the navigate function
  const [state, setState] = useState("Signup");
  const [Name, setName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-500 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "Signup" ? "Create  account" : "Login "}
        </h2>
        <p className="text-center text-sm mb-6">
          {state === "Signup" ? "Create Your account" : "Login your account!"}
        </p>
        <form>
          {state === "Signup" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5c]">
              <img src={assets.person_icon} />
              <input
                onChange={(e) => setName(e.target.value)}
                value={Name}
                className="bg-transparent outline-none"
                type="text"
                placeholder="Full name"
                required
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5c]">
            <img src={assets.mail_icon} />
            <input
              onChange={(e) => setemail(e.target.value)}
              value={email}
              className="bg-transparent outline-none"
              type="email"
              placeholder="EmailID"
              required
            />
          </div>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5c]">
            <img src={assets.lock_icon} />
            <input
              onChange={(e) => setpassword(e.target.value)}
              value={password}
              className="bg-transparent outline-none"
              type="password"
              placeholder="password"
              required
            />
          </div>
          <p
            onClick={() => navigate("/Resetpassword")}
            className="mb-4 text-indigo-500 cursor-pointer"
          >
            Forgot Password?
          </p>
          <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo">
            {state}
          </button>
        </form>
        {state === "Signup" ? (
          <p className="text-gray-400 text-center text-xs mt-4">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-400 cursor-pointer underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-gray-400 text-center text-xs mt-4">
            Dont have an Account?{" "}
            <span
              onClick={() => setState("Signup")}
              className="text-blue-400 cursor-pointer underline"
            >
              Signup
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
