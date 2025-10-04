import { useState } from "react";
import "./App.css";

function App() {
  // State for background color
  const [bgColor, setBgColor] = useState("black");

  // Some colors to pick from
  const colors = [
    "black",
    "red",
    "blue",
    "green",
    "purple",
    "orange",
    "pink",
    "teal",
  ];

  // Function to change background
  const changeBg = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(randomColor);
  };

  return (
    <div
      className={`w-full h-screen duration-500`}
      style={{ backgroundColor: bgColor }}
    >
      <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
        <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-3 rounded-3xl">
          <button
            onClick={changeBg}
            className="bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 duration-200"
          >
            Change BG
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
