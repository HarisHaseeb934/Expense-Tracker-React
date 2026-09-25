import DashboardSvg from "../Components/Dashboard/TotalMoneyCard/DashboardSvg";
import DashboardTotalCard from "../Components/Dashboard/TotalMoneyCard/DashboardTotalCard";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";
import ExpenseBreakdown from "../Components/Dashboard/ExpenseCard/ExpenseBreakdown";
import QuickTransaction from "../Components/Dashboard/QuickTransaction";
import RecentTransaction from "../Components/Dashboard/RecentTable/RecentTransaction";
import {
  getThisMonthName,
  showThisMonthExpense,
  showThisMonthIncome,
  totalBalanceCalc,
} from "../../Utils/calc";
import { useBalance } from "../../CustomHooks/useBalance.jsx";
import { BalanceContext } from "../../CustomHooks/BalanceContext.jsx";
import { useEffect } from "react";

const Dashboard = () => {
  const { balance, setBalance } = useBalance(BalanceContext);
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

  let totalExpenseLimit =
    utilitiesBillLimit +
    transportationLimit +
    foodDiningLimit +
    otherExpenseLimit +
    entertainment;

  const monthName = getThisMonthName();
  const income = showThisMonthIncome(transaction);
  const expense = showThisMonthExpense(transaction);
  
  useEffect(() => {
    totalBalanceCalc(balance, setBalance);
  }, [transaction]);

  return (
    <>
      <title>Dashboard</title>
      <section className="w-full p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <DashboardTotalCard
          h2="BALANCE"
          icon="AiOutlineRise"
          gap="gap-5 md:col-span-2 lg:col-span-1"
          iconClass="bg-[#26322c] text-[#2caa98] p-1 rounded-sm flex items-center"
          money={totalBalance ? totalBalance : 0}
          h1class="text-white"
          para="Avaliable across 1 connected accounts"
        >
          <div className="mt-auto">
            <DashboardSvg />
          </div>
        </DashboardTotalCard>
        <DashboardTotalCard
          h2="INCOME"
          icon="FaArrowUp"
          gap="gap-7 col-span-1"
          iconClass="bg-[#26322c] text-[#2caa98] p-2 rounded-sm flex items-center"
          money={income.toFixed(2)}
          h1class="text-[#4edea3]"
          para={`${monthName} payroll & contract`}
        >
          <div className="flex justify-between  text-xs lg:text-body-sm mt-auto min-h-auto ">
            <p className="flex items-center bg-[#26322c] text-[#2caa98] rounded-full px-2">
              <MdArrowOutward />{" "}
              <span className="font-bold text-[11px] md:text-xs">
                {" "}
                +$650.00 vs last month
              </span>
            </p>
            <p className="text-on-surface-variant text-[11px] md:text-xs">
              {((income / targetIncome) * 100).toFixed()}% of target
            </p>
          </div>
        </DashboardTotalCard>
        <DashboardTotalCard
          h2="EXPENSE"
          icon="FaArrowDown"
          gap="gap-7 col-span-1"
          iconClass="bg-[#37191b] text-[#cba3b7] p-2 rounded-sm flex items-center"
          money={expense.toFixed(2)}
          h1class="text-[#ffb2b7]"
          para={`Monthly cap: ${totalExpenseLimit || 0}`}
        >
          <div className="flex justify-between  text-xs lg:text-body-sm mt-auto min-h-auto ">
            <p className="flex items-center bg-[#37191b] text-[#cba3b7] rounded-full px-2">
              <IoIosCheckmarkCircleOutline />{" "}
              <span className="font-bold text-[11px] md:text-xs">
                {" "}
                {totalExpenseLimit !== ""
                  ? ((expense / totalExpenseLimit) * 100).toFixed()
                  : 0}
                % under budget limit
              </span>
            </p>
            <p className="text-on-surface-variant text-[11px] md:text-xs">
              ${(totalExpenseLimit - expense).toFixed(2)} left
            </p>
          </div>
        </DashboardTotalCard>

        <ExpenseBreakdown />
        <QuickTransaction />

        <RecentTransaction transaction={transaction} />
      </section>
    </>
  );
};

export default Dashboard;
