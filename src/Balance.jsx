import { useEffect, useState } from "react";
import axios from "axios";

function Balance({ account }) {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/atm/balance/${account.id}`)
      .then(res => setBalance(res.data));
  }, []);

  return <h2 className="balance">Current Balance: ${balance}</h2>;
}

export default Balance;
