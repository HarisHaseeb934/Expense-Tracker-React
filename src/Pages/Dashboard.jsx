import DashboardSvg from "../Components/DashboardSvg";
import DashboardTotalCard from "../Components/DashboardTotalCard";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";
import ExpenseBreakdown from "../Components/ExpenseBreakdown";
import QuickTransaction from "../Components/QuickTransaction";
import RecentTransaction from "../Components/RecentTransaction";
import { useContext } from "react";
import { InitialContext } from "../Custom Hooks/InitialBalance";

const Dashboard = () => {
  const { balance, setBalance } = useContext(InitialContext);
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

  function getMonth(){
    const date = new Date();
    if(date.getDate() === 1){
      setBalance(prev => ({...prev, income: 0}))
    }
    return date.toDateString().split(" ").at(1) + " " + date.toDateString().split(" ").at(3)
  }

  function calcIncome(){
    if(transaction.length > 0){
      return transaction.filter(trans => trans.type === "income").reduce((acc, trans) => acc += Number(trans.amount),0)
    }else{
      return 0;
    }
  }

  function calcExpense(){
    if(transaction.length > 0){
      return transaction.filter(trans => trans.type === "expense").reduce((acc, trans) => acc += Number(trans.amount),0)
    }else{
      return 0;
    }
  }

  // function getMonth(){
  //   const date = new Date();
  //   if(date.getDate() === 1){
  //     setBalance(prev => ({...prev, income: 0}))
  //   }
  //   return date.toDateString().split(" ").at(1) + " " + date.toDateString().split(" ").at(3)
  // }

  return (
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
        money={calcIncome()}
        h1class="text-[#4edea3]"
        para={`${getMonth()} payroll & contract`}
      >
        <div className="flex justify-between  text-xs lg:text-body-sm mt-auto min-h-auto ">
          <p className="flex items-center bg-[#26322c] text-[#2caa98] rounded-full px-2">
            <MdArrowOutward />{" "}
            <span className="font-bold"> +$650.00 vs last month</span>
          </p>
          <p className="text-on-surface-variant">{(calcIncome() / targetIncome) * 100 || 0}% of target</p>
        </div>
      </DashboardTotalCard>
      <DashboardTotalCard
        h2="EXPENSE"
        icon="FaArrowDown"
        gap="gap-7 col-span-1"
        iconClass="bg-[#37191b] text-[#cba3b7] p-2 rounded-sm flex items-center"
        money={calcExpense()}
        h1class="text-[#ffb2b7]"
        para={`Monthly cap: ${utilitiesBillLimit + transportationLimit + foodDiningLimit + otherExpenseLimit || 0}`}
      >
        <div className="flex justify-between  text-xs lg:text-body-sm mt-auto min-h-auto ">
          <p className="flex items-center bg-[#37191b] text-[#cba3b7] rounded-full px-2">
            <IoIosCheckmarkCircleOutline />{" "}
            <span className="font-bold"> -12% under budget limit</span>
          </p>
          <p className="text-on-surface-variant">$250 left</p>
        </div>
      </DashboardTotalCard>

      {/* Chart and Form */}

      <ExpenseBreakdown />
      <QuickTransaction />

      {/* Recent Transaction */}
      <RecentTransaction transaction = {transaction}/>
    </section>
  );
};

export default Dashboard;
