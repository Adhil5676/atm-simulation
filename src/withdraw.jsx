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
    <div className="withdraw">
      <h2>Withdraw Money</h2>
      <p>Current Balance: ${account.balance}</p>
      <input className="withplace" type="number" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button onClick={handleWithdraw}>Withdraw</button>
      <button onClick={() => navigate("/Dashboard")}>Back</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Withdraw;
