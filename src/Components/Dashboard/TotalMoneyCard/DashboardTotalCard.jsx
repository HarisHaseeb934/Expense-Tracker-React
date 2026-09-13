import { AiOutlineRise } from "react-icons/ai";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";

const icons = {
  AiOutlineRise: <AiOutlineRise className="text-lg"/>,
  FaArrowUp: <FaArrowUp className="text-sm"/>,
  FaArrowDown: <FaArrowDown className="text-sm"/>,
};

const DashboardTotalCard = ({ h2, icon, gap, iconClass, money, h1class, para , children}) => {
  return (
    <div className={`bg-surface-container-low p-5 rounded-md flex flex-col ${gap}`}>
      <div className="flex justify-between items-center">
        <h2 className="text-on-surface-variant">TOTAL {h2}</h2>
        <div className={`${iconClass}`}>{icons[icon]}</div>
      </div>
      <div>
        <h1 className={`text-display-lg ${h1class}`}>${money}</h1>
        <p className="text-on-surface-variant text-body-sm">{para}</p>
      </div>
      {children}
    </div>
  );
};

export default DashboardTotalCard;
