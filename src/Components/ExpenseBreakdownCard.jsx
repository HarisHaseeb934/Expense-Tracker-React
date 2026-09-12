const ExpenseBreakdownCard = ({color, percentage, price}) => {
  return (
    <div className="bg-surface-container p-2 rounded-md w-full md:w-[250px] flex flex-col gap-2">
      <div className="flex items-center gap-1">
        <span className={`size-1 block p-1 bg-green-500 rounded-full `}></span>
        <span className="text-on-surface-variant text-[12px]">Rent & Housing</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-white font-bold">40%</span>
        <span className="text-on-surface-variant text-[12px]">$740</span>
      </div>
    </div>
  );
};

export default ExpenseBreakdownCard;
