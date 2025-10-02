import { useState } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [copied, setCopied] = useState(false);

  // Character sets
  const LOWER = "abcdefghijklmnopqrstuvwxyz";
  const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const NUMBERS = "0123456789";
  const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,<.>/?";

  // Helper: pick random char from string
  const randomChar = (str) => str[Math.floor(Math.random() * str.length)];

  // Helper: replace character at index i
  const replaceAt = (s, i, ch) => s.slice(0, i) + ch + s.slice(i + 1);

  // Generate password
  const generatePassword = () => {
    let charset = "";
    if (includeLowercase) charset += LOWER;
    if (includeUppercase) charset += UPPER;
    if (includeNumbers) charset += NUMBERS;
    if (includeSymbols) charset += SYMBOLS;

    if (!charset) {
      setPassword("");
      return;
    }

    // Generate random password
    let pass = "";
    for (let i = 0; i < length; i++) {
      pass += randomChar(charset);
    }

    // Ensure at least one char from each selected type
    const required = [];
    if (includeLowercase) required.push(randomChar(LOWER));
    if (includeUppercase) required.push(randomChar(UPPER));
    if (includeNumbers) required.push(randomChar(NUMBERS));
    if (includeSymbols) required.push(randomChar(SYMBOLS));

    for (let i = 0; i < required.length && i < pass.length; i++) {
      pass = replaceAt(pass, i, required[i]);
    }

    setPassword(pass);
    setCopied(false);
  };

  // Copy password to clipboard
  const copyPassword = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert("Copy failed!");
    }
  };

  // Password strength logic
  const passwordStrength = () => {
    let score = 0;
    if (length >= 8) score++;
    if (length >= 12) score++;
    const types = [
      includeLowercase,
      includeUppercase,
      includeNumbers,
      includeSymbols,
    ].filter(Boolean).length;
    if (types >= 2) score++;
    if (types >= 3) score++;

    if (score <= 1) return { label: "Weak", color: "bg-red-500", pct: 25 };
    if (score === 2) return { label: "Okay", color: "bg-yellow-400", pct: 50 };
    if (score === 3) return { label: "Good", color: "bg-yellow-500", pct: 75 };
    return { label: "Strong", color: "bg-green-500", pct: 100 };
  };

  const strength = passwordStrength();

  return (
    <div className="bg-red-900 text-white min-h-screen flex items-center justify-center p-6">
      <div className="bg-red-800 p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Password Generator
        </h1>

        {/* Password Output */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={password}
            placeholder="Your Password"
            className="flex-1 p-2 rounded text-black"
            readOnly
          />
          <button
            onClick={copyPassword}
            className="px-3 bg-white text-red-800 rounded hover:opacity-90"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Slider */}
        <div className="flex items-center gap-4 mb-4">
          <input
            type="range"
            min={6}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="flex-1 cursor-pointer"
          />
          <span className="font-bold">{length}</span>
        </div>

        {/* Checkboxes */}
        <div className="space-y-2 mb-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
            />
            Lowercase (a-z)
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
            />
            Uppercase (A-Z)
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
            />
            Numbers (0-9)
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
            />
            Symbols (!@#$)
          </label>
        </div>

        {/* Generate Button */}
        <button
          onClick={generatePassword}
          className="w-full p-2 bg-white text-red-800 rounded font-bold hover:opacity-90 transition"
        >
          Generate Password
        </button>

        {/* Strength Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-white/90 text-sm mb-1">
            <span>Strength: {strength.label}</span>
          </div>
          <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
            <div
              className={`${strength.color} h-full`}
              style={{ width: `${strength.pct}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
