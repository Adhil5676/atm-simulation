import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
        const response = await axios.post("http://localhost:8080/api/atm/deposit", requestData, {
            headers: { "Content-Type": "application/json" }
          });

      console.log("✅ Deposit Successful:", response.data);
      setAccount(response.data);
      setMessage("Deposit successful!");
    } catch (error) {
      console.error("❌ Deposit Failed:", error.response?.data);
      setMessage("Error in deposit");
    }
  };

  return (
    <div className="deposit">
      <h2>Deposit Money</h2>
      <p>Current Balance: ${account.balance}</p>
      <input className="depoplace" type="number" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button onClick={handleDeposit}>Deposit</button>
      <button onClick={() => navigate("/Dashboard")}>Back</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Deposit;
