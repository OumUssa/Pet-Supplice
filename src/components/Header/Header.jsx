import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../Header/Header.css";
const Header = () => {
  const pettoken = localStorage.getItem("tokenPet");
  const navClass = ({ isActive }) =>
    `text-gray-700 navbar-link font-extrabold block px-5 py-3 transition-all duration-200 ${
      isActive
        ? "hvr-underline-from-left navbar-link-active"
        : "hvr-underline-from-left hover:text-cyan-600"
    }`;

  return (
    <header className="relative z-50 bg-white/95 backdrop-blur-sm shadow-md border-b border-cyan-100">
      <div className="w-full flex items-center justify-between py-4 px-20">
        {/* Logo */}
        <div className="flex items-center justify-center h-24 w-24 ">
          <a href="" className="w-full h-full relative ">
            <img
              src="/image/logo.png"
              alt="Petzone Logo"
              className="absolute top-1/2 left-0 w-full h-40 object-cover drop-shadow-lg -translate-y-1/2 transition-transform "
            />
          </a>
        </div>

        <div className="flex items-center justify-around space-x-4">
          {/* Right side: search + user links */}
          <div className="header-search flex items-center">
            <i className="header-search__icon bi bi-search"></i>
            <input
              type="text"
              placeholder="Search for pets"
              aria-label="Search for pets"
              className="header-search__input"
            />
          </div>

          {/* User Links */}
          <div className="flex items-center space-x-4 text-cyan-700">
            {!pettoken ? (
              <div>
                <Link
                  to="/signin"
                  className="text-base btn hvr-underline-from-left py-1">
                  Login
                </Link>
                <span className="mx-3">/</span>
                <Link
                  to="/register"
                  className="hvr-underline-from-left btn py-1">
                  register
                </Link>
              </div>
            ) : (
              false
            )}
            {pettoken ? (
              <div>
                <Link
                  to="/DashboardView"
                  className="text-base btn hvr-underline-from-left py-1">
                  Dashboard
                </Link>
              </div>
            ) : (
              false
            )}
            <div className="flex items-center h-auto">
              <a href="#">
                <i className="bi bi-person-fill text-3xl"></i>
              </a>
              <a href="#">
                <i className="bi bi-heart-fill text-2xl mx-5"></i>
              </a>
              <a href="#">
                <i
                  style={{ fontSize: "27px" }}
                  className="bi bi-cart-fill "></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <nav className="relative z-50 w-full py-1 border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center items-center py-3">
            <ul className="hidden md:flex space-x-25">
              <li>
                <NavLink to="/" end className={navClass}>
                  Home
                </NavLink>
              </li>
              <li className="relative group">
                <NavLink to="/shop" className={navClass}>
                  Shop <i className="bi bi-caret-down-fill ms-1"></i>
                </NavLink>

                <ul
                  className="z-999
      absolute left-0 mt-2 bg-white shadow-lg border rounded-md w-48 pb-2
      opacity-0 invisible
      transform origin-top scale-y-0
      group-hover:opacity-100 group-hover:visible group-hover:scale-y-100
      transition-all duration-400 ease-out
    ">
                  {/* 🐶 Dogs */}
                  <li className="relative group/item">
                    <Link
                      to="/shop?category=Dog"
                      className="flex items-center justify-between px-4 py-2 hover:bg-gray-100">
                      Dogs
                      <i className="bi bi-caret-right-fill"></i>
                    </Link>

                    {/* Dogs Submenu */}
                    <ul
                      className="z-1000
          absolute left-44 top-0 ml-1 bg-white shadow-md border rounded-md w-54 py-2
          opacity-0 invisible
          transform origin-top scale-y-0
          group-hover/item:opacity-100 group-hover/item:visible group-hover/item:scale-y-100
          transition-all duration-400 ease-out
        ">
                      <li>
                        <Link
                          to="/shop?category=Dog&type=Food"
                          className="block px-4 py-2 hover:bg-gray-100">
                          Food
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/shop?category=Dog&type=Toys"
                          className="block px-4 py-2 hover:bg-gray-100">
                          Toys
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/shop?category=Dog&type=Accessories"
                          className="block px-4 py-2 hover:bg-gray-100">
                          Accessories
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/shop?category=Dog&type=Health%20%26%20Care"
                          className="block px-4 py-2 hover:bg-gray-100">
                          Health & Care
                        </Link>
                      </li>
                    </ul>
                  </li>

                  {/* 🐱 Cats */}
                  <li className="relative group/item">
                    <Link
                      to="/shop?category=Cat"
                      className="flex items-center justify-between px-4 py-2 hover:bg-gray-100">
                      Cats
                      <i className="bi bi-caret-right-fill"></i>
                    </Link>

                    <ul
                      className="z-1000
          absolute left-44 top-0 ml-1 bg-white shadow-md border rounded-md w-54 py-2
          opacity-0 invisible
          transform origin-top scale-y-0
          group-hover/item:opacity-100 group-hover/item:visible group-hover/item:scale-y-100
          transition-all duration-400 ease-out
        ">
                      <li>
                        <Link
                          to="/shop?category=Cat&type=Food"
                          className="block px-4 py-2 hover:bg-gray-100">
                          Food
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/shop?category=Cat&type=Toys"
                          className="block px-4 py-2 hover:bg-gray-100">
                          Toys
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/shop?category=Cat&type=Litter%20%26%20Hygiene"
                          className="block px-4 py-2 hover:bg-gray-100">
                          Litter & Hygiene
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/shop?category=Cat&type=Accessories"
                          className="block px-4 py-2 hover:bg-gray-100">
                          Accessories
                        </Link>
                      </li>
                    </ul>
                  </li>

                  {/* 🐦 Birds */}
                  <li className="relative group/item">
                    <Link
                      to="/shop?category=Bird"
                      className="flex items-center justify-between px-4 py-2 hover:bg-gray-100">
                      Birds
                      <i className="bi bi-caret-right-fill"></i>
                    </Link>

                    <ul
                      className="z-1000
          absolute left-44 top-0 ml-1 bg-white shadow-md border rounded-md w-54 py-2
          opacity-0 invisible
          transform origin-top scale-y-0
          group-hover/item:opacity-100 group-hover/item:visible group-hover/item:scale-y-100
          transition-all duration-400 ease-out
        ">
                      <li>
                        <Link
                          to="/shop?category=Bird&type=Food"
                          className="block px-4 py-2 hover:bg-gray-100">
                          Food
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/shop?category=Bird&type=Cages"
                          className="block px-4 py-2 hover:bg-gray-100">
                          Cages
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/shop?category=Bird&type=Toys"
                          className="block px-4 py-2 hover:bg-gray-100">
                          Toys
                        </Link>
                      </li>
                    </ul>
                  </li>

                  {/* 🐠 Fish */}
                  <li className="relative group/item">
                    <Link
                      to="/shop?category=Fish"
                      className="flex items-center justify-between px-4 py-2 hover:bg-gray-100">
                      Fish
                      <i className="bi bi-caret-right-fill"></i>
                    </Link>

                    <ul
                      className="z-1000
          absolute left-44 top-0 ml-1 bg-white shadow-md border rounded-md w-54 py-2
          opacity-0 invisible
          transform origin-top scale-y-0
          group-hover/item:opacity-100 group-hover/item:visible group-hover/item:scale-y-100
          transition-all duration-400 ease-out
        ">
                      <li>
                        <Link
                          to="/shop?category=Fish&type=Food"
                          className="block px-4 py-2 hover:bg-gray-100">
                          Fish Food
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/shop?category=Fish&type=Aquariums"
                          className="block px-4 py-2 hover:bg-gray-100">
                          Aquariums
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/shop?category=Fish&type=Filters%20%26%20Pumps"
                          className="block px-4 py-2 hover:bg-gray-100">
                          Filters & Pumps
                        </Link>
                      </li>
                    </ul>
                  </li>

                  {/* 🐹 Small Pets */}
                  <li className="relative group/item">
                    <Link
                      to="/shop?category=Small%20Pet"
                      className="flex items-center justify-between px-4 py-2 hover:bg-gray-100">
                      Small Pets
                      <i className="bi bi-caret-right-fill"></i>
                    </Link>

                    <ul
                      className="z-1000
          absolute left-44 top-0 ml-1 bg-white shadow-md border rounded-md w-54 py-2
          opacity-0 invisible
          transform origin-top scale-y-0
          group-hover/item:opacity-100 group-hover/item:visible group-hover/item:scale-y-100
          transition-all duration-400 ease-out
        ">
                      <li>
                        <Link
                          to="/shop?category=Small%20Pet&type=Food"
                          className="block px-4 py-2 hover:bg-gray-100">
                          Food
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/shop?category=Small%20Pet&type=Cages"
                          className="block px-4 py-2 hover:bg-gray-100">
                          Cages
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/shop?category=Small%20Pet&type=Bedding"
                          className="block px-4 py-2 hover:bg-gray-100">
                          Bedding
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/shop?category=Small%20Pet&type=Toys"
                          className="block px-4 py-2 hover:bg-gray-100">
                          Toys
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>

              <li>
                <NavLink to="/services" className={navClass}>
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={navClass}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={navClass}>
                  Contact
                </NavLink>
              </li>
            </ul>

            <button className="md:hidden text-gray-700  py-3 hover:text-blue-600">
              <i className="bi bi-list"></i>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
