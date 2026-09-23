import { useContext, useEffect, useState } from "react";
import { FaBolt } from "react-icons/fa6";
import Input from "./Input";
import Alert from "./Alert";
import { InitialContext } from "../../Context/BalanceContext";


const expense = {
  title: "",
  date: "",
  amount: "",
  category: "Food & Dining",
  transactionType: "Credit",
  type: "expense",
  text: "text-[#ac787c]",
  bg: "bg-[#3d282a]",
};

const income = {
  title: "",
  date: "",
  amount: "",
  category: "Salary & Payroll",
  transactionType: "Credit",
  type: "income",
  text: "text-[#44c08c]",
  bg: "bg-[#23372e]",
};

const expenseOptions = {
  "Food & Dining": {
    dataText: "text-[#ffb2b7]",
    dataBg: "bg-[#3d282a]",
  },
  "Rent & Housing": {
    dataText: "text-[#abace4]",
    dataBg: "bg-[#34333c]",
  },
  Entertainment: {
    dataText: "text-[#44c08c]",
    dataBg: "bg-[#23372e]",
  },
  "Utilities & Bills": {
    dataText: "text-[#abace4]",
    dataBg: "bg-[#34333c]",
  },
  Transportation: {
    dataText: "text-[#abace4]",
    dataBg: "bg-[#34333c]",
  },
  Healthcare: {
    dataText: "text-[#ffb2b7]",
    dataBg: "bg-[#3d282a]",
  },
  "Other Expense": {
    dataText: "text-[#ac787c]",
    dataBg: "bg-[#3d282a]",
  },
};

const incomeOptions = {
  "Salary & Payroll": {
    dataText: "text-[#44c08c]",
    dataBg: "bg-[#23372e]",
  },
  "Freelance & Contract": {
    dataText: "text-[#44c08c]",
    dataBg: "bg-[#23372e]",
  },
  "Investments & Dividends": {
    dataText: "text-[#44c08c]",
    dataBg: "bg-[#23372e]",
  },
  "Side Project & Sales": {
    dataText: "text-[#44c08c]",
    dataBg: "bg-[#23372e]",
  },
  "Other Income": {
    dataText: "text-[#44c08c]",
    dataBg: "bg-[#23372e]",
  },
};

const QuickTransaction = () => {
  const { balance, setBalance } = useContext(InitialContext);
  const [isExpense, setIsExpense] = useState(true);
  const [quick, setQuick] = useState(expense);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!showAlert) return;

    let timer = setTimeout(() => {
      setShowAlert(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [showAlert]);

  const {
    totalBalance,
    targetIncome,
    utilitiesBillLimit,
    transportationLimit,
    foodDiningLimit,
    otherExpenseLimit,
    entertainment,
    transaction,
  } = balance;

  const details =
    totalBalance !== "" &&
    targetIncome !== "" &&
    utilitiesBillLimit !== "" &&
    transportationLimit !== "" &&
    foodDiningLimit !== "" &&
    otherExpenseLimit !== "" &&
    entertainment !== "";

  const handleTypeToggle = (shouldBeExpense) => {
    setIsExpense(shouldBeExpense);
    setQuick(shouldBeExpense ? expense : income);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let text = "";
    let bg = "";
    if (name === "category") {
      const selectedOption = e.target.selectedOptions[0];
      if (selectedOption) {
        text = selectedOption.dataset.text || "";
        bg = selectedOption.dataset.bg || "";
      }
    }

    setQuick((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "category" && { text, bg }),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!details) {
      setShowAlert(true);
      return;
    }
    setBalance((prev) => ({
      ...prev,
      transaction: [...prev.transaction, quick],
    }));
    setQuick(isExpense ? expense : income);
  };

  return (
    <div className="relative over col-span-1 md:col-span-2 lg:col-span-1 bg-surface-container-low p-5 rounded-md flex flex-col gap-4">
      {showAlert && <Alert />}
      <div className="flex items-center gap-2">
        <div className="text-primary-container bg-[#002113] p-2 rounded-md">
          <FaBolt />
        </div>
        <div className="leading-none">
          <h1 className="text-white font-bold">Quick Add</h1>
          <p className="text-on-surface-variant text-xs">
            Post new transaction instantly
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-1">
        <button
          type="button"
          className={`py-2 w-full text-xs rounded-sm transition-colors ${
            isExpense ? "bg-[#ff8493] text-black" : "bg-[#201f1f] text-white"
          }`}
          onClick={() => handleTypeToggle(true)}
        >
          - Expense
        </button>
        <button
          type="button"
          className={`py-2 w-full text-xs rounded-sm transition-colors ${
            !isExpense ? "bg-[#2caa98] text-black" : "bg-[#201f1f] text-white"
          }`}
          onClick={() => handleTypeToggle(false)}
        >
          + Income
        </button>
      </div>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <Input
          title={"TITLE / MERCHANT"}
          type={"text"}
          name={"title"}
          value={quick.title}
          onChange={handleChange}
          placeholder={
            isExpense
              ? "e.g. Whole Foods Market"
              : "e.g. Client Wire, Employer Payroll"
          }
        />
        <Input
          title={"AMOUNT"}
          type={"number"}
          name={"amount"}
          value={quick.amount}
          onChange={handleChange}
          placeholder={"$ 0.00"}
        />

        <div className="flex flex-col">
          <label
            htmlFor="category"
            className="text-on-surface-variant text-[11px]"
          >
            CATEGORY
          </label>
          <select
            id="category"
            name="category"
            value={quick.category}
            onChange={handleChange}
            className="outline-none text-body-sm rounded-sm text-on-surface p-2 bg-surface-container focus:bg-surface-container-highest"
          >
            {isExpense
              ? Object.entries(expenseOptions).map(
                  ([value, { dataText, dataBg }]) => {
                    return (
                      <option
                        value={value}
                        data-text={dataText}
                        data-bg={dataBg}
                      >
                        {value}
                      </option>
                    );
                  },
                )
              : Object.entries(incomeOptions).map(
                  ([value, { dataText, dataBg }]) => {
                    return (
                      <option
                        value={value}
                        data-text={dataText}
                        data-bg={dataBg}
                      >
                        {value}
                      </option>
                    );
                  },
                )}
          </select>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="transactionType"
            className="text-on-surface-variant text-[11px]"
          >
            TYPE
          </label>
          <select
            name="transactionType"
            id="transactionType"
            value={quick.transactionType}
            onChange={handleChange}
            className="outline-none text-body-sm rounded-sm text-on-surface p-2 bg-surface-container focus:bg-surface-container-highest"
          >
            <option value="Credit">Credit</option>
            <option value="Debit">Debit</option>
            <option value="Money">Money</option>
          </select>
        </div>

        <Input
          title={"DATE"}
          type={"date"}
          name={"date"}
          value={quick.date}
          onChange={handleChange}
        />

        <button
          className={`text-black ${
            isExpense ? "bg-[#ff8493]" : "bg-[#2caa98]"
          } block w-full text-sm font-semibold py-2 mt-3 rounded-sm transition-colors`}
          type="submit"
        >
          Record {isExpense ? "Expense" : "Income"}
        </button>
      </form>
    </div>
  );
};

export default QuickTransaction;
