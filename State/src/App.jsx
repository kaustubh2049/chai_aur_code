import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [length, setLength] = useState(8);
  const [numberallowed, setnumberallowed] = useState(false);
  const [charallowed, setcharallowed] = useState(false);
  const [password, setPassword] = useState("");
  return (
    <>
      <div className="w-full bg-red-950 px-14 py-14">
        <h1 className="text-3xl font-bold underline text-white text-center p-5">
          Password Generator
        </h1>
        <div className=" flex shadow rounded-lg">
          <input
            type="text"
            value={password}
            className="w-full p-3 rounded-l-lg rounded-r-lg outline-none"
            placeholder="Your Secure Password"
            readOnly
          ></input>
          <button className="bg-blue-500 text-white px-3 py-2 rounded-l-lg rounded-r-lg hover:bg-blue-600 transition-all duration-300">
            Copy
          </button>
        </div>
        <div className="flex items-center gap-4 mt-5">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer flex-1"
            onChange={(e) => setLength(e.target.value)}
            name=""
            id=""
          ></input>
          <label className="text-white">Character Length : </label>
          <div className="text-white font-bold">{length}</div>
        </div>
      </div>
    </>
  );
}

export default App;
