export function calcExpense(transaction) {
  if (transaction.length > 0) {
    return transaction
      .filter((trans) => trans.type === "expense")
      .reduce((acc, trans) => (acc += Number(trans.amount)), 0);
  } else {
    return 0;
  }
}

export function calcIncome(transaction) {
  if (transaction.length > 0) {
    return transaction
      .filter((trans) => trans.type === "income")
      .reduce((acc, trans) => (acc += Number(trans.amount)), 0);
  } else {
    return 0;
  }
}

export function totalBalanceCalc(balance, setBalance){
  const income = calcIncome(balance.transaction)
  const expense = calcExpense(balance.transaction)
  const totalBalance = income - expense
  console.log(totalBalance)
  setBalance(prev => ({...prev, totalBalance}))
}

export function getDate(date = new Date()) {
  const daten = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).padStart(2, "0");
  return `${year}-${month}-${daten}`;
}

// Income reset to Zero
export function showThisMonthIncome(transactions = []) {
  const thisMonth = getDate().slice(0, 7);

  return transactions.reduce((acc, tra) => {
    if (!tra.date) return acc;

    const isThisMonth = getDate(new Date(tra.date)).slice(0, 7) === thisMonth;
    const isIncome = tra.type === "income";

    return isThisMonth && isIncome ? acc + Number(tra.amount) : acc;
  }, 0);
}

export function showThisMonthExpense(transactions = []) {
  const thisMonth = getDate().slice(0, 7);

  return transactions.reduce((acc, tra) => {
    if (!tra.date) return acc;

    const isThisMonth = getDate(new Date(tra.date)).slice(0, 7) === thisMonth;
    const isExpense = tra.type === "expense";

    return isThisMonth && isExpense ? acc + Number(tra.amount) : acc;
  }, 0);
}

// Current Month Name
export function getThisMonthName() {
  const date = new Date();
  return (
    date.toDateString().split(" ").at(1) +
    " " +
    date.toDateString().split(" ").at(3)
  );
}
