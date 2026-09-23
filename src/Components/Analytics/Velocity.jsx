import { useContext } from "react";
import VelocityCard from "./VelocityCard";
import { InitialContext } from "../../Custom Hooks/InitialBalance";

const Velocity = () => {
  const {
    balance,
    utilitiesBillLimit,
    transportationLimit,
    foodDiningLimit,
    otherExpenseLimit,
    entertainment,
  } = useContext(InitialContext);
  const { transaction = [] } = balance;

  const reName = {
    Entertainment: [entertainment, "MdFastfood"],
    "Food & Dining": [foodDiningLimit, "MdFastfood"],
    Healthcare: [otherExpenseLimit,  "MdFastfood"],
    "Rent & Housing": [otherExpenseLimit,  "MdFastfood"],
    Transportation: [transportationLimit,  "MdFastfood"],
    "Utilities & Bills": [utilitiesBillLimit, "MdFastfood"],
  };

  console.log("Utilities " + otherExpenseLimit);
  const velocity = transaction.reduce((acc, tra) => {
    if (tra.type === "expense") {
      if (!acc[tra.category]) {
        acc[tra.category] = [];
      }
      acc[tra.category].push(tra);
    }
    return acc;
  }, {});

  const calculateDays = () => {
    const now = new Date();
    const daysThisMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
    ).getDate();
    const remaining = daysThisMonth - now.getDate()
    return {remaining, cycle:`${now.getDate()} / ${daysThisMonth}`}
  };
  calculateDays();
  return (
    <div className="bg-surface-container-low p-5 rounded-md flex flex-col gap-5 mt-5 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white">Category Velocity & Budget Shifts</h1>
          <p className="text-on-surface-variant text-[11px] md:text-xs">
            Pacing vs. monthly target allocations ({calculateDays().remaining} days remaining)
          </p>
        </div>
        <div className="text-white md:text-xs bg-surface-container-high px-2 py-1 rounded-sm">
          Cycle: Day {calculateDays().cycle}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {Object.keys(velocity).map((key) => {
          const spent = velocity[key].reduce((acc, tra) => {
            acc += Number(tra.amount);
            return acc;
          }, 0);
          console.log(velocity[key].at(0).text)
          return <VelocityCard title={key} limit={reName[key].at(0)} spent={spent} Icon={reName[key].at(1)} text={"textgreen-500"}/>;
        })}
      </div>
    </div>
  );
};

export default Velocity;
