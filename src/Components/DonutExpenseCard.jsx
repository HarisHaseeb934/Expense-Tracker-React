import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Largest Expense', value: 40, color: '#b4b0ff' },
  { name: 'Discretionary', value: 35, color: '#ff7b89' },
  { name: 'Under Target', value: 25, color: '#52e3a1' },
];

const legendItems = [
  { label: 'Largest Expense', value: 'Rent (40%)', color: '#b4b0ff' },
  { label: 'Discretionary', value: 'Food ($647.50)', color: '#ff7b89' },
  { label: 'Under Target', value: 'Entertainment', color: '#52e3a1', isGreenText: true },
];

export default function DonutExpenseCard() {
  return (
    <div className="flex items-center justify-between flex-col md:flex-row p-6 md:p-8 rounded-2xl text-white font-sans w-full">
      <div className="relative w-[200px] h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={82}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text Overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
          <div className="text-[11px] tracking-widest text-[#a0a0a0] uppercase font-semibold">
            Spent
          </div>
          <div className="text-2xl font-bold my-0.5">
            $1,850
          </div>
          <div className="text-xs text-[#a0a0a0]">
            Total
          </div>
        </div>
      </div>

      {/* Legend Panel */}
      <div className="flex flex-col gap-3 w-[280px]">
        {legendItems.map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center bg-[#202020] px-4 py-2.5 rounded-lg"
          >
            <div className="flex items-center gap-2.5">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-[#e0e0e0] font-medium">
                {item.label}
              </span>
            </div>
            <span
              className={`text-xs font-semibold ${
                item.isGreenText ? 'text-[#52e3a1]' : 'text-white'
              }`}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}