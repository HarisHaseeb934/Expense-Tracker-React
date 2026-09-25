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

export function totalBalanceCalc(balance, setBalance) {
  const income = calcIncome(balance.transaction);
  const expense = calcExpense(balance.transaction);
  const totalBalance = income - expense;
  setBalance((prev) => ({ ...prev, totalBalance }));
}

export function getDate(date = new Date()) {
  const daten = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).padStart(2, "0");
  return `${year}-${month}-${daten}`;
}

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

export function getMonths(dateInput) {
  const date = new Date(dateInput);
  let month = date.toDateString().split(" ").at(1);
  let year = date.toDateString().split(" ").at(3);
  return `${year}-${month}`;
}

export function getPreviousSunday(dateInput) {
  const date = new Date(dateInput);
  const dayOfWeek = date.getDay();
  date.setDate(date.getDate() - dayOfWeek);
  return date.toLocaleString().split(",").at(0);
}

export const BTN_DATA = [
  {
    id: 1,
    display: "30D",
    value: getDate(new Date(new Date().setDate(new Date().getDate() - 30))),
    days: 30,
  },
  {
    id: 2,
    display: "6 Months",
    value: getDate(new Date(new Date().setDate(new Date().getDate() - 180))),
    days: 180,
  },
  {
    id: 3,
    display: "YTD",
    value: getDate(new Date(new Date().getFullYear(), 0, 1)),
    days: 365,
  },
];

export function prevIncomeExpense(date, transaction) {
  let prevDate = "";
  if (date.display === "30D") {
    prevDate = getDate(new Date(new Date().setDate(new Date().getDate() - 60)));
  } else if (date.display === "6 Months") {
    prevDate = getDate(
      new Date(new Date().setDate(new Date().getDate() - 360)),
    );
  } else {
    prevDate = getDate(new Date(new Date().getFullYear(), -12, 1));
  }
  const { prevIncome, prevExpense } = transaction.reduce(
    (acc, trans) => {
      if (trans.date >= prevDate && trans.date <= date.date) {
        const amount = Number(trans.amount);
        if (trans.type === "income") {
          acc.prevIncome += amount;
        } else if (trans.type === "expense") {
          acc.prevExpense += amount;
        }
      }
      return acc;
    },
    { prevIncome: 0, prevExpense: 0 },
  );
  return { prevIncome, prevExpense };
}
