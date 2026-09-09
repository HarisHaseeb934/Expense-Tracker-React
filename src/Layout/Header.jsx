import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

const Header = () => {
  const [isNavHide, setIsNavHide] = useState(true);
  function navStyle({ isActive }) {
    return `${isActive ? "text-on-surface bg-surface-container-high" : ""} block w-full p-2 md:p-3 rounded-sm text-sm font-medium hover:bg-surface-container-high`;
  }
  return (
    <header className="relative max-w-7xl w-full m-auto px-5 py-5 flex justify-between sm:justify-start items-center gap-3 md:gap-7">
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
      <button
        className="sm:hidden"
        onClick={() => setIsNavHide((prev) => !prev)}
      >
        <GiHamburgerMenu className="text-on-surface-variant" />
      </button>
    </header>
  );
};

export default Header;
