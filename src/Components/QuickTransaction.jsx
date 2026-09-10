import { useState } from "react";
import { FaBolt } from "react-icons/fa6";

const QuickTransaction = () => {
  const [isExpense, setIsExpense] = useState(true);
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
      <div className="flex justify-center">
        <button
          className={`py-2 w-full  text-xs rounded-sm ${isExpense ? "bg-[#ff8493] text-black" : "bg-[#201f1f] text-white"}`}
          onClick={() => setIsExpense((prev) => !prev)}
        >
          -Expense
        </button>
        <button
          className={`py-2 w-full  text-xs rounded-sm ${!isExpense ? "bg-[#2caa98] text-black" : "bg-[#201f1f] text-white"}`}
          onClick={() => setIsExpense((prev) => !prev)}
        >
          +Income
        </button>
      </div>
      <form className="flex flex-col gap-3">
        {isExpense ? (
          <>
            <div className="flex flex-col">
              <label
                htmlFor="TITLE"
                className="text-on-surface-variant text-[11px]"
              >
                TITLE / MERCHANT
              </label>
              <input
                type="text"
                id="TITLE"
                placeholder="e.g. Whole Foods Market"
                className="outline-none text-body-sm rounded-sm text-white p-2 bg-surface-container  focus:bg-surface-container-highest"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="AMOUNT"
                className="text-on-surface-variant text-[11px]"
              >
                AMOUNT
              </label>
              <input
                type="number"
                id="TITLE"
                placeholder="$ 0.00"
                className="outline-none text-body-sm rounded-sm text-white p-2 font-mono-numeric bg-surface-container  focus:bg-surface-container-highest"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="CATEGORY"
                className="text-on-surface-variant text-[11px]"
              >
                CATEGORY
              </label>
              <select
                id="CATEGORY"
                className="outline-none text-body-sm rounded-sm text-on-surface p-2 bg-surface-container  focus:bg-surface-container-highest"
              >
                <option value="Food & Dining">Food & Dining</option>
                <option value="Rent & Housing">Rent & Housing</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Utilities & Bills">
                  Utilities & Bills
                </option>
                <option value="Transportation">Transportation</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Other Expense">Other Expense</option>
              </select>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col">
              <label
                htmlFor="TITLE"
                className="text-on-surface-variant text-[11px]"
              >
                TITLE / MERCHANT
              </label>
              <input
                type="text"
                id="TITLE"
                placeholder="e.g. Client Wire, Employer Payroll, Dividend"
                className="outline-none text-body-sm rounded-sm text-white p-2 bg-surface-container  focus:bg-surface-container-highest"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="AMOUNT"
                className="text-on-surface-variant text-[11px]"
              >
                AMOUNT
              </label>
              <input
                type="number"
                id="TITLE"
                placeholder="$ 0.00"
                className="outline-none text-body-sm rounded-sm text-white p-2 font-mono-numeric bg-surface-container  focus:bg-surface-container-highest"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="CATEGORY"
                className="text-on-surface-variant text-[11px]"
              >
                CATEGORY
              </label>
              <select
                id="CATEGORY"
                className="outline-none text-body-sm rounded-sm text-on-surface p-2 bg-surface-container  focus:bg-surface-container-highest"
              >
                <option value="Salary & Payroll">Salary & Payroll</option>
                <option value="Freelance & Contract">Freelance & Contract</option>
                <option value="Investments & Dividends">Investments & Dividends</option>
                <option value="Side Project & Sales">
                  Side Project & Sales
                </option>
                <option value="Other Income">Other Income</option>
              </select>
            </div>
          </>
        )}
        <div className="flex flex-col">
          <label htmlFor="DATE" className="text-on-surface-variant text-[11px]">
            DATE
          </label>
          <input
            type="date"
            name="date"
            id="date"
            className="outline-none text-body-sm rounded-sm text-on-surface p-2 bg-surface-container  focus:bg-surface-container-highest"
          />
        </div>
        <button
          className={`text-black ${isExpense ? "bg-[#ff8493]" : "bg-[#2caa98]"} block w-full text-sm font-semibold py-2 mt-3`}
        >
          Record {isExpense ? "Expense" : "Income"}
        </button>
      </form>
    </div>
  );
};

export default QuickTransaction;
