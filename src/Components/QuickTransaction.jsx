import { useContext, useState } from "react";
import { FaBolt } from "react-icons/fa6";
import { InitialContext } from "../Custom Hooks/InitialBalance";

const expense = {
  title: "",
  date: "",
  amount: "",
  category: "Food & Dining",
  transactionType: "Credit",
  type: "expense",
  text: "text-[#ac787c]",
  bg: "bg-[#3d282a]"
};

const income = {
  title: "",
  date: "",
  amount: "",
  category: "Salary & Payroll",
  transactionType: "Credit",
  type: "income",
  
  text: "[#44c08c]",
  bg: "bg-[#23372e]"
};

const QuickTransaction = () => {
  const { setBalance } = useContext(InitialContext);
  const [isExpense, setIsExpense] = useState(true);
  const [quick, setQuick] = useState(expense);

  const handleTypeToggle = (shouldBeExpense) => {
    setIsExpense(shouldBeExpense);
    setQuick(shouldBeExpense ? expense : income);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let text = "";
    let bg = "";
    console.log(e.target.selectedOption)
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
    // console.log(quick)
    setBalance((prev) => ({
      ...prev,
      transaction: [...prev.transaction, quick],
    }));
    setQuick(isExpense ? expense : income);
  };

  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-1 bg-surface-container-low p-5 rounded-md flex flex-col gap-4">
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
        <div className="flex flex-col">
          <label
            htmlFor="title"
            className="text-on-surface-variant text-[11px]"
          >
            TITLE / MERCHANT
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={quick.title}
            onChange={handleChange}
            placeholder={
              isExpense
                ? "e.g. Whole Foods Market"
                : "e.g. Client Wire, Employer Payroll"
            }
            className="outline-none text-body-sm rounded-sm text-white p-2 bg-surface-container focus:bg-surface-container-highest"
            required
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="amount"
            className="text-on-surface-variant text-[11px]"
          >
            AMOUNT
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={quick.amount}
            onChange={handleChange}
            placeholder="$ 0.00"
            className="outline-none text-body-sm rounded-sm text-white p-2 font-mono-numeric bg-surface-container focus:bg-surface-container-highest"
            required
          />
        </div>

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
            {isExpense ? (
              <>
                <option
                  value="Food & Dining"
                  data-text="text-[#ac787c]"
                  data-bg={"bg-[#3d282a]"}
                >
                  Food & Dining
                </option>
                <option
                  value="Rent & Housing"
                  data-text="text-[#abace4]"
                  data-bg={"bg-[#34333c]"}
                >
                  Rent & Housing
                </option>
                <option
                  value="Entertainment"
                  data-text={"[#44c08c]"}
                  data-bg={"bg-[#23372e]"}
                >
                  Entertainment
                </option>
                <option
                  value="Utilities & Bills"
                  data-text="text-[#abace4]"
                  data-bg={"bg-[#34333c]"}
                >
                  Utilities & Bills
                </option>
                <option
                  value="Transportation"
                  data-text="text-[#abace4]"
                  data-bg={"bg-[#34333c]"}
                >
                  Transportation
                </option>
                <option
                  value="Healthcare"
                  data-text="text-[#ac787c]"
                  data-bg={"bg-[#3d282a]"}
                >
                  Healthcare
                </option>
                <option
                  value="Other Expense"
                  data-text="text-[#ac787c]"
                  data-bg={"bg-[#3d282a]"}
                >
                  Other Expense
                </option>
              </>
            ) : (
              <>
                <option
                  value="Salary & Payroll"
                  data-text={"[#44c08c]"}
                  data-bg={"bg-[#23372e]"}
                >
                  Salary & Payroll
                </option>
                <option
                  value="Freelance & Contract"
                  data-text={"[#44c08c]"}
                  data-bg={"bg-[#23372e]"}
                >
                  Freelance & Contract
                </option>
                <option
                  value="Investments & Dividends"
                  data-text={"[#44c08c]"}
                  data-bg={"bg-[#23372e]"}
                >
                  Investments & Dividends
                </option>
                <option
                  value="Side Project & Sales"
                  data-text={"[#44c08c]"}
                  data-bg={"bg-[#23372e]"}
                >
                  Side Project & Sales
                </option>
                <option
                  value="Other Income"
                  data-text={"[#44c08c]"}
                  data-bg={"bg-[#23372e]"}
                >
                  Other Income
                </option>
              </>
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

        <div className="flex flex-col">
          <label htmlFor="date" className="text-on-surface-variant text-[11px]">
            DATE
          </label>
          <input
            type="date"
            name="date"
            id="date"
            value={quick.date}
            onChange={handleChange}
            className="outline-none text-body-sm rounded-sm text-on-surface p-2 bg-surface-container focus:bg-surface-container-highest"
            required
          />
        </div>

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
