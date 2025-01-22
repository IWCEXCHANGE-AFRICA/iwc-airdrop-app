import { createContext, useState, useContext } from "react";
import { BASE_URL } from "../config/path";
import axios from "axios";
import { useUserContext } from ".";

const BalanceContext = createContext();

export const useBalance = () => useContext(BalanceContext);

const BalanceProvider = ({ children }) => {
  const [grossBalance, setGrossBalance] = useState(0);
  const { config } = useUserContext();

  const fetchBalance = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/get-point-balance`, config);

      console.log(response);

      setGrossBalance(response.data.point_balance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const updateBalance = (amount) => {
    setGrossBalance((prevBalance) => parseFloat(Number(prevBalance) + Number(amount)));
  };

  return (
    <BalanceContext.Provider
      value={{ grossBalance, fetchBalance, updateBalance }}
    >
      {children}
    </BalanceContext.Provider>
  );
};

export default BalanceProvider;
