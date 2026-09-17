import { useContext, useState } from "react";
import DonutExpenseCard from "./DonutExpenseCard";
import ExpenseBreakdownCard from "./ExpenseBreakdownCard";
import { InitialContext } from "../../../Custom Hooks/InitialBalance";

const category_map = {
  "bg-[#3d282a]": {
    name: "Food",
    fill: "#ff8493",
    bg: "bg-[#ff8493]",
    text: "text-[#ff8493]",
  },
  "bg-[#34333c]": {
    name: "Rent",
    fill: "#abace4",
    bg: "bg-[#abace4]",
    text: "text-[#abace4]",
  },
  "bg-[#23372e]": {
    name: "Entertainment",
    fill: "#4edea3",
    bg: "bg-[#4edea3]",
    text: "text-[#4edea3]",
  },
};

const labels = ["Largest Expense", "Discretionary", "Under Target"];

const ExpenseBreakdown = () => {
  const { balance, setBalance } = useContext(InitialContext);

  const [select, setSelect] = useState({
    select: "This Month",
    date: getDate(
      new Date(
        new Date().setDate(new Date().getDate() + 1 - new Date().getDate()),
      ),
    ),
  });

  console.log("select: ", select);
  function handleChange(e) {
    const { name, value } = e.target;
    console.log("Date Change", e.currentTarget.selectedOptions[0].dataset.date);
    const date = e.currentTarget.selectedOptions[0].dataset.date;
    setSelect((prev) => ({
      ...prev,
      [name]: value,
      date,
    }));
  }
  const { transaction } = balance;

  const expenses = transaction.filter((trans) => trans.type === "expense");

  const selectedDate = expenses.filter((trans) => trans.date >= select.date);

  const totalExpense = selectedDate.reduce(
    (acc, trans) => acc + Number(trans.amount),
    0,
  );

  const colors = selectedDate.reduce((acc, trans) => {
    acc[trans.bg] = (acc[trans.bg] || 0) + Number(trans.amount);
    return acc;
  }, {});

  const sortedColors = Object.entries(colors).sort((a, b) => b[1] - a[1]);

  const dynamicData = sortedColors.map(([bgClass, amount]) => {
    console.log("category_map[bgClass]", category_map[bgClass]);
    const data = category_map[bgClass];
    return {
      ...data,
      amount,
    };
  });

  function getDate(date) {
    const daten = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).padStart(2, "0");

    return `${year}-${month}-${daten}`;
  }
  // getDate(new Date(new Date().setDate(new Date().getDate())));

  return (
    <div className="col-span-1 md:col-span-2 bg-surface-container-low p-5 rounded-md">
      <div className="flex justify-between">
        <div className="">
          <h1 className="text-white font-bold text-sm md:text-base">
            Expense Breakdown
          </h1>
          <p className="text-on-surface-variant text-[10px] sm:text-xs">
            Categorical distribution for active cycle
          </p>
        </div>
        <select
          value={select.select}
          name="select"
          onChange={handleChange}
          className="text-white outline-none bg-[#201f1f] text-[11px] md:p-2 rounded-xs h-7 sm:h-10  md:rounded-sm sm:text-xs"
        >
          <option
            value="This Month"
            data-date={getDate(
              new Date(
                new Date().setDate(
                  new Date().getDate() + 1 - new Date().getDate(),
                ),
              ),
            )}
          >
            This Month
          </option>
          <option
            value="30 Days"
            data-date={getDate(
              new Date(new Date().setDate(new Date().getDate() - 30)),
            )}
          >
            30 Days
          </option>
          <option
            value="Quaterly"
            data-date={getDate(
              new Date(new Date().setDate(new Date().getDate() - 120)),
            )}
          >
            Quaterly
          </option>
        </select>
      </div>
      <DonutExpenseCard
        dynamicData={dynamicData}
        sortedColors={sortedColors}
        totalExpense={totalExpense}
        category_map={category_map}
        labels={labels}
      />
      <div className="flex flex-wrap flex-col sm:flex-row  gap-5">
        {sortedColors.map(([bgClass, value], idx) => {
          const categoryName = category_map[bgClass].name;
          return (
            <ExpenseBreakdownCard
              key={idx}
              color={category_map[bgClass].bg}
              price={value}
              percentage={((value / totalExpense) * 100).toFixed()}
              label={categoryName}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ExpenseBreakdown;
