import { useState, useMemo } from "react";
import CashFlowChart from "./CashFlowChart";

const BTN = [
  { id: 1, days: 7, value: "Daily", trailing: "7 Days" },
  { id: 2, days: 30, value: "Weekly", trailing: "4 Weeks" },
  { id: 3, days: 180, value: "Monthly", trailing: "6 Months" },
];

const AnalyticsCharts = ({ transaction = [] }) => {
  const [btn, setBtn] = useState(BTN[0]);

  const handleChart = (transaction, getKeys) => {
    let dateWiseObj = transaction.reduce((acc, tran) => {
      let key = getKeys(tran.date);
      if (!acc[key]) {
        acc[key] = { inflow: 0, outflow: 0 };
      }
      let amount = Number(tran.amount);
      if (tran.type === "expense") {
        acc[key].outflow += amount;
      } else if (tran.type === "income") {
        acc[key].inflow += amount;
      }
      return acc;
    }, {});

    if (btn.value === "Monthly") {
      return Object.keys(dateWiseObj)
        .sort((a, b) => new Date(`1 ${a}`) - new Date(`1 ${b}`))
        .map((key) => {
          return {
            label: key,
            inflow: dateWiseObj[key].inflow,
            outflow: dateWiseObj[key].outflow,
          };
        });
    } else {
      return Object.keys(dateWiseObj)
        .sort()
        .map((key) => {
          return {
            label: key,
            inflow: dateWiseObj[key].inflow,
            outflow: dateWiseObj[key].outflow,
          };
        });
    }
  };

  function getPreviousSunday(dateInput) {
    const date = new Date(dateInput);
    const dayOfWeek = date.getDay();
    date.setDate(date.getDate() - dayOfWeek);
    return date.toLocaleString().split(",").at(0);
  }

  function getMonths(dateInput) {
    const date = new Date(dateInput);
    let month = date.toDateString().split(" ").at(1);
    let year = date.toDateString().split(" ").at(3);
    return `${year}-${month}`;
  }

  let newChart = [];

  if (btn.value === "Daily") {
    let chartData = handleChart(transaction, (dateStr) => dateStr);
    newChart = chartData.slice(-7)
  } else if (btn.value === "Weekly") {
    let chartData = handleChart(transaction, getPreviousSunday);
    newChart = chartData.slice(-4)
  } else {
    let chartData = handleChart(transaction, getMonths);
    newChart = chartData.slice(-6)
  }

  return (
    <div className="bg-[#1c1b1b] p-5 rounded-md">
      <div className="flex md:items-center justify-between items-start md:flex-row flex-col gap-5">
        <div>
          <h2 className="text-white font-bold text-md sm:text-lg md:text-xl lg:text-xl">
            Cash Inflow vs. Outflow Trajectory{" "}
            <span className="text-[10px] font-normal ml-4 p-1 rounded-sm text-on-surface-variant bg-surface-container-high">
              Trailing {btn.trailing}
            </span>
          </h2>
          <p className="text-on-surface-variant text-[10px] md:text-xs lg:text-sm">
            {btn.value} velocity breakdown comparing income streams against
            aggregate burn
          </p>
        </div>
        <div className="flex gap-4 flex-col lg:flex-row">
          <div className="flex items-center gap-3 text-[11px] md:text-xs lg:text-sm">
            <div className="flex items-center gap-2">
              <div className="size-2 md:size-3 bg-[#46c18f] rounded-xs"></div>
              <div className="text-on-surface-variant">Inflow</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-2 md:size-3 bg-[#ffb2b7] rounded-xs"></div>
              <div className="text-on-surface-variant">Outflow</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-[3px] w-3 bg-[#c0c1f6] rounded-xs"></div>
              <div className="text-on-surface-variant">Net Delta</div>
            </div>
          </div>
          <div className="bg-[#201f1f] text-shadow-on-surface-variant flex justify-between rounded-sm text-[11px] md:text-xs lg:text-sm">
            {BTN.map((curbtn) => (
              <button
                key={curbtn.id}
                className={`${
                  curbtn.id === btn.id
                    ? "bg-surface-container-high text-white"
                    : ""
                } rounded-sm md:px-4 md:py-1.5 px-2 py-1 transition-colors text-on-surface-variant`}
                onClick={() => setBtn(curbtn)}
              >
                {curbtn.value}
              </button>
            ))}
          </div>
        </div>
      </div>

      <CashFlowChart data={newChart} />
    </div>
  );
};

export default AnalyticsCharts;
