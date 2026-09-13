import { IoSearchOutline } from "react-icons/io5";
import RecentTableRow from "./RecentTableRow";
import { useState } from "react";

const RecentTransaction = ({ transaction }) => {
  const [search, setSearch] = useState("all");
  // function handleSearch(trans){
  //   if(search){
  //     return trans.
  //   }
  // }
  // const filterRecent = transaction.filter(trans => handleSearch()) 
  console.log(transaction)

  const searchFilter = (tran) =>{
    if(search === "all"){
      return tran
    }
    return tran.type === search
  }
  
  const filter = transaction.filter(tran => searchFilter(tran))
  console.log(filter)
  return (  
    <div className="bg-surface-container-low p-5 rounded-md flex flex-col gap-4 col-span-full">
      <div className="flex md:justify-between md:items-center flex-col md:flex-row gap-4">
        <div>
          <h1 className="text-white font-bold">Recent Transactions</h1>
          <p className="text-on-surface-variant text-xs">
            Real-time ledger updates across synchronized cards
          </p>
        </div>
        <div className=" flex items-center gap-8">
          <button className="bg-[#201f1f] px-3 text-red-300 rounded-sm text-sm cursor-pointer hover:text-red-400" onClick={() => setSearch("all")}>All</button>
          <button className="bg-[#201f1f] px-3 text-red-300 rounded-sm text-sm cursor-pointer hover:text-red-400" onClick={() => setSearch("expense")}>Expense</button>
          <button className="bg-[#201f1f] px-3 text-red-300 rounded-sm text-sm cursor-pointer hover:text-red-400" onClick={() => setSearch("income")}>Income</button>
        </div>
      </div>

      <table className="w-full text-left text-on-surface-variant text-[8px] sm:text-sm border-collapse mt-2">
        <thead>
          <tr className="">
            <th>DATE</th>
            <th className="line-clamp-1">TITLE</th>
            <th>CATEGORY</th>
            <th>TYPE</th>
            <th className="text-right">AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {filter.length > 0 &&
            filter.map((trans, index) => {
              let { data, title, category, type, amount } = trans;
              return (
                <RecentTableRow
                key={index}
                  {...trans}
                />
              );
            })}
          {/* <RecentTableRow
            date={"10/20/2024"}
            title={"Haris"}
            category={"food"}
            type={"Debit"}
            amount={-10000}
          />
          <RecentTableRow
            date={"10/20/2024"}
            title={"Haris"}
            category={"food"}
            type={"Debit"}
            amount={10000}
          />
          <RecentTableRow
            date={"10/20/2024"}
            title={"Haris"}
            category={"food"}
            type={"Debit"}
            amount={10000}
            text={categories["Salary & Payroll"].color}
            bg={categories["Salary & Payroll"].bgColor}
          />
          <RecentTableRow
            date={"10/20/2024"}
            title={"Haris"}
            category={"food"}
            type={"Debit"}
            amount={10000}
            text={categories["Salary & Payroll"].color}
            bg={categories["Salary & Payroll"].bgColor}
          /> */}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTransaction;
