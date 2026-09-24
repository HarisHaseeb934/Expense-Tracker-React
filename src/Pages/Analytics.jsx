import { useState } from "react";
import CashFlowCard from "../Components/Analytics/CashFlowCard";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { TbArrowWaveLeftUp } from "react-icons/tb";
import { TbArrowWaveRightUp } from "react-icons/tb";
import AnalyticsCharts from "../Components/Analytics/AnalyticsCharts";
import { AiOutlineRise } from "react-icons/ai";
import { RiCashLine } from "react-icons/ri";
import Velocity from "../Components/Analytics/Velocity";
import BalanceContext from "../Context/BalanceProvider";
import { useBalance } from "../../CustomHooks/useBalance";

function getDate(date) {
  const daten = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).padStart(2, "0");
  return `${year}-${month}-${daten}`;
}

const BTN_DATA = [
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

const Analytics = () => {
  const [date, setDate] = useState({
    id: 1,
    display: "30D",
    date: getDate(new Date(new Date().setDate(new Date().getDate() - 30))),
    days: 30,
  });

  const { balance } = useBalance(BalanceContext);
  const { transaction = [] } = balance;

  const { income, expense } = transaction.reduce(
    (acc, trans) => {
      if (trans.date >= date.date) {
        if (trans.type === "income") {
          acc.income += Number(trans.amount);
        } else if (trans.type === "expense") {
          acc.expense += Number(trans.amount);
        }
      }
      return acc;
    },
    { income: 0, expense: 0 },
  );

  function prevIncomeExpense() {
    let prevDate = "";
    if (date.display === "30D") {
      prevDate = getDate(
        new Date(new Date().setDate(new Date().getDate() - 60)),
      );
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

  const { prevIncome, prevExpense } = prevIncomeExpense();

  function netCashFlow(income, expense) {
    let curr = income - expense;
    let prev = prevIncome - prevExpense;
    if (prev === 0) {
      return "+100";
    }
    return (((curr - prev) / prev) * 100).toFixed(1);
  }

  function dailyAvg(income, expense) {
    let curr = expense / date.days;
    let prev = prevExpense / date.days;
    if (prev === 0) return "0.0";
    return (((curr - prev) / prev) * 100).toFixed(1);
  }

  const savingsRateVal = () => {
    if (income === 0) return 0;
    const netCashFlow = income - expense;
    return (netCashFlow / income) * 100;
  };

  const projectedBalanceVal = () => {
    const currentBalance = balance.currentBalance || balance.amount || 0;

    const periodDays = date.days || 30;
    const netCashFlow = income - expense;
    const dailyNetRate = netCashFlow / periodDays;

    const today = new Date();
    const totalDaysInMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0,
    ).getDate();
    const remainingDays = totalDaysInMonth - today.getDate();

    return currentBalance + dailyNetRate * remainingDays;
  };

  return (
    <>
    <title>Analytics</title>
      <section className="w-full p-5">
        <div className="">
          <div className="flex justify-between md:flex-row flex-col gap-2">
            <h1 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl">
              Analytics & Financial Trends
            </h1>
            <div className="bg-surface-container-low text-on-surface-variant py-1 px-2 rounded-md flex justify-between sm:justify-start text-[11px] md:text-xs lg:text-sm">
              {BTN_DATA.map((btn) => {
                const { id, display, value, days } = btn;
                return (
                  <button
                    key={id}
                    className={`${id === date.id ? "text-white bg-surface-container-high" : ""} py-1 px-4 rounded-md`}
                    onClick={() => setDate({ ...btn, date: value })}
                  >
                    {display}
                  </button>
                );
              })}
            </div>
          </div>
          <p className="text-on-surface-variant text-[11px] md:text-xs mt-3 md:m-0">
            Deep-dive cash flow intelligence, forecasting, and categorical
            spending dynamics
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 w-full my-7">
          <CashFlowCard
            h={"NET CASH FLOW"}
            Icon={
              <AiOutlineRise className={"text-[#4edea3] text-md md:text-xl"} />
            }
            cash={`$${(income - expense).toFixed(2)}`}
            color={"bg-[#212f29] text-[#c4c5ff]"}
          >
            <div className="flex justify-between items-end">
              <p className="text-on-surface-variant text-xs md:text-sm">
                <span className="text-primary">
                  {netCashFlow(income, expense)}%
                </span>{" "}
                vs prev {date.display}
              </p>
              <TbArrowWaveRightUp className="text-[#4edea3] text-4xl md:text-5xl " />
            </div>
          </CashFlowCard>
          <CashFlowCard
            h={"AVG. DAILY SPEND"}
            Icon={
              <RiCashLine className={"text-[#b4b5ec] text-md md:text-xl"} />
            }
            cash={`$${(expense / date.days).toFixed(2)}`}
            color={"bg-[#2d2c32] text-[#c4c5ff]"}
          >
            <div className="flex justify-between items-end">
              <p className="text-on-surface-variant text-xs md:text-sm">
                <span className="text-primary">
                  {dailyAvg(income, expense)}%
                </span>{" "}
                efficiency gain
              </p>
              <TbArrowWaveLeftUp className="text-[#c4c5ff] text-4xl md:text-5xl " />
            </div>
          </CashFlowCard>
          <CashFlowCard
            h={"SAVINGS RATE"}
            Icon={"ON Target"}
            cash={`${savingsRateVal().toFixed(2)}%`}
            color={"bg-[#212f29] text-[#4edfa4] text-xs md:text-md lg:text-md"}
          >
            <div className="flex flex-col">
              <p className="font-bold text-on-surface-variant text-xs md:text-md">
                Target: {30.0}%
              </p>
              <div className="relative overflow-hidden">
                <div className="h-2 rounded-xl  bg-surface-container-high w-full"></div>
                <div
                  className="absolute h-2 rounded-xl top-0 left-0 bg-[#4edfa4] "
                  style={{
                    width: `${Math.min(Math.max(savingsRateVal(), 0), 100)}%`,
                  }}
                ></div>
              </div>
            </div>
          </CashFlowCard>
          <CashFlowCard
            h={"PROJECTED BALANCE"}
            Icon={
              <AiOutlineRise className={"text-[#4edea3] text-md md:text-xl"} />
            }
            cash={`$${projectedBalanceVal().toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            color={"bg-[#212f29] text-[#c4c5ff]"}
          >
            <div className="flex justify-between">
              <p className="text-on-surface-variant text-xs md:text-sm">
                Confidence Index
              </p>
              <div className="flex items-center text-sm">
                <IoIosCheckmarkCircleOutline className="text-[#4edea3]" />
                <span className="text-white ml-1">94%</span>
              </div>
            </div>
          </CashFlowCard>
        </div>

        <AnalyticsCharts transaction={transaction} />
        <div className="flex md:flex-row flex-col">
          <Velocity />
        </div>
      </section>
    </>
  );
};

export default Analytics;
