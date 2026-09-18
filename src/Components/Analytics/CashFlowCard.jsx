import { AiOutlineRise } from "react-icons/ai";
import { RiCashLine } from "react-icons/ri";


const ICON = {
  AiOutlineRise: (
    <AiOutlineRise className={"text-[#4edea3] text-md md:text-xl"} />
  ),
  RiCashLine: <RiCashLine className={"text-[#b4b5ec] text-md md:text-xl"} />,
  ONTarget: "On Target",
};

const CashFlowCard = ({ h, Icon, cash, color, children }) => {
  return (
    <div className="lg:col-span-1 bg-[#1c1b1b] p-5 rounded-xl flex flex-col gap-5 w-full">
      <div className="flex-1">
        <div className="flex justify-between">
          <h2 className="text-on-surface-variant text-xs md:text-sm ">{h}</h2>
          <div className={`${color} rounded-sm md:rounded-md p-1 md:p-2`}>
            {Icon}
          </div>
        </div>
        <h1 className="text-white text-4xl font-bold">{cash}</h1>
      </div>
      <div className="">{children}</div>
    </div>
  );
};

export default CashFlowCard;
