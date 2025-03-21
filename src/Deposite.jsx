import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

function Deposit({ account, setAccount }) {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleDeposit = async () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setMessage("Enter a valid amount");
      return;
    }

    const requestData = {
      id: account.id, // ✅ Ensure account ID is sent
      amount: parseFloat(amount),
    };

    console.log("📤 Sending Deposit Request:", requestData);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/atm/deposit",
        requestData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("✅ Deposit Successful:", response.data);
      setAccount(response.data);
      setMessage("Deposit successful!");
    } catch (error) {
      console.error("❌ Deposit Failed:", error.response?.data);
      setMessage("Error in deposit");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 min-h-screen bg-gradient-to-r from-slate-900 to-slate-700">
    <Navbar />
      <div className="bg-white rounded-2xl p-8 shadow-lg w-full max-w-lg text-center">
        <h2 className="text-3xl font-bold text-blue-500 ">Deposite</h2>
        <p className="text-xl font-bold text-gray-600">
          Current Balance:{" "}
          <span className="text-green-500 font-semibold">
            {" "}
            ${account.balance}{" "}
          </span>
        </p>
        <div className="grid grid-cols-1 gap-4">
          <input
            className="w-full p-3 border rounded-lg outline-none focus:border-blue-600"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button onClick={handleDeposit} className="bg-blue-500 rounded-lg text-white w-full py-2 hover:bg-blue-700 transition duration-500">Deposit</button>
          <button onClick={() => navigate("/Dashboard")} className="bg-blue-500 rounded-lg text-white w-full py-2 hover:bg-blue-700 transition duration-500">Back</button>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default Deposit;
