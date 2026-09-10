import { useState } from "react"
import DonutExpenseCard from "./DonutExpenseCard"
import ExpenseBreakdownCard from "./ExpenseBreakdownCard"

const ExpenseBreakdown = () => {
    const [select, setSelect] = useState("month")
  return (
    <div className="col-span-1 md:col-span-2 bg-surface-container-low p-5 rounded-md">
        <div className="flex justify-between">
            <div className="">
                <h1 className="text-white font-bold text-sm md:text-base">Expense Breakdown</h1>
                <p className="text-on-surface-variant text-xs">Categorical distribution for active cycle</p>
            </div>
            <select value={select} onChange={(e) => setSelect(e.target.value)} className="text-white outline-none bg-[#201f1f] p-1 md:p-2 rounded-md text-xs md:text-base">
                <option value="month">This Month</option>
                <option value="30">30 Days</option>
                <option value="quaterly">Quaterly</option>
            </select>
        </div>
        <DonutExpenseCard/>
        <div className="flex justify-center sm:justify-evenly flex-col sm:flex-row  gap-5">
            <ExpenseBreakdownCard/>
            <ExpenseBreakdownCard/>
            <ExpenseBreakdownCard/>
        </div>
    </div>
  )
}

export default ExpenseBreakdown