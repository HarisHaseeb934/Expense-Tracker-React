import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function DonutExpenseCard({
  dynamicData,
  sortedColors,
  category_map,
  labels,
  totalExpense,
}) {
  return (
    <div className="flex items-center justify-between flex-col md:flex-row p-6 md:p-8 rounded-2xl text-white font-sans w-full">
      <div className="relative w-[200px] h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dynamicData}
              dataKey="amount"
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={82}
              stroke="none"
            >
              {dynamicData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
          <div className="text-[11px] tracking-widest text-[#a0a0a0] uppercase font-semibold">
            Spent
          </div>
          <div className="text-2xl font-bold my-0.5">
            ${totalExpense.toLocaleString()}
          </div>
          <div className="text-xs text-[#a0a0a0]">Total</div>
        </div>
      </div>

      <div className="flex flex-col gap-3 w-[280px]">
        {sortedColors.map(([bgClass, value], idx) => {
          const categoryName = category_map[bgClass].name;

          return (
            <div
              key={bgClass}
              className="flex justify-between items-center bg-[#202020] px-4 py-2.5 rounded-lg"
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-2 h-2 rounded-full ${category_map[bgClass].bg}`}
                />
                <span className="text-xs text-[#e0e0e0] font-medium">
                  {labels[idx]}
                </span>
              </div>
              <span className="text-xs font-semibold">
                {categoryName} (${value.toLocaleString()})
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
