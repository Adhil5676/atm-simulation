import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Withdraw({ account, setAccount }) {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleWithdraw = async () => {
    if (amount <= 0) {
      setMessage("Enter a valid amount");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/atm/withdraw", {
        id: account.id,
        amount: parseFloat(amount),
      });

      console.log("✅ Withdrawal Successful:", response.data);
      setAccount({ ...account, balance: account.balance - parseFloat(amount) });
      setMessage("Withdrawal successful!");
    } catch (error) {
      console.error("❌ Withdrawal Failed:", error.response?.data);
      setMessage("Insufficient balance!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-6 min-h-screen bg-gradient-to-r from-slate-900 to-slate-700">
      <div className="bg bg-white rounded-lg p-8 w-full max-w-lg text-center mb-4">
      <h2 className="text-3xl font-bold text-blue-500">Withdraw Money</h2>
      <p className="text-xl font-bold text-gray-600">Current Balance: <span className="text-green-500 font-semibold"> ${account.balance} </span></p>
      <div className="flex flex-col gap-4 mt-4">
      <input className="w-full border py-2 rounded-lg p-3 focus:border-blue-500 outline-none mb-2" type="number" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button onClick={handleWithdraw} className="bg-blue-500 rounded-lg py-2 text-white hover:bg-blue-800 transition duration-500">Withdraw</button>
      <button onClick={() => navigate("/Dashboard")} className="bg-blue-500 rounded-lg py-2 text-white hover:bg-blue-800 transition duration-500">Back</button>
      {message && <p>{message}</p>}
      </div>
      </div>
    </div>
  );
}

export default Withdraw;
