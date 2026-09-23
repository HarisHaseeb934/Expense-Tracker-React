import { MdFastfood } from "react-icons/md";

const VelocityCard = ({ title, limit, spent, Icon, text }) => {
  return (
    <div className="p-3 bg-[#201f1f] rounded-md">
      <div>
        <div><Icon className={text} /></div>
        <div>
          <h1 className="text-white text-sm">{title}</h1>
          {limit ? (
            <p className="text-on-surface-variant text-[11px] md:text-xs">
              {spent} spent of {limit} budget
            </p>
          ) : <p className="text-on-surface-variant text-[11px] md:text-xs">First Add {title} Limit</p>}
        </div>
      </div>
      {limit && (
        <div className="relative">
          <div className="bg-[#353534] rounded-md w-full h-[5px] md:h-[7px]"></div>
          <div
            className="absolute bg-red-500 top-0 rounded-md w-full h-[5px] md:h-[7px] whitespace-nowrap"
            style={{ width: limit / spent + "%" }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default VelocityCard;
