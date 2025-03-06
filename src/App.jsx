import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Balance from "./Balance";
import Deposit from "./Deposite";
import Withdraw from "./withdraw";
import { useState } from "react";

function App() {
  const [account, setAccount] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setAccount={setAccount} />} />
        <Route path="/dashboard" element={<Dashboard account={account} />} />
        <Route path="/balance" element={<Balance account={account} />} />
        <Route path="/deposit" element={account ? <Deposit account={account} setAccount={setAccount} /> : <Login setAccount={setAccount} />} />
        <Route path="/withdraw" element={account ? <Withdraw account={account} setAccount={setAccount} /> : <Login setAccount={setAccount} />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;

