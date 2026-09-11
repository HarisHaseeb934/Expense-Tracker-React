import { createContext, useContext, useReducer } from "react";

const initialBalance = {
  totalBalance: 0,
  totalIncome: 0,
  incomeTarget: 0,
  utilitiesLimit: 0,
  transportationLimit: 0,
  foodLimit: 0,
  otherExpensesLimit: 0,
};

function reducerBalance(state, action) {
  switch (action.type) {
    case "TOTAL_BALANCE":
      return { ...state, totalBalance: state.totalBalance + action.payload };
    case "TOTAL_INCOME":
      return { ...state, totalIncome: state.totalIncome + action.payload };
    case "INCOME_TARGET":
      return { ...state, incomeTarget: state.incomeTarget + action.payload };
    case "UTILITIES_LIMIT":
      return {
        ...state,
        utilitiesLimit: state.utilitiesLimit + action.payload,
      };
    case "TRANSPORTATION_LIMIT":
      return {
        ...state,
        transportationLimit: state.transportationLimit + action.payload,
      };
    case "FOOD_LIMIT":
      return { ...state, foodLimit: state.foodLimit + action.payload };
    case "OTHER_EXPENSE_LIMIT":
      return {
        ...state,
        otherExpensesLimit: state.otherExpensesLimit + action.payload,
      };
  }
}

const BalanceContext = createContext();

const BalanceReducer = ({children}) => {
   const [balance, dispatchBalance] = useReducer(reducerBalance, initialBalance);
  return (
    <BalanceContext.Provider value={{balance, dispatchBalance}}>
        {children}
    </BalanceContext.Provider>
  )
}

export const useBalance = () => {
    const context  = useContext(BalanceContext)
    if(!context){
        throw new Error("Balance Context must be with in App Provider")
    }
    return context
}

export default BalanceReducer