import { useEffect, useState } from "react";
import axios from "axios";

function Balance({ account }) {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/atm/balance/${account.id}`)
      .then(res => setBalance(res.data));
  }, []);

  return <h2 className="flex items-center justify-center flex-col min-h-screen p6 text-4xl font-bold">Current Balance: <span className="text-green-500 font-semibold"> ₹{balance}</span></h2>;
}

export default Balance;
