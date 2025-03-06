import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setAccount }) {
    const [accountNo, setAccountNo] = useState("");
    const [pin, setPin] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => { 
        try {
            const response = await axios.post("http://localhost:8080/api/atm/login", null, {
                params: { accountNo, pin }
            } );
            console.log("✅ Login Successful:", response.data);
            setAccount(response.data);  // Save account data in state
            navigate("/Dashboard");  
            setError("");  // Clear any previous errors
          } catch (error) {
            console.error("❌ Login Failed:", error.response?.data);
            setError("Invalid Account Number or PIN");
          }
        };

return (
    <div className="login">
        <h2>123 BANK ATM</h2>
        <input placeholder="Account Number" onChange={(e) => setAccountNo(e.target.value)} />
        <input placeholder="PIN" type="password" onChange={(e) => setPin(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>} {/* ✅ Display error message */}
    </div>
);
}

export default Login;