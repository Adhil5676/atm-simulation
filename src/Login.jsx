import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

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
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-slate-900 to-slate-700">
        <Navbar />
        <div className="flex flex-1 items-center justify-center ">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center ">
        <h2 className="text-3xl font-bold mb-6 text-blue-600 ">BIT'S NET BANKING</h2>
        <input className="w-full p-3 border rounded-lg mb-4 outline-none focus:border-blue-500"
         placeholder="Account Number" onChange={(e) => setAccountNo(e.target.value)} />
        <input className="w-full p-3 border rounded-lg mb-4 outline-none focus:border to-blue-500"
         placeholder="PIN" type="password" onChange={(e) => setPin(e.target.value)} />
        <button
         onClick={handleLogin}
         className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-500">Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>} {/* ✅ Display error message */}
        </div>
        </div>
    </div>
);
}

export default Login;