import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useContext, useEffect, useRef, useState } from "react";
import { GrNotes } from "react-icons/gr";
import { InitialContext } from "../Custom Hooks/InitialBalance";



const Header = () => {
  const {balance, setBalance} = useContext(InitialContext);
  console.log(useContext(InitialContext));
  
  const [isNavHide, setIsNavHide] = useState(true);
  const [isModal, setModal] = useState(false);
  const modal = useRef(null);
  function navStyle({ isActive }) {
    return `${isActive ? "text-on-surface bg-surface-container-high" : ""} block w-full p-2 md:p-3 rounded-sm text-sm font-medium hover:bg-surface-container-high`;
  }

  function handleClick() {
    setModal(true)
  }

  function handleChange(event) {
    let {name, value} = event.target;
    setBalance(prev => ({...prev, [name]: value}))
  }

  function handleSubmit(e){
    e.preventDefault();
    setModal(false)
  }

  useEffect(() => {
    function handleModal(event){
      // console.log(modal.current);
      
      if(modal.current && !modal.current.contains(event.target)){
        setModal(false)
      }
    }

    document.addEventListener("mousedown", handleModal)
    return () => {
      document.removeEventListener("mousedown", handleModal)
    }
  },[modal])

  return (
    <div>
      <header className="relative max-w-7xl w-full m-auto px-5 py-5 flex justify-between items-center gap-3 md:gap-7">
        <div className="flex justify-between items-center gap-3 md:gap-7">
          <div className="flex items-center">
            <img src="Logo.png" alt="FinFlow Logo" className="w-10" />
            <NavLink
              className="text-sm md:text-xl font-bold text-on-surface"
              to={"/"}
            >
              FinFlow
            </NavLink>
          </div>
          <nav
            className={`${isNavHide ? "hidden" : "absolute top-full inset-x-0 bg-surface-container-low p-4 z-50 text-center border-b border-outline-variant shadow-overlay"} sm:static sm:block sm:p-0 sm:border-none sm:bg-transparent sm:shadow-none`}
          >
            <ul className="flex flex-col sm:flex-row text-on-surface-variant gap-2">
              <li>
                <NavLink to={"/"} className={navStyle}>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to={"/analytics"} className={navStyle}>
                  Analytics
                </NavLink>
              </li>
              <li>
                <NavLink to={"/exchange"} className={navStyle}>
                  Live Exchange Rates
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex gap-5 items-center">
          <button
            className="bg-[#4edea3] text-xs md:text-sm font-semibold px-2 py-1 md:px-3 md:py-2 rounded-sm"
            onClick={handleClick}
          >
            + Add Detail
          </button>
          <button
            className="sm:hidden"
            onClick={() => setIsNavHide((prev) => !prev)}
          >
            <GiHamburgerMenu className="text-on-surface-variant" />
          </button>
        </div>
      </header>
      {isModal && <div className="backdrop-blur-sm fixed top-0 z-100 w-full min-h-screen">
        <div className="max-w-lg w-full bg-surface-container-low mx-auto my-15 p-5 rounded-md" ref={modal}>
          <div className="">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-md bg-[#24382f]">
                <GrNotes className="text-[#4edea3] " />
              </div>
              <h1 className="text-white font-semibold text-lg">
                New Transaction
              </h1>
            </div>
            <p className="text-on-surface-variant text-xs">
              Record an expense, income, or transfer
            </p>
          </div>
          <form className="flex flex-col gap-5 mt-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="totalBalanceLimit"
                className="text-on-surface-variant text-xs"
              >
                TOTAL BALANCE
              </label>
              <input
                type="number"
                id="totalBalanceLimit"
                name="totalBalanceLimit"
                value={balance.totalBalance}
                onChange={handleChange}
                className="rounded-sm bg-[#1e1e1e] w-full p-2 outline-none text-white text-sm"
                placeholder="$0.00"
              />
            </div>
            <div>
              <label
                htmlFor="targetIncomeLimit"
                className="text-on-surface-variant text-xs"
              >
                INCOME TARGET
              </label>
              <input
                type="number"
                id="targetIncomeLimit"
                name="targetIncomeLimit"
                value={balance.targetIncome}
                onChange={handleChange}
                className="rounded-sm bg-[#1e1e1e] w-full p-2 outline-none text-white text-sm"
                placeholder="$0.00"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label
                  htmlFor="utilitiesBillLimit"
                  className="text-on-surface-variant text-xs"
                >
                  Utilities & Bill
                </label>
                <input
                  type="number"
                  id="utilitiesBillLimit"
                  name="utilitiesBillLimit"
                  value={balance.utilitiesBill}
                  onChange={handleChange}
                  className="rounded-sm bg-[#1e1e1e] w-full p-2 outline-none text-white text-sm"
                  placeholder="$0.00"
                />
              </div>
              <div>
                <label
                  htmlFor="transportationLimit"
                  className="text-on-surface-variant text-xs"
                >
                  Transportation
                </label>
                <input
                  type="number"
                  id="transportationLimit"
                  name="transportationLimit"
                  value={balance.transportation}
                  onChange={handleChange}
                  className="rounded-sm bg-[#1e1e1e] w-full p-2 outline-none text-white text-sm"
                  placeholder="$0.00"
                />
              </div>
              <div>
                <label
                  htmlFor="foodDiningLimit"
                  className="text-on-surface-variant text-xs"
                >
                  Food & Dining
                </label>
                <input
                  type="number"
                  id="foodDiningLimit"
                  name="foodDiningLimit"
                  value={balance.foodDining}
                  onChange={handleChange}
                  className="rounded-sm bg-[#1e1e1e] w-full p-2 outline-none text-white text-sm"
                  placeholder="$0.00"
                />
              </div>
              <div>
                <label
                  htmlFor="otherExpenseLimit"
                  className="text-on-surface-variant text-xs"
                >
                  Other Expense
                </label>
                <input
                  type="number"
                  id="otherExpenseLimit"
                  name="otherExpenseLimit"
                  value={balance.otherExpense}
                  onChange={handleChange}
                  className="rounded-sm bg-[#1e1e1e] w-full p-2 outline-none text-white text-sm"
                  placeholder="$0.00"
                />
              </div>
            </div>
            <button className="bg-[#4edea3] w-fullfont-bold rounded-sm py-2 mb-5" type="submit">ADD</button>
          </form>
        </div>
      </div>}
    </div>
  );
};

export default Header;
