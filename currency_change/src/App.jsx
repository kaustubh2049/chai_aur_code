import React, { useState, useEffect } from "react";
import { ArrowRightLeft } from "lucide-react"; // Swap icon

function App() {
  // -------------------- States --------------------
  const [currencies, setCurrencies] = useState([]); // all currencies
  const [fromCurrency, setFromCurrency] = useState("USD"); // source currency
  const [toCurrency, setToCurrency] = useState("EUR"); // target currency
  const [amount, setAmount] = useState(1); // user input amount
  const [result, setResult] = useState(null); // converted amount
  const [loading, setLoading] = useState(true); // loader state

  // -------------------- Fetch Currencies on Load --------------------
  useEffect(() => {
    fetch("https://api.frankfurter.app/currencies")
      .then((res) => res.json())
      .then((data) => {
        setCurrencies(Object.keys(data)); // convert object keys to array
        setLoading(false); // stop loader after fetch
      })
      .catch((err) => {
        console.error("Error fetching currencies:", err);
        setLoading(false);
      });
  }, []); // run only once on component mount

  // -------------------- Convert Currency --------------------
  const convertCurrency = () => {
    if (!amount || fromCurrency === toCurrency) {
      setResult(amount); // same currency → result = input
      return;
    }

    setLoading(true); // start loader
    fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.rates && data.rates[toCurrency]) {
          setResult(data.rates[toCurrency]); // save converted amount
        } else {
          setResult(null); // fallback
        }
        setLoading(false); // stop loader
      })
      .catch((err) => {
        console.error("Error converting:", err);
        setResult(null);
        setLoading(false);
      });
  };

  // -------------------- Swap Currencies --------------------
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null); // reset result until reconverted
  };

  // -------------------- Auto Convert on Change --------------------
  useEffect(() => {
    if (currencies.length > 0) convertCurrency();
  }, [amount, fromCurrency, toCurrency, currencies]);

  // -------------------- UI --------------------
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black text-white font-mono">
      <div className="bg-gray-900/50 backdrop-blur-sm p-10 rounded-lg border-2 border-emerald-500 w-full max-w-xl">
        {/* Title */}
        <h1 className="text-4xl font-black mb-10 text-center text-emerald-400 uppercase tracking-widest">
          [ Neon-FX Converter ]
        </h1>

        {/* Amount Input */}
        <label className="block text-sm font-medium text-emerald-500 mb-2">
          Enter Amount
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-4 border-b-2 border-emerald-500 bg-transparent text-2xl font-bold mb-6 focus:outline-none focus:border-emerald-300"
        />

        {/* Currency Select + Swap Button */}
        <div className="flex items-center gap-4 mb-10">
          {/* From Currency */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-emerald-500 mb-2">
              From
            </label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full p-4 border border-emerald-700 bg-gray-900 text-emerald-300 cursor-pointer"
            >
              {currencies.map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <button
            onClick={swapCurrencies}
            className="p-3 mt-8 bg-emerald-500 text-black rounded-full hover:bg-emerald-300 transition"
          >
            <ArrowRightLeft className="w-6 h-6 font-bold" />
          </button>

          {/* To Currency */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-emerald-500 mb-2">
              To
            </label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full p-4 border border-emerald-700 bg-gray-900 text-emerald-300 cursor-pointer"
            >
              {currencies.map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Result Display */}
        <div className="mt-6 p-6 bg-black border-2 border-emerald-500 rounded-lg text-center">
          {loading ? (
            <p className="text-emerald-400 animate-pulse">Processing...</p>
          ) : result !== null ? (
            <>
              <p className="text-lg text-emerald-500">Converted Result</p>
              <h2 className="text-5xl font-bold text-emerald-400 mt-2">
                {result.toFixed(2)} {toCurrency}
              </h2>
            </>
          ) : (
            <p className="text-emerald-600">Awaiting input...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
