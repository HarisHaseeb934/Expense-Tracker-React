import { createContext, useState } from "react";

export const InitialContext = createContext();

const InitialBalance = ({ children }) => {
  const [balance, setBalance] = useState({
    totalBalance: "",
    targetIncome: "",
    income: "",
    expenses: "",
    utilitiesBillLimit: "",
    transportationLimit: "",
    foodDiningLimit: "",
    otherExpenseLimit: "",
    rentHousing: "",
    transaction: [

    ]
  });
  return (
    <InitialContext value={{ balance, setBalance }}>{children}</InitialContext>
  );
};

export default InitialBalance;
