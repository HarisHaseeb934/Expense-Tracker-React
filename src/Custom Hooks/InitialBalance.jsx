import { createContext, useState } from "react";

export const InitialContext = createContext();

const InitialBalance = ({ children }) => {
  const [balance, setBalance] = useState({
    totalBalance: 1000,
    targetIncome: 1000,
    utilitiesBillLimit: 1000,
    transportationLimit: 1000,
    foodDiningLimit: 1000,
    otherExpenseLimit: 1000,
    entertainment: 1000,
    transaction: [],
  });
  return (
    <InitialContext value={{ balance, setBalance }}>{children}</InitialContext>
  );
};

export default InitialBalance;
