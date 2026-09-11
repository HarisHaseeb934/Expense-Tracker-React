import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useReducer, useRef, useState } from "react";
import { GrNotes } from "react-icons/gr";



const Header = () => {
  
  const [isNavHide, setIsNavHide] = useState(true);
  const [isModal, setModal] = useState(false);
  const modal = useRef(null);
  function navStyle({ isActive }) {
    return `${isActive ? "text-on-surface bg-surface-container-high" : ""} block w-full p-2 md:p-3 rounded-sm text-sm font-medium hover:bg-surface-container-high`;
  }

  function handleClick() {
    setModal(true)
  }

  useEffect(() => {
    function handleModal(event){
      if(!modal.current.contains(event.target)){
        setModal(false)
      }
    }

    document.addEventListener("mousedown", handleModal)
    return () => {
      document.removeEventListener("mousedown", handleModal)
    }
  },[])

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
          <form className="flex flex-col gap-5 mt-4">
            <div>
              <label
                htmlFor="amount"
                className="text-on-surface-variant text-xs"
              >
                TOTAL BALANCE
              </label>
              <input
                type="number"
                id="amount"
                className="rounded-sm bg-[#1e1e1e] w-full p-2 outline-none text-white text-sm"
                placeholder="$0.00"
              />
            </div>
            <div>
              <label
                htmlFor="amount"
                className="text-on-surface-variant text-xs"
              >
                INCOME TARGET
              </label>
              <input
                type="number"
                id="INCOME TARGET"
                className="rounded-sm bg-[#1e1e1e] w-full p-2 outline-none text-white text-sm"
                placeholder="$0.00"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label
                  htmlFor="Utilities & Bill"
                  className="text-on-surface-variant text-xs"
                >
                  Utilities & Bill
                </label>
                <input
                  type="number"
                  id="Utilities & Bill"
                  className="rounded-sm bg-[#1e1e1e] w-full p-2 outline-none text-white text-sm"
                  placeholder="$0.00"
                />
              </div>
              <div>
                <label
                  htmlFor="Transportation"
                  className="text-on-surface-variant text-xs"
                >
                  Transportation
                </label>
                <input
                  type="number"
                  id="Transportation"
                  className="rounded-sm bg-[#1e1e1e] w-full p-2 outline-none text-white text-sm"
                  placeholder="$0.00"
                />
              </div>
              <div>
                <label
                  htmlFor="Food & Dining"
                  className="text-on-surface-variant text-xs"
                >
                  Food & Dining
                </label>
                <input
                  type="number"
                  id="Food & Dining"
                  className="rounded-sm bg-[#1e1e1e] w-full p-2 outline-none text-white text-sm"
                  placeholder="$0.00"
                />
              </div>
              <div>
                <label
                  htmlFor="Other Expense"
                  className="text-on-surface-variant text-xs"
                >
                  Other Expense
                </label>
                <input
                  type="number"
                  id="Other Expense"
                  className="rounded-sm bg-[#1e1e1e] w-full p-2 outline-none text-white text-sm"
                  placeholder="$0.00"
                />
              </div>
            </div>
            <button className="bg-[#4edea3] w-fullfont-bold rounded-sm py-2 mb-5">ADD</button>
          </form>
        </div>
      </div>}
    </div>
  );
};

export default Header;
