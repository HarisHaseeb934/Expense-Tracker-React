const VelocityCard = ({ title, limit, spent, ICON, text }) => {
  const hexColor = text ? text.slice(6, -1) : "#ffffff";

  return (
    <div className="p-3 bg-[#201f1f] rounded-md flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="bg-[#353534] p-2 rounded-md">
          <ICON className={`${text} text-2xl `} />
        </div>
        <div>
          <h1 className="text-white text-sm">{title}</h1>
          {limit ? (
            <p className="text-on-surface-variant text-[11px] md:text-xs">
              {spent} spent of {limit} budget
            </p>
          ) : (
            <p className="text-on-surface-variant text-[11px] md:text-xs">
              First Add {title} Limit
            </p>
          )}
        </div>
      </div>
      {limit && (
        <div className="relative">
          <div className="bg-[#353534] rounded-md w-full h-[5px] md:h-[7px]"></div>
          <div
            className={`absolute top-0 rounded-md w-full h-[5px] md:h-[7px] whitespace-nowrap`}
            style={{
              width:
                (spent / limit) * 100 > 100
                  ? "100%"
                  : `${(spent / limit) * 100}%`,
              backgroundColor: hexColor,
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default VelocityCard;
