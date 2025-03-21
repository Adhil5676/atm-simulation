import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Dashboard({ account}) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-r from-slate-900 to-slate-700">
<Navbar />
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg text-center">
      <h2 className="text-3xl font-bold text-blue-600 mb-4">Welcome, {account?.accountNo}!
      </h2>
      <p className="text-lg text-gray-700 mb-6">Your Balance: <span className="text-green-600 font-semibold"> ₹{account?.balance}</span> </p>
      <div className="grid grid-cols-1 gap-4">
      <button onClick={() => navigate("/balance")} 
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Check Balance</button>
      <button onClick={() => navigate("/Deposit")} 
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">Deposit</button>
      <button onClick={() => navigate("/withdraw")} 
         className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition">Withdraw</button>
      </div>
      </div>
    </div>
  );
}

export default Dashboard;
