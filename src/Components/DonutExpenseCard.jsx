import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function DonutExpenseCard({ transaction = [] }) {
  // 1. Calculate expense total
  const totalExpense = transaction
    .filter((trans) => trans.type === "expense")
    .reduce((acc, trans) => acc + Number(trans.amount), 0);

  // 2. Define dynamic data with integrated colors
  const dynamicData = [
    { name: "Largest Expense", value: 40, color: "#b4b0ff", detail: "Rent (40%)" },
    { name: "Discretionary", value: 35, color: "#ff7b89", detail: "Food ($647.50)" },
    { name: "Under Target", value: 25, color: "#52e3a1", detail: "Entertainment", isGreen: true },
  ];

  return (
    <div className="flex items-center justify-between flex-col md:flex-row p-6 md:p-8 rounded-2xl text-white font-sans w-full">
      <div className="relative w-[200px] h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dynamicData}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={82}
              stroke="none"
            >
              {/* Dynamic fill mapping */}
              {dynamicData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
          <div className="text-[11px] tracking-widest text-[#a0a0a0] uppercase font-semibold">Spent</div>
          <div className="text-2xl font-bold my-0.5">${totalExpense}</div>
          <div className="text-xs text-[#a0a0a0]">Total</div>
        </div>
      </div>

      {/* Dynamic Legend */}
      <div className="flex flex-col gap-3 w-[280px]">
        {dynamicData.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center bg-[#202020] px-4 py-2.5 rounded-lg">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-xs text-[#e0e0e0] font-medium">{item.name}</span>
            </div>
            <span className={`text-xs font-semibold ${item.isGreen ? "text-[#52e3a1]" : "text-white"}`}>
              {item.detail}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}