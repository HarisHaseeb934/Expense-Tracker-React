import { useContext } from "react";
import { BalanceContext } from "./BalanceContext";

export function useBalance() {
  const ctx = useContext(BalanceContext);
  if (!ctx)
    throw new Error(
      "useBalance must be in the Provider <BalanceProvider></BalanceProvider>",
    );
  return ctx;
}
