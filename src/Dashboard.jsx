import { useNavigate } from "react-router-dom";

function Dashboard({ account}) {
  const navigate = useNavigate();

  return (
    <div className="dashbord">
      <h2>Welcome, {account?.accountNo}!
      </h2>
      <p>Your Balance: ₹{account?.balance}</p>
      <button onClick={() => navigate("/balance")}>Check Balance</button>
      <button onClick={() => navigate("/Deposit")}>Deposit</button>
      <button onClick={() => navigate("/withdraw")}>Withdraw</button>
    </div>
  );
}

export default Dashboard;
