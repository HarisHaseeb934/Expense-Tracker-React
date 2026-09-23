import { useContext } from "react";
import VelocityCard from "./VelocityCard";
import { ImSpoonKnife } from "react-icons/im";
import { FaPlaneDeparture } from "react-icons/fa6";
import { MdLocalMovies } from "react-icons/md";
import { GiHealthNormal } from "react-icons/gi";
import { FaHouseChimneyUser } from "react-icons/fa6";
import { FaMoneyBills } from "react-icons/fa6";
import { InitialContext } from "../../Context/BalanceContext";

const Velocity = () => {
  const { balance } = useContext(InitialContext);
  const {
    transaction = [],
    utilitiesBillLimit,
    transportationLimit,
    foodDiningLimit,
    otherExpenseLimit,
    entertainment,
  } = balance;
  const reName = {
    Entertainment: { Entertainment: entertainment, ICON: MdLocalMovies },
    "Food & Dining": { "Food & Dining": foodDiningLimit, ICON: ImSpoonKnife },
    Healthcare: { Healthcare: otherExpenseLimit, ICON: GiHealthNormal },
    "Rent & Housing": {
      "Rent & Housing": otherExpenseLimit,
      ICON: FaHouseChimneyUser,
    },
    Transportation: {
      Transportation: transportationLimit,
      ICON: FaPlaneDeparture,
    },
    "Utilities & Bills": {
      "Utilities & Bills": utilitiesBillLimit,
      ICON: FaMoneyBills,
    },
  };

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
    const remaining = daysThisMonth - now.getDate();
    return { remaining, cycle: `${now.getDate()} / ${daysThisMonth}` };
  };

  return (
    <div className="bg-surface-container-low p-5 rounded-md flex flex-col gap-5 mt-5 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white">Category Velocity & Budget Shifts</h1>
          <p className="text-on-surface-variant text-[11px] md:text-xs">
            Pacing vs. monthly target allocations ({calculateDays().remaining}{" "}
            days remaining)
          </p>
        </div>
        <div className="text-white text-[8px] md:text-xs bg-surface-container-high px-2 py-1 rounded-sm">
          Cycle: Day {calculateDays().cycle}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {Object.keys(velocity).map((key, index) => {
          const spent = velocity[key].reduce((acc, tra) => {
            acc += Number(tra.amount);
            return acc;
          }, 0);
          return (
            <VelocityCard
              key={index}
              title={key}
              limit={reName[key][key]}
              spent={spent}
              ICON={reName[key].ICON}
              text={velocity[key].at(0).text}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Velocity;
