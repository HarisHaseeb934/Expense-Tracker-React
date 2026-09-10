import DashboardSvg from "../Components/DashboardSvg";
import DashboardTotalCard from "../Components/DashboardTotalCard";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";
import ExpenseBreakdown from "../Components/ExpenseBreakdown";
import QuickTransaction from "../Components/QuickTransaction";

const Dashboard = () => {
  return (
    <section className="w-full p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <DashboardTotalCard
        h2="BALANCE"
        icon="AiOutlineRise"
        gap="gap-5 md:col-span-2 lg:col-span-1"
        iconClass="bg-[#26322c] text-[#2caa98] p-1 rounded-sm flex items-center"
        money={12450.0}
        h1class="text-white"
        para="Avaliable across 3 connected accounts"
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
        money={12450.0}
        h1class="text-[#4edea3]"
        para="October 2024 payroll & contract"
      >
        <div className="flex justify-between  text-xs lg:text-body-sm mt-auto min-h-auto ">
          <p className="flex items-center bg-[#26322c] text-[#2caa98] rounded-full px-2">
            <MdArrowOutward /> <span> +$650.00 vs last month</span>
          </p>
          <p className="text-on-surface-variant">92% of target</p>
        </div>
      </DashboardTotalCard>
      <DashboardTotalCard
        h2="EXPENSE"
        icon="FaArrowDown"
        gap="gap-7 col-span-1"
        iconClass="bg-[#37191b] text-[#cba3b7] p-2 rounded-sm flex items-center"
        money={12450.0}
        h1class="text-[#ffb2b7]"
        para="Monthly cap: $2,100.00"
      >
        <div className="flex justify-between  text-xs lg:text-body-sm mt-auto min-h-auto ">
          <p className="flex items-center bg-[#37191b] text-[#cba3b7] rounded-full px-2">
            <IoIosCheckmarkCircleOutline />{" "}
            <span> -12% under budget limit</span>
          </p>
          <p className="text-on-surface-variant">$250 left</p>
        </div>
      </DashboardTotalCard>

      {/* Chart and Form */}

      <ExpenseBreakdown/>
      <QuickTransaction/>
    </section>
  );
};

export default Dashboard;
