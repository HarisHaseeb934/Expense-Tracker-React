import { IoSearchOutline } from "react-icons/io5";
import RecentTableRow from "./RecentTableRow";

const RecentTransaction = () => {
  return (
    <div className="bg-surface-container-low p-5 rounded-md flex flex-col gap-4 col-span-full">
      <div className="flex md:justify-between md:items-center flex-col md:flex-row gap-4">
        <div>
          <h1 className="text-white font-bold">Recent Transactions</h1>
          <p className="text-on-surface-variant text-xs">
            Real-time ledger updates across synchronized cards
          </p>
        </div>
        <div className="bg-[#201f1f] flex items-center p-2 w-full  md:w-2xs rounded-sm">
          <IoSearchOutline className="text-on-surface-variant text-sm" />
          <input
            type="text"
            placeholder="Search transactions, merchants..."
            className="text-white text-xs sm:text-sm md:text-base outline-none w-full px-2"
          />
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
          <RecentTableRow date={"10/20/2024"} title={"Haris"} category={"food"} type={"Debit"} amount={10000}/>
          <RecentTableRow date={"10/20/2024"} title={"Haris"} category={"food"} type={"Debit"} amount={10000}/>
          <RecentTableRow date={"10/20/2024"} title={"Haris"} category={"food"} type={"Debit"} amount={10000}/>
          <RecentTableRow date={"10/20/2024"} title={"Haris"} category={"food"} type={"Debit"} amount={10000}/>
        </tbody>
      </table>
    </div>
  );
};

export default RecentTransaction;
