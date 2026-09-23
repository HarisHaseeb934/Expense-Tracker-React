export function calcExpenseThisMonth(transaction) {
  if (transaction.length > 0) {
    return transaction
      .filter((trans) => trans.type === "expense")
      .reduce((acc, trans) => (acc += Number(trans.amount)), 0);
  } else {
    return 0;
  }
}

export function calcIncomeThisMonth(transaction) {
  if (transaction.length > 0) {
    return transaction
      .filter((trans) => trans.type === "income")
      .reduce((acc, trans) => (acc += Number(trans.amount)), 0);
  } else {
    return 0;
  }
}
